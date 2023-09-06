import userModel from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import { createTransport } from "nodemailer"
import redis from "../rd.js";
import shortid from "shortid";
import jwt from "jsonwebtoken"
const transporterFunction = (email,passcode)=>{
    let transporter = createTransport({
    service:"Gmail",
    port:587,
    auth:{
        user:email,
        pass:passcode
    }
})
return transporter
}
export const logout = async (_,res)=>{
    await redis.del("user")
    await redis.del("token")
    return res.status(201).json({
        msg:"Logged Out,Successfully!"
    })
}
export const login = async(req,res)=>{
    const { body } = req
    const { usdata,passcode } = body
    try {
        const user = await userModel.findOne({
            $or:[
                { username:usdata },
                { email:usdata },
                { mobile:usdata }        
            ]
        })
        if(!user) return res.status(404).json({ "msg":"User not found" })
        let { password,email,username,mobile,_id } = user
        const isTrue = await bcryptjs.compare(passcode, password)
        if(!isTrue) return res.status(401).json({ "msg":"Wrong Password!" })
        const token = jwt.sign({email},process.env.SECRET,{
            expiresIn:'3d'
        })
        await redis.set("user",JSON.stringify({ username,email,mobile,_id }),"EX",60*60*72)
        return res.status(201).json({
            msg:"Login Successful",
            token
        })
    } catch (error) {
        return res.status(500).json({
            msg:error.message
        })
    }
} 
export const signUp = async(req,res)=>{
    const { body } = req
    const { username,email,passcode,mobile } = body
    const user = await userModel.findOne({
        $or:[
            { email },
            { mobile },
            { username }
        ]
    })
    if(user) return res.status(401).json({msg:"user exists with details provided"})
    const _id = shortid.generate()
    const password = await bcryptjs.hash(passcode,8)
    await userModel.create({ _id,username,email,mobile,password,addresses:[],orders:[],cart:[] })
    await redis.set("user",JSON.stringify({ _id,username,email,mobile }),"EX",60*60*72)
    const token = jwt.sign({ email },process.env.SECRET,{
        expiresIn:'3d'
    })
    return res.status(201).json({
        msg:"SignUp Successful",
        token
    })
}
export const updateDetails = async (req,res)=>{
    const { body } = req
    const { user } = res.locals
    const { _id } = user 
    await userModel.findByIdAndUpdate(_id,{
        ...body
    })
    return res.status(201).json({
        msg:"Update Successful!"
    })
}
export const sendPassword = async (_,res)=>{
    const { email } = res.locals
    const { otpGen } = res.locals
    const { user } = res.locals
    const { username } = user
    try {
        const transporter = transporterFunction(process.env.my_email,process.env.passcode)
        await transporter.sendMail({
            to:email,
            from:process.env.my_email,
            subject:`Merchandise passcode reset!`,
            text:`Dear ${username}! Please enter the OTP to change you passcode\n OTP:-${otpGen}`
        })   
        return res.status(201).json({
            msg:`Mail sent to ${email}!`
        })
    } catch (error) {
        return res.status(500).json({
            msg:`${error.message}`
        })
    }
}
export const updatePassword = async (req,res)=>{
    let { email } = res.locals
    const { body } = req
    const { passcode } = body
    const password = await bcryptjs.hash(passcode,8)
    await userModel.findOneAndUpdate({
        email
    },{
        password
    },{
        new:true
    })
    return res.status(201).json({
        msg:"Updated Successfully!"
    })
}
export const getUser = async(req,res)=>{
    const { token } = req.query
    if(!token) return res.status(403).json({
        msg:"NOT AUTHORIZED"
    })
    const verifyTok = jwt.verify(token,process.env.SECRET)
    if(!verifyTok) return res.status(500).json({msg:"Login Again!"})
    const { email } = verifyTok
    let { username,mobile,cart,addresses,orders,_id } = await userModel.findOne({
        email
    }) 
    const user = {
        username,mobile,email,_id
    }
    if(!_id) return res.status(500).json({ msg:"Error Fetching Details Login Again!" })
    return res.status(200).json({
        user,cart,addresses,orders
    })
}


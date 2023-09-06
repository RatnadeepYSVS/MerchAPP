import jwt from "jsonwebtoken"
import userModel from "../models/userSchema.js"
import redis from "../rd.js"
const genOtp = ()=> Math.floor(Math.random()*999999)
export const sendOtp = async(req,res,next)=>{
    const { body } = req
    const { email } = body
    const otpGen = genOtp()
    const user = await userModel.findOne({
        email
    })
    await redis.set("email",email)
    await redis.set("otp",otpGen)
    if(!user) return res.status(404).json({"msg":"No user with that email!"})
    res.locals.email = email
    res.locals.user = user
    res.locals.otpGen=otpGen
    next()
}
export const verifyOtp = async(req,res,next)=>{
    const email = await redis.get("email")
    if(!email) return res.status(403).json({msg:"No email!"})
    let otpGen = await redis.get("otp")
    otpGen = Number.parseInt(otpGen)
    const { body } = req
    const { otp } = body
    if(otp!==otpGen) return res.status(403).json({"msg":"invalid otp"})
    res.locals.email = email
    next()
}
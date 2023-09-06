import jwt from "jsonwebtoken"
import userModel from "../models/userSchema.js"
export default async(req,res,next)=>{
    try {
        const token = req.header('Authorization')
        if(!token) return res.status(401).json({msg:"Not authorized"})
        const data = jwt.verify(token,process.env.secret)
        const { email } = data
        const user = await userModel.findOne({
            email
        })
        if(!user) return res.status(404).json({msg:"No user with that email"})
        res.locals.user = user
        next()
    } catch (error) {
        return res.status(500).json({
            msg:"Internal Server Error!",
            err:error.message
        })
    }
}
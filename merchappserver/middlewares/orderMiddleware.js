import userModel from "../models/userSchema.js";
import redis from "../rd.js";
export const orderMiddleware = async(_,res,next)=>{
    let user = await redis.get("user")
    if(!user) return res.status(500).json({msg:"Invalid user details login again!"})
    user = JSON.parse(user)
    let { _id } = user
    const userDetails = await userModel.findById(_id)
    const { orders } = userDetails
    res.locals.user = user
    res.locals.orders = orders
    next()
}

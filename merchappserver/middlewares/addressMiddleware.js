import redis from '../rd.js'
import userModel from "../models/userSchema.js";
export const addressMiddleware = async(_,res,next)=>{
    let user = await redis.get("user")
    if(!user) return res.status(500).json({msg:"error fetching user details"})
    user = JSON.parse(user)
    res.locals.user = user
    next()
}
export const viewAddressMiddleware = async(req,res,next)=>{
    let user = await redis.get("user")
    if(!user) return res.status(500).json({msg:"error fetching user details"})
    user = JSON.parse(user)
    let { email } = user
    const { addresses,_id } = await userModel.findOne({
        email
    })
    if(!_id) return res.status(404).json({msg:"No user with that email"})
    const { addid } = req.params
    const address = addresses.filter( i=> i.addid===addid )[0]
    if(!address) return res.status(404).json({msg:"No address with that address-id"})
    res.locals.user=user
    res.locals.addresses=addresses
    res.locals.address=address
    next()
}
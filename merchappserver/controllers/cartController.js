import userModel from "../models/userSchema.js";
export const updateCartDB = async(req,res)=>{
    let { body } = req
    let { cart } = body
    let { user } = res.locals
    let { _id } = user
    await userModel.findByIdAndUpdate(_id,{
        cart
    })
    return res.status(201).json({
        msg:"Cart Updated!"
    })
}

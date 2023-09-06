import userModel from "../models/userSchema.js";
import shortid from "shortid";
export const getAddresses = async(req,res)=>{
    const { _id } = res.locals.user 
    const user = await userModel.findById(_id)
    const { addresses } = user
    return res.status(200).json({
        addresses
    })
}
export const removeAddress = async(req,res)=>{
    let { address } = res.locals
    let { addresses } = res.locals
    const { addid } = address
    const { _id } = res.locals.user
    const addressRem = addresses.filter(i=>i.addid!==addid)
    await userModel.findByIdAndUpdate(_id,{
         addresses:addressRem
    },{
        new:true
    })
    return res.status(201).json({
        msg:"Address removed"
    })
}
export const updateAddress = async(req,res)=>{
    const { body } = req
    let { address } = res.locals
    let { addresses } = res.locals
    const { addid } = address
    let addressToUpdate = addresses.filter(i=>i.addid===addid)
    let remAddresses = addresses.filter(i=>i.addid!==addid)
    addressToUpdate = {
        ...body,addid
    }
    remAddresses.push(addressToUpdate)
    const { _id } = res.locals.user
    await userModel.findByIdAndUpdate(_id,{
        addresses:remAddresses
    },{
        new:true
    })
    return res.status(201).json({
        msg:"Address Updated!"
    })
}
export const addAddress = async(req,res)=>{
    const { _id } = res.locals.user
    const { body } = req
    const { name,phone,email,house,lane,pincode,landmark,city,state } = body
    const addId = shortid.generate()
    const address = {
        addid:addId,
        name,
        phone,
        email,
        house,
        city,
        state,
        lane,
        pincode,
        landmark
    }
    await userModel.findByIdAndUpdate(_id,{
        $push:{
            addresses:address
        },
    },{
        new:true
    })
    return res.status(201).json({
        msg:`Address Added Successfully!`
    })
}
export const viewAddress = async(req,res)=>{
    const { address } = res.locals
    return res.status(200).json({
        address
    })
}
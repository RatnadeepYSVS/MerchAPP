import { Schema, model } from "mongoose";
import orderSchema from "./orderSchema.js";
import addressSchema from "./addressSchema.js";
import cartSchema from "./cartSchema.js";
const userSchema = new Schema({
    _id:{
        type:String,
        unique:true,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    addresses:[
        addressSchema
    ],
    orders:[
        orderSchema
    ],
    cart:[
        cartSchema
    ]
})
userSchema.index({ mobile: 1, address: { $elemMatch: { phone: 1 } } }, { unique: true });
const userModel = model("User",userSchema)
export default userModel
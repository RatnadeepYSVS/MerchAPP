import { Schema } from "mongoose";
const addressSchema = new Schema({
    addid:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    house:{
        type:String
    },
    lane:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    pincode:{
        type:String 
    },
    landmark:{
        type:String
    }
})
export default addressSchema
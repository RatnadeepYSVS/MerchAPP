import { Schema } from "mongoose";
const cartSchema = new Schema({
    pid:{
        type:String
    },
    productname:{
        type:String
    },
    cost:{
        type:Number
    },
    quantity:{
        type:Number
    },
    image:{
        type:String
    }
})
export default cartSchema
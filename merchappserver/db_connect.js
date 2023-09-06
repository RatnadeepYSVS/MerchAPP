import mongoose from "mongoose";
export default async ()=>{
    try {
        await mongoose.connect(process.env.uri)
        console.log("DB CONNECTED")
    } catch (error) {
        console.log(error.messsage)
    }
}
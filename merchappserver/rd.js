import { config } from "dotenv"
import { Redis } from "ioredis"
config()
const client = {
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_URL,
    port: 17162,
    maxRetriesPerRequest:null
}
const redis = new Redis(client)
redis.on("connect",()=>{
    console.log("Redis DB Connected")
})
redis.on("error",error=>{
    console.log(error.message)
})
export default redis
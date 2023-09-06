import { config } from "dotenv";
import express from "express";
import db_connect from "./db_connect.js";
import userRoutes from "./routes/userRoutes.js"
import passwordRoutes from "./routes/passwordRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import addressRoutes from "./routes/addressRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import cors from "cors"
const app = express()
const port = process.env.port || 5000
config()
db_connect()
app.use(cors({
    credentials:true,
    optionsSuccessStatus:200,
    origin:process.env.origin
}))
app.use(express.json())
app.use(userRoutes)
app.use("/changepassword",passwordRoutes)
app.use(orderRoutes)
app.use(addressRoutes)
app.use(cartRoutes)
app.listen(port,()=>console.log(`Running On ${port}`))
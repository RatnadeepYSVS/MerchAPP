import { Router } from "express";
import { sendOtp,verifyOtp } from "../middlewares/passwordMiddleware.js";
import { sendPassword, updatePassword } from "../controllers/userController.js";
const router = Router()
router.post("/",sendOtp,sendPassword)
router.put("/",verifyOtp,updatePassword)
export default router
import { Router } from "express";
import { getUser, login, logout, signUp, updateDetails } from "../controllers/userController.js";
import userMiddleware from "../middlewares/userMiddleware.js";
const router = Router()
router.get("/getUser",getUser)
router.post("/login",login)
router.post("/signup",signUp)
router.put("/updatedets",userMiddleware,updateDetails)
router.put("/logout",logout)
export default router

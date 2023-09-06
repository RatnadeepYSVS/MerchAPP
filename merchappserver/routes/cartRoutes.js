import { Router } from "express";
import { cartMiddleware, } from "../middlewares/cartMiddleware.js";
import { updateCartDB } from "../controllers/cartController.js";
const router = Router()
router.put("/savecart",cartMiddleware,updateCartDB)
export default router
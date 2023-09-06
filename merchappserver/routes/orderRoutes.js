import { Router } from "express";
import { addOrder,cartOrder,genBill,getOrders, paymentGateway } from "../controllers/orderController.js";
import { orderMiddleware } from "../middlewares/orderMiddleware.js";
const router = Router()
router.get("/yourorders",orderMiddleware,getOrders)
router.put("/add_order",orderMiddleware,addOrder)
router.put("/checkout",orderMiddleware,cartOrder)
router.get("/generateBill/:billid",orderMiddleware,genBill)
router.post("/pay",orderMiddleware,paymentGateway)
export default router 
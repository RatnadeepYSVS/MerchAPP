import { Router } from "express";
import { addressMiddleware, viewAddressMiddleware } from "../middlewares/addressMiddleware.js";
import { addAddress, getAddresses, removeAddress, updateAddress, viewAddress } from "../controllers/addressController.js";

const router = Router()
router.put("/addaddress",addressMiddleware,addAddress)
router.get("/youraddresses",addressMiddleware,getAddresses)
router.get("/youraddresses/:addid",viewAddressMiddleware,viewAddress)
router.put("/updateaddress/:addid",viewAddressMiddleware,updateAddress)
router.put("/removeaddress/:addid",viewAddressMiddleware,removeAddress)

export default router
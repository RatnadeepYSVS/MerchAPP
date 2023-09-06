import userModel from "../models/userSchema.js";
import shortid from "shortid";
import Stripe from "stripe";
const makePayment = (key)=>{
    const stripe = new Stripe(key,{
        apiVersion:null
    })
    return stripe
}
export const paymentGateway = async(req,res)=>{
    const { body } = req
    const { cost,items,type } = body
    const data = {
        price_data: {
            currency: 'inr',
            product_data: {
                name: `Purchasing Merchandise of ${items} items!`,
            },
            unit_amount: cost * 100,
        },
        quantity: 1,
    }
    try {
        const stripe = makePayment(process.env.STRIPE_SECRET_KEY)
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items:[data],
            mode:"payment",
            success_url:`${process.env.origin}/success?type=${type}`,
            cancel_url:`${process.env.origin}/cancel`
        })
        return res.status(201).json({
            pid:session.id
        })   
    } catch (error) {
        return res.status(500).json({
            msg:error.message
        })
    }
}
export const getOrders = async(req,res)=>{
    const { orders } = res.locals
    return res.status(200).json({
        orders
    })
}
export const addOrder = async(req,res)=>{
    const { _id } = res.locals.user
    const { username } =res.locals.user
    let { body } = req
    let { order,address } = body 
    const billId = shortid.generate()
    let ordid = shortid.generate()
    const dateD = new Date()
    const istDate = new Date(dateD.getTime()+19800000)
    order = {...order,ordid,billId,orderDate:istDate.toISOString(),...address}
    try {
        await userModel.findByIdAndUpdate(_id,{
            $push:{
                orders:order
            }
        },{
            new:true
        })
        return res.status(201).json({
            msg:`Dear ${username},your Order is placed!Thank you for shopping.`,
        })
    } catch (error) {
        return res.status(500).json({
            msg:error.message
        })   
    }
}
export const cartOrder = async (req,res)=>{
    const { user } = res.locals
    const { _id } = user
    const { username } = user
    const { orders } = res.locals
    const { body } = req 
    let { ordersA,address } = body
    const orderId = shortid.generate()
    const billId = shortid.generate()
    ordersA = ordersA.map((i)=>{
        let order = i
        const dateD = new Date()
        const istDate = new Date(dateD.getTime()+19800000)
        order = {
            ...order,
            ordid:orderId,
            billId,
            orderDate:istDate.toISOString(),
            ...address
        }
        return order
    })
    try {
        await userModel.findByIdAndUpdate(_id,{
            orders:[...orders,...ordersA],
            cart:[]
        },{
            new:true
        })
        return res.status(201).json({
            msg:`Dear ${username},your Order is placed!Thank you for shopping.`,
        })
    } catch (error) {
        return res.status(500).json({
            msg:error.message
        })   
    }
}

export const genBill = async(req,res)=>{
    const { user } = res.locals
    const { username } = user
    const { orders } = res.locals
    const { billid } = req.params
    const billedItems = orders.filter(({ billId }) => billId===billid )
    if(billedItems.length===0) return res.status(201).json({ msg:"No order with that billId" })
    return res.status(201).json({
        billedItems,
        username
    })
}
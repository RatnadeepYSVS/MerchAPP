import { createContext, useEffect, useReducer, useState } from "react";
import userReducer from "../reducers/userReducer";
import cartReducer from "../reducers/cartReducer";
import orderReducer from "../reducers/orderReducer";
import Cookies from "js-cookie";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
export const UserContext = createContext()
export default ({
    children
})=>{
    const [auth,setAuth] = useState(false)
    const [user,setUser] = useState({})
    const [cart,setCart] = useState([])
    const [cost,setCost] = useState(0)
    const [addresses,setAddresses] = useState([])
    const [orders,setOrders] = useState([])
    const toast = useToast()
    const [userData,dispatchUser] = useReducer(userReducer,{
        user:null,
        auth:false
    })
    const [orderData,dispatchOrders]= useReducer(orderReducer,{
        orders:[]
    })
    const [cartData,dispatchCart] = useReducer(cartReducer,{
        cart:[]
    })
    const [addressData,dispatchAddress] = useReducer(orderReducer,{
        addresses:[]
    })
    const token = Cookies.get("token")
    const getUserData = async ()=>{
        if(token){
            try {
                const { data } = await axios.get("/getUser",{
                    params:{
                        token
                    }
                })
                const { user,cart,addresses,orders } = data
                setAuth(true)
                setUser(user)
                setAddresses(addresses)
                setOrders(orders)
                let cartItems = localStorage.getItem("cart")
                cartItems=JSON.parse(cartItems || "[]")
                if(!(cart.length>0 || cartItems.length>0)){
                    localStorage.setItem("cart",JSON.stringify([]))
                    setCart([])
                    dispatchCart({type:"UPDATE",cart:[]})
                }else{
                    if(cart.length < cartItems.length){
                        let cartData = cartItems.map(JSON.parse)
                        setCart(cartData)
                        dispatchCart({type:"UPDATE",cart:cartData})
                    }else{
                        let cartData = cart.map(JSON.stringify)
                        localStorage.setItem("cart",JSON.stringify(cartData))
                        setCart(cart)
                        dispatchCart({type:"UPDATE",cart})
                    }
                }
                dispatchUser({type:"SIGNIN",user})
                dispatchAddress({type:"UPDATE",addresses})
                dispatchOrders({type:"UPDATE",orders})
                if(auth){
                    return toast({
                        title:`Welcome ${user.username}`,
                        status:"success",
                        duration:2500,
                        isClosable:true,
                        position:"top-right"
                    })
                }
            } catch (error) {
                setAuth(false)
                return toast({
                    title:`Error! SignIn Again!`,
                    status:"error",
                    duration:2500,
                    position:"top-right"
                })
            }
        }else{
            setAuth(false)
        }
    }
    const getCartData = ()=>{
        if(token){
            let cart = localStorage.getItem("cart")
            cart = JSON.parse(cart)
            let cartItems = cart.map(JSON.parse)
            let totalCost = cartItems.reduce((acc,val)=>val.quantity*val.cost+acc,0)
            setCost(totalCost)
            setCart(cartItems)
        }
    }
    const getOrderData = async()=>{
        if(token){
            let { data } = await axios.get("/yourorders")
            setOrders(data.orders)
        }
    }
    const getAddressData = async()=>{
        if(token){
            let { data } = await axios.get("/youraddresses")
            setAddresses(data.addresses)
        }
    }
    useEffect(()=>{
        getUserData()
    },[
        userData.auth
    ])
    useEffect(()=>{
        getCartData()
    },[
        cartData
    ])
    useEffect(()=>{
        getAddressData()
    },[
        addressData
    ])
    useEffect(()=>{
        getOrderData()
    },[
        orderData
    ])
    return <UserContext.Provider value={{
        auth,
        cart,
        orders,
        addresses,
        user,
        cost,
        dispatchAddress,
        dispatchCart,
        dispatchUser,
        dispatchOrders
    }}>
        {children}
    </UserContext.Provider>
}
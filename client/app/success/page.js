"use client"
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/userContext'
import LoadComp from '../components/LoadComp'
import { Button, Center,Text, useToast } from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import ErrorComp from '../components/ErrorComp'
import Cookies from 'js-cookie'
import axios from 'axios'
const page = () => {
  const { dispatchCart } = useContext(UserContext)
  const [loading,setLoading] = useState(false)
  const [error,SetError] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  const toast = useToast()
  const generateOrder = async ()=>{
    setLoading(true)
    const token = Cookies.get("token")
    if(!token){
      SetError(true)
      return 
    }
    const paymentId = Cookies.get("payment-id")
    if(!paymentId){
      SetError(true)
      return
    }
    const address = JSON.parse(localStorage.getItem("address"))
    if(type==="order"){
      const item = JSON.parse(localStorage.getItem("item"))
      try {
        const res = await axios.put("/add_order",{
          order:item,
          address
        })
        localStorage.removeItem("item")
        localStorage.removeItem("address")
        Cookies.remove("payment-id")
        setLoading(false)
        return toast({
          title:res.data.msg,
          status:"success",
          duration:2500,
          position:"top-right",
          isClosable:true
        })
      } catch (error) {
        console.log(error)
        setLoading(false)
        return toast({
          title:"Some Error Occured",
          duration:2500,
          status:"error",
          position:"top-right"
        })
      }
    }else{
      let cart = JSON.parse(localStorage.getItem("cart"))
      let cartItems = cart.map(JSON.parse)
      try {
        const res = await axios.put("/checkout",{
          ordersA:cartItems,
          address
        })
        console.log(res.data,"cart")
        localStorage.setItem("cart",JSON.stringify([]))
        localStorage.removeItem("address")
        dispatchCart({type:"UPDATE",cart:[]})
        Cookies.remove("payment-id")
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        return toast({
          title:"Some Error Occured",
          duration:2500,
          status:"error",
          position:"top-right"
        })
      }
    }
  }
  useEffect(()=>{
    generateOrder()
  },[])
  return loading? <LoadComp/> : (
    <div>
      {
        error?<ErrorComp/>:(
          <>
            <Text textAlign="center" mt={10}>Order Placed Successfully!</Text>
            <Center>
              <Button mt={3} onClick={()=>{return router.push("/orders")}}>
                Go to Orders!
              </Button>
            </Center>
          </>
        )
      }
    </div>
  )
}

export default page
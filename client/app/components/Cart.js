"use client"
import React, { useContext, useEffect, useState } from 'react'
import YourCart from './YourCart'
import { Center, Heading } from '@chakra-ui/react'
import { UserContext } from '../contexts/userContext'
import axios from 'axios'
const Cart = () => {
  const { auth,cart } = useContext(UserContext)
  useEffect(()=>{
    return ()=>{
      let items = JSON.parse(localStorage.getItem("cart"))
      let cart = items.map(JSON.parse)
      axios.put("/saveCart",{
        cart
      }).then().catch(e=>{
        console.log(e)
      })
    }
  },[auth])
  return cart.length>0 ? (
    <div>
        <Heading textAlign="center" fontFamily="inherit">Your Cart</Heading>
        <YourCart cart={cart}/>
    </div>
  ):(
  <>
    <Center>
        <Heading fontFamily="inherit">
            Your Cart Is Empty!
        </Heading>
    </Center>
  </>
  )
}

export default Cart
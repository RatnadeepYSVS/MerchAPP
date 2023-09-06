"use client"
import React, { useContext } from 'react'
import Cart from '../components/Cart'
import { UserContext } from '../contexts/userContext'
import ErrorComp from '../components/ErrorComp'
const page = () => {
  const { auth } = useContext(UserContext)
  return auth? (
    <Cart/>
  ):<ErrorComp/>
}

export default page
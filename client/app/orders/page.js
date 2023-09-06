"use client"
import React, { useContext } from 'react'
import Orders from '../components/Orders'
import { UserContext } from '../contexts/userContext'
import ErrorComp from '../components/ErrorComp'
const page = () => {
  const { auth } = useContext(UserContext)
  return auth? (
    <Orders/>
  ):<ErrorComp/>
}

export default page
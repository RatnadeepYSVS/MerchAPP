"use client"
import React,{ useContext } from 'react'
import Addresses from '../components/Addresses'
import { UserContext } from '../contexts/userContext'
import ErrorComp from '../components/ErrorComp'
const page = () => {
  const { auth } = useContext(UserContext)
  return auth? (
    <Addresses/>
  ):<ErrorComp/>
}

export default page
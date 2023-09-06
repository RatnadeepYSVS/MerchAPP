'use client'
import React from 'react'
import Checkout from '../components/Checkout'
import { useSearchParams } from 'next/navigation'
const page = () => {
    const searchParams = useSearchParams()
    const type = searchParams.get("type")
  return (
    <Checkout type={type}/>
  )
}

export default page
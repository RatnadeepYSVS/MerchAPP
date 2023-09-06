"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'
import Product from '../components/Product'
import products from '@/data/data'

const page = () => {
  const searchParams = useSearchParams()
  const merchType = searchParams.get("type")
  const id = searchParams.get("pid")
  const data = products.filter(({ category,pid })=> category===merchType&&pid===id )[0]
  return (
    <Product data={data} />
  )
}

export default page
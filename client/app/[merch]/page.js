'use client'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'
import data from '@/data/data'
import Merchandise from '../components/Merchandise'
const page = () => {
    const { merch } = useParams()
    const merchItems = data.filter(({ category })=> category===merch )
  return (
    <Merchandise merchType={merch} products={merchItems}/>
  )
}

export default page
'use client'
import React, { useContext } from 'react'
import Login from '../components/Login'
import Cookies from 'js-cookie'
import ErrorComp from '../components/ErrorComp'
import { UserContext } from '../contexts/userContext'

const page = () => {
  const { auth } = useContext(UserContext)
  return auth? <ErrorComp/>: (
    <Login/>
  )
}

export default page
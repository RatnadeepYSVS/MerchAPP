'use client'
import React, { useState } from 'react'
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
const ForgotPassword = () => {
    const toast = useToast()
    const router = useRouter()
    const [email,setEmail] = useState("")
    const sendOtp = (e)=>{
        e.preventDefault()
        const emailReg = /\S+@\S+\.\S+/
        const validEmail = emailReg.test(email)
        if(!validEmail) return toast({
            title:"Not a valid Email",
            status:"error",
            duration:2500,
            position:"top-right"
        })
        return router.push("/updatepassword")
    }
  return (
    <div style={{maxWidth:"500px",display:"block",margin:"10px auto"}}>
    <Box p={12}  borderWidth={2} borderRadius={8} boxShadow="lg" className="addMarg">
      <Box textAlign="center">
        <Heading style={{fontFamily:"inherit"}}>Password Reset!</Heading>
      </Box>
      <Box my={4} textAlign="left">
        <form>
          <FormControl isRequired>
            <Input type="text" value={email} placeholder="your registered email" onChange={(e)=>setEmail(e.target.value)} />
          </FormControl>
          <Button width="full" mt={4} type="submit" onClick={sendOtp}>
            Send Otp!
          </Button>
        </form>
      </Box>
    </Box>
  </div>
  )
}
export default ForgotPassword
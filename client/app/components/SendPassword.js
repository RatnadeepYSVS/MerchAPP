"use client"
import { useContext, useEffect, useState } from "react"
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    InputRightAddon,
    Text
} from '@chakra-ui/react';
import { useRouter } from "next/navigation";
import { ViewIcon,ViewOffIcon } from "@chakra-ui/icons";
const SendPassword = () => {
    const [password,setPassword]=useState('')
    const [confPassword,setConfPassword] = useState('')
    const [show, setShow] = useState(false)
    const [showC,setShowC] = useState(false)
    const [otp,setOtp] = useState("")
    const router = useRouter()
    const toast = useToast()
    const handleClick = () => setShow(!show)
    const handleConfClick = ()=>setShowC(!showC)
    const handleSubmit = ()=>{
        e.preventDefault()
        if(!otp || !password || !confPassword ){
            return toast({
                title:"Enter Fields",
                position:"top-right",
                status:"error",
                duration:2500
            })
        }
        if(confPassword!==password) return toast({
            title:"Passwords Not Matching",
            position:"top-right",
            status:"error",
            duration:2500
        })
        const passReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z0-9\d@$!%*#?&]{8,}$/
        const validPass = passReg.test(password)
        if(!validPass) return toast({
            title:"Password Should Contain A capital,number,special Character",
            position:"top-right",
            status:"error",
            duration:2500
        })
    }
    return (
    <div style={{maxWidth:"500px",display:"block",margin:"10px auto"}}>
        <Box p={12}  borderWidth={2} borderRadius={8} boxShadow="lg" className="addMarg">
            <Box textAlign="center">
                <Heading style={{fontFamily:"inherit"}}>Password Reset!</Heading>
            </Box>
            <Box my={4} textAlign="left">
                <form>
                    <FormControl isRequired mt={4}>
                        <FormLabel>Otp</FormLabel>
                        <Input
                            pr='4.5rem'
                            value={otp}
                            type="text"
                            placeholder='Enter Otp'
                            onChange={e=>setOtp(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired mt={4}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                value={password}
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                onChange={e=>setPassword(e.target.value)}
                            />
                            {
                            password &&  <InputRightElement width='4.5rem'>
                                    <span style={{cursor:"pointer"}} h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? <ViewOffIcon/> : <ViewIcon/>}
                                    </span>
                                </InputRightElement>
                            }
                        </InputGroup>
                    </FormControl>
                    <FormControl isRequired mt={4}>
                        <FormLabel>Confirm Password</FormLabel>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                value={confPassword}
                                type={showC ? 'text' : 'password'}
                                placeholder='Enter password'
                                onChange={e=>setConfPassword(e.target.value)}
                            />
                            {
                            confPassword &&  <InputRightElement width='4.5rem'>
                                    <span style={{cursor:"pointer"}} h='1.75rem' size='sm' onClick={handleConfClick}>
                                        {showC ? <ViewOffIcon/> : <ViewIcon/>}
                                    </span>
                                </InputRightElement>
                            }
                        </InputGroup>
                    </FormControl>
                    {
                        confPassword!==password && <Text mt={1} color="tomato" textAlign="center">Passwords Not Matching!</Text>
                    }
                    <Button width="full" mt={4} type="submit" onClick={handleSubmit}>
                        Sign Up
                    </Button>
                </form>
            </Box>
        </Box>
    </div>
  )
}

export default SendPassword
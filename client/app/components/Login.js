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
import axios from "axios";
import { useRouter } from "next/navigation"
import { ViewIcon,ViewOffIcon } from "@chakra-ui/icons";
import { UserContext } from "../contexts/userContext";
import Cookies from "js-cookie";
export default function Login(){
    const { auth,dispatchUser } = useContext(UserContext)
    const [username,setUsername]=useState('')
    const [login,setLogin]=useState(true)
    const [email,setEmail] = useState("")
    const [phone,setPhone]= useState("")
    const [password,setPassword]=useState('')
    const [confPassword,setConfPassword] = useState('')
    const [show, setShow] = useState(false)
    const [showC,setShowC] = useState(false)
    const router = useRouter()
    const toast = useToast()
    const handleClick = () => setShow(!show)
    const handleConfClick = ()=>setShowC(!showC)
    const toggleBetween =()=>{
        setLogin(!login)
        setUsername('')
        setPassword('')
    }
    const onSignup=async e=>{
        e.preventDefault()
        if(!username || !phone || !password || !confPassword || !email){
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
        const emailReg = /\S+@\S+\.\S+/;
        const validEmail = emailReg.test(email)
        if(!validEmail) return toast({
            title:"Invalid Email",
            position:"top-right",
            status:"error",
            duration:2500,
        })
        const phoneReg = /^[6789]{1}[0-9]{9}$/
        const validPhone = phoneReg.test(phone)
        if(!validPhone) return toast({
            title:"Invalid Phone",
            position:"top-right",
            status:"error",
            duration:2500,
        })
        const passReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z0-9\d@$!%*#?&]{8,}$/
        const validPass = passReg.test(password)
        if(!validPass) return toast({
            title:"Password Should Contain A capital,number,special Character",
            position:"top-right",
            status:"error",
            duration:2500
        })
        const data = {
          username,
          email,
          passcode:password,
          mobile:phone,
        }
        try {
          const res = await axios.post("/signup",data)
          const { token } = res.data
          Cookies.set("token",token)
          dispatchUser({type:"SIGNUP",user:{username,email,mobile:phone}})
          return router.push("/")
        } catch (error) {
          return toast({
            title:error.response.data.msg,
            status:"error",
            position:"top-right",
            duration:2500
          })
        }
    }
    const onSigin=async e=>{
        e.preventDefault()
        if(!username || !password){
            return toast({
                title:"Enter Fields",
                position:"top-right",
                status:"error",
                duration:3000,
                isClosable:true
            })
        }
        const data = {
            usdata:username,
            passcode:password
        }
        try {
          const res = await axios.post("/login",data)
          const { token } = res.data
          Cookies.set("token",token)
          dispatchUser({type:"SIGNIN",user:data})
          return router.push("/")
        } catch (error) {
          console.log(error)
          return toast({
            title:error.response.data.msg,
            status:"error",
            position:"top-right",
            duration:2500
          })
        }
    }
    return login?(
        <div style={{maxWidth:"500px",display:"block",margin:"10px auto"}}>
        <Box p={12}  borderWidth={2} borderRadius={8} boxShadow="lg" className="addMarg">
          <Box textAlign="center">
            <Heading style={{fontFamily:"inherit"}}>Sign-In</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" value={username} placeholder="your username\email\phone" onChange={(e)=>setUsername(e.target.value)} />
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
              <Button width="full" mt={4} type="submit" onClick={onSigin}>
                Sign In
              </Button>
            </form>
          </Box>
          <Box textAlign="center">
            <Text cursor="pointer" textAlign="center" onClick={()=>{return router.push("/forgotpassword")}}>
                ForgotPassword
            </Text>
            Not having an Account?
            <Heading 
            style={{
                fontFamily:"inherit",
                fontSize:'20px',
                cursor:"pointer",
                maxWidth:"70px",
                display:"block",
                margin:"auto"
            }}
            onClick={toggleBetween}
            >
                Sign-Up
            </Heading>
          </Box>
        </Box>
      </div>
    ):<div style={{maxWidth:"500px",display:"block",margin:"10px auto"}}>
    <Box p={12}  borderWidth={2} borderRadius={8} boxShadow="lg" className="addMarg">
      <Box textAlign="center">
        <Heading style={{fontFamily:"inherit"}}>Sign-Up</Heading>
      </Box>
      <Box my={4} textAlign="left">
        <form>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="text" value={email} placeholder="Username" onChange={(e)=>setEmail(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Phone</FormLabel>
            <InputGroup>
                <InputLeftAddon children='+91' />
                <Input type='tel' val={phone} placeholder='phone number' onChange={e=>setPhone(e.target.value)}/>
            </InputGroup>
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
          <Button width="full" mt={4} type="submit" onClick={onSignup}>
            Sign Up
          </Button>
        </form>
      </Box>
      <Box textAlign="center">
        Have An Account!
        <Heading 
        style={{
            fontFamily:"inherit",
            fontSize:'20px',
            cursor:"pointer",
            maxWidth:"70px",
            display:"block",
            margin:"auto"
        }}
        onClick={toggleBetween}
        >
            Login
        </Heading>
      </Box>
    </Box>
  </div>
}
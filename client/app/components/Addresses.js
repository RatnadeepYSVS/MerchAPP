'use client'
import { 
    Button, 
    Center, 
    Heading, 
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    useToast,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    InputRightAddon,
} from '@chakra-ui/react'
import React, { useContext,useState } from 'react'
import Address from './Address'
import { UserContext } from '../contexts/userContext'
import axios from 'axios'
const Addresses = () => {
    const toast = useToast()
    const { addresses,dispatchAddress } = useContext(UserContext)
    const { onClose,onOpen,isOpen } = useDisclosure()
    const [username,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [house,setHouse] = useState('')
    const [lane,setLane] = useState('')
    const [city,setCity] = useState('')
    const [state,setState] = useState('')
    const [pincode,setPincode] = useState('')
    const [landmark,setLandmark] = useState('')
    const addAddress = async ()=>{
        if(!username ||!email ||!phone ||!house ||!lane ||!city ||!state ||!pincode){
            return toast({
                title:"Fill All Details",
                status:"error",
                duration:2500,
                position:"top-right"
            })
        }
        const data = {
            name:username,
            email,
            phone,
            house,
            lane,
            city,
            state,
            pincode,
            landmark
        }
        try {
            await axios.put("/addaddress",data)
            dispatchAddress({type:"UPDATE",addresses:data})
            onClose() 
            return toast({
                title:"Address Added",
                status:"success",
                duration:2500,
                isClosable:true,
                position:"top-right"
            }) 
        } catch (error) {
            onClose()
            return toast({
                title:"Some Error Occured!",
                status:"error",
                duration:2500,
                isClosable:true,
                position:"top-right"
            }) 
        }
    }
  return (
    <div>
     <Modal
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <form>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" value={username} placeholder="your username" onChange={(e)=>setUserName(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} placeholder="your email" onChange={(e)=>setEmail(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Phone</FormLabel>
                <Input type="tel" value={phone} placeholder="your phone" onChange={(e)=>setPhone(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>House</FormLabel>
                <Input type="text" value={house} placeholder="house no:-" onChange={(e)=>setHouse(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Lane</FormLabel>
                <Input type="text" value={lane} placeholder="lane,locality..." onChange={(e)=>setLane(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Input type="text" value={city} placeholder="your city" onChange={(e)=>setCity(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>State</FormLabel>
                <Input type="text" value={state} placeholder="your state" onChange={(e)=>setState(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>PinCode</FormLabel>
                <Input type="number" value={pincode} placeholder="pincode" onChange={(e)=>setPincode(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Landmark</FormLabel>
                <Input type="text" value={landmark} placeholder="nearest landmark" onChange={(e)=>setLandmark(e.target.value)} />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button type='submit' mr={3} onClick={addAddress} >Add Address</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        {
            addresses.length>0? (
            <div>
            <Heading fontFamily="inherit" textAlign="center">
                Your Addresses
            </Heading>
            {
                addresses.map((i,ind)=><Address data={i} type="normal" key={ind}/>)
            }
            </div>
            ):(
                <>
                    <Heading textAlign="center" fontFamily="inherit">
                        You have no addresses!
                    </Heading>
                </>
            )
        }
        <Center>
            <Button mb={5} colorScheme='green' onClick={onOpen}>
                Add Address
            </Button>
        </Center>
    </div>
  )
}

export default Addresses
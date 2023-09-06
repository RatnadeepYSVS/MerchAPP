import { 
    Button, 
    Center,
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
    useToast,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    InputRightAddon
} from '@chakra-ui/react'
import React, { useContext,useState } from 'react'
import Item from './Item'
import { UserContext } from '../contexts/userContext'
import { useRouter } from 'next/navigation'
const YourCart = ({
    cart
}) => {
    const { cost,addresses } = useContext(UserContext)
    const router = useRouter()
    const { isOpen,onOpen,onClose } = useDisclosure()
    const [username,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [house,setHouse] = useState('')
    const [lane,setLane] = useState('')
    const [city,setCity] = useState('')
    const [state,setState] = useState('')
    const [pincode,setPincode] = useState('')
    const [landmark,setLandmark] = useState('')
    const toast = useToast()
    const addAddress =()=>{
        if(!username ||!email ||!phone ||!house ||!lane ||!city ||!state ||!pincode){
            return toast({
                title:"Fill All Details",
                status:"error",
                duration:2500,
                position:"top-right"
            })
        }
        onClose()
    }
    const checkOut = async ()=>{
        if(addresses.length===0) return onOpen()
        return router.push("/checkout?type=cart")
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
          <ModalHeader>Modal Title</ModalHeader>
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
            cart.map((i,key)=><Item data={i} key={key}/>)
        }
        <Center>
            <Button mb={2} onClick={checkOut}>
                Proceed To Pay <span style={{textDecoration:"underline",marginLeft:"2px"}}>{cost}₹</span>
            </Button>
        </Center>
    </div>
  )
}

export default YourCart
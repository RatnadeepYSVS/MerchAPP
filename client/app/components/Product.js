import { 
    Card, 
    CardBody, 
    CardFooter, 
    Image, 
    Stack, 
    Text,
    Heading,
    Button, 
    useDisclosure,
    Center, 
    Box, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    InputRightAddon,
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import date from "date-and-time"
import { AddIcon, MinusIcon, StarIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/navigation'
import { UserContext } from '../contexts/userContext'
const Product = ({
    data
}) => {
    const { name,delivery,image,cost,rating } = data
    const router = useRouter()
    const [quant,setQuant] = useState(1)
    const ratingArray = Array(rating).fill(0)
    const now = new Date()
    const { auth,addresses,dispatchCart } = useContext(UserContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const timeArr = ["12:00 PM","03:00 PM","06:00 PM"]
    const [username,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [house,setHouse] = useState('')
    const [lane,setLane] = useState('')
    const [city,setCity] = useState('')
    const [state,setState] = useState('')
    const [pincode,setPincode] = useState('')
    const [landmark,setLandmark] = useState('')
    const delDate = date.addDays(now,delivery)
    const formatedDate = date.format(delDate,'DD MMMM,  dddd')
    const toast = useToast()
    const addQuantity = ()=>{
        setQuant(quant+1)
    }
    const subQuantity = ()=>{
        if(quant<=1) return toast({title:"Invalid Quantity",isClosable:true,duration:2500,position:"top-right",status:"error"})
        setQuant(quant-1)
    }
    const buyProduct=()=>{
        if(!auth) return toast({
          title:"Login To Buy",
          status:"error",
          position:"top-right",
          duration:2500
        })
        if(addresses.length===0) return onOpen()
        const cost = Number.parseInt(data.cost.slice(0,data.cost.length-1))
        const item = {...data,quantity:quant,cost,productname:name}
        localStorage.setItem("item",JSON.stringify(item))
        return router.push("/checkout?type=order")
    }
    const addToCart=()=>{
      if(!auth) return toast({
        title:"Login To View Cart",
        status:"error",
        position:"top-right",
        duration:2500
      })
      if(addresses.length===0) return onOpen()
      const cost = Number.parseInt(data.cost.slice(0,data.cost.length-1))
      const item = {...data,productname:name,cost,quantity:quant}
      let cart = JSON.parse(localStorage.getItem("cart"))
      let cartItems = cart.map(JSON.parse)
      const itemC = cartItems.filter(({ pid })=>pid===data.pid)[0]
      if(itemC) return toast({
        title:"Item Already in Cart!",
        status:"success",
        duration:2500,
        isClosable:true,
        position:"top-right"
      })
      cart.push(JSON.stringify(item))
      localStorage.setItem("cart",JSON.stringify(cart))
      dispatchCart({type:"UPDATE",cart:cartItems})
      return toast({
        title:"Item Added to cart",
        status:"success",
        duration:2500,
        isClosable:true,
        position:"top-right"
      })
    }
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
        <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        m={[10,10,"50px 200px"]}
        height={["610px","480px","360px"]}
        >
            <Image
                objectFit='cover'
                maxW={{ base: '600px', sm: '600px' }}
                src={image}
                alt='Caffe Latte'
                height={{base:"280px",sm:"400px"}}
                mr={[0,0,20]}
            />
            <Stack>
                <CardBody>
                    <Heading fontFamily="inherit" size='md'>{name}</Heading>
                    <Box mt={3} color="white" w={100} p={3} borderRadius={10} bgColor="tomato">
                        Cost:-{cost}
                    </Box>
                    <Text cursor="default" mt={3}>Quantity :- <Button><AddIcon cursor="pointer" mr={3} onClick={addQuantity}/>{quant}<MinusIcon ml={3} cursor="pointer" onClick={subQuantity}/></Button></Text>
                    <Text mt={3}>Rating :- {
                       ratingArray.map((i)=><StarIcon margin="0px 3px" color="yellow.500" key={i+1}/>) 
                    }</Text>
                    <Text py='1' color="tomato">
                        Get this Item by {formatedDate} on {timeArr[delivery-1]}!
                    </Text>
                </CardBody>
                <CardFooter mt={[-10,-10,0]} >
                    <Button mr={3} variant='solid' bgColor="tomato" onClick={buyProduct}>
                        Buy Item
                    </Button>
                    <Button variant='solid' colorScheme='green' onClick={addToCart}>
                        Add to Cart
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    </div>
  )
}

export default Product
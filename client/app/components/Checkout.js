'use client'
import { 
    Heading,
    Card, 
    Stack,
    CardBody,  
    Button,
    Text,    
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
    useDisclosure,
    Center
} from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import Item from './Item'
import { UserContext } from '../contexts/userContext'
import shortid from 'shortid'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import Cookies from 'js-cookie'
const Checkout = ({
    type
}) => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY)
    const [item,setItem] = useState({})
    let { addresses,cart,cost } = useContext(UserContext)
    const [total,setTotal] = useState(0)
    const { isOpen,onOpen,onClose } = useDisclosure()
    const [address,setAddress] = useState(addresses[0]||{})
    const checkOut = async ()=>{
      try {
        const stripe = await stripePromise;
        let data
        if(type==="cart"){
          let items = cart.reduce((acc,val)=>val.quantity+acc,0)
          data = {
            cost,
            items,
            type
          }
        }else{
          data={
            cost:total,
            items:item.quantity,
            type
          }
        }
        localStorage.setItem("address",JSON.stringify(address))
        const paymentId = shortid.generate()
        Cookies.set("payment-id",paymentId) 
        const session = await axios.post("/pay",data)
        await stripe.redirectToCheckout({
          sessionId:session.data.pid
        })
      } catch (error) {
        console.log(error)
      }
    }
    const selectAddModal = (data)=>{
      setAddress(data)
      onClose()
    }
    useEffect(()=>{
        if(type==="order"){
            const item = JSON.parse(localStorage.getItem("item"))
            const itemCost = item.cost*item.quantity
            setTotal(itemCost)
            setItem(item)
        }
    },[])
  return (
    <div>
        <Modal
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior='inside'
        size='xl'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
                addresses.map((i,ind)=><Card direction={{ base: 'column', sm: 'row' }} display="block" key={ind} onClick={()=>selectAddModal(i)} cursor="pointer" margin="5px auto" overflow='hidden'variant='outline'>
                <Stack>
                    <CardBody>
                        <Heading fontFamily="inherit" size='md'>Name:- {i.name}</Heading>
                        <Text>Email:- {i.email}</Text>
                        <Text>Phone:- {i.phone}</Text>
                        <Text>Address:- {i.house},{i.lane}</Text>
                        <Text>City:- {i.city}</Text>
                        <Text>State:- {i.state}</Text>
                        <Text>
                            PinCode:-{i.pincode}
                        </Text>
                    </CardBody>
                </Stack>
            </Card>
              )
            }
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
        <Heading textAlign="center" fontFamily="inherit">
            Checkout
        </Heading>
        {   
           type==="order"?<Item data={item} type="checkout"/>:cart.map((i,ind)=><Item data={i} type="checkout" key={ind} />)
        }
        <Heading fontFamily="inherit" textAlign="center">Selected Address</Heading>
        <Card direction={{ base: 'column', sm: 'row' }} display="block" height={[270,310,260]} width={[400,600,850]}  margin="10px auto"  overflow='hidden'variant='outline'>
            <Stack>
                <CardBody>
                    <Heading fontFamily="inherit" size='md'>Name:- {address.name}</Heading>
                    <Text>Email:- {address.email}</Text>
                    <Text>Phone:- {address.phone}</Text>
                    <Text>Address:- {address.house},{address.lane}</Text>
                    <Text>City:- {address.city}</Text>
                    <Text>State:- {address.state}</Text>
                    <Text>
                        PinCode:-{address.pincode}
                    </Text>
                    <Button onClick={onOpen} colorScheme='blue'>Change</Button>
                </CardBody>
            </Stack>
        </Card>
        <Center>
            <Button mb={2} onClick={checkOut}>
                Proceed To Pay <span style={{textDecoration:"underline",marginLeft:"2px"}}>{ type==="order"?total:cost}₹</span>
            </Button>
          </Center>
    </div>
  )
}

export default Checkout
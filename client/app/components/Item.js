import React, { useContext, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter,Stack,Heading,Text,Button,Image, Spacer, useToast } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { UserContext } from '../contexts/userContext'
const Item = ({
    data,type
}) => {
    const toast = useToast()
    const { dispatchCart } = useContext(UserContext)
    const [quant,setQuant] = useState(data.quantity)
    const getCart = ()=>{
        let cart = localStorage.getItem("cart")
        cart = JSON.parse(cart)
        let cartItems = cart.map(JSON.parse)
        return cartItems
    }
    const saveCart = (itemsArray)=>{
        let cartItems = itemsArray.map(JSON.stringify)
        let cart = JSON.stringify(cartItems)
        localStorage.setItem("cart",cart)
        dispatchCart({type:"UPDATE",cart})
        return toast({
            title:"Cart Updated",
            status:"success",
            duration:2500,
            isClosable:true,
            position:"top-right"
        })
    }
    const addQuantity = ()=>{
        setQuant(data.quantity+1)
        let cartItems = getCart()
        const items = cartItems.filter(({ pid })=>pid!==data.pid)
        let item = cartItems.filter(({ pid })=>pid===data.pid)[0] 
        item = {
            ...item,quantity:data.quantity+1
        }
        items.push(item)
        saveCart(items)
    }
    const subQuantity = ()=>{
        if(data.quantity<=1) return toast({title:"Invalid Quantity",duration:2500,position:"top-right",status:"error"})
        setQuant(data.quantity-1)
        let cartItems = getCart()
        const items = cartItems.filter(({ pid })=>pid!==data.pid)
        let item = cartItems.filter(({ pid })=>pid===data.pid)[0] 
        item = {
            ...item,quantity:data.quantity-1
        }
        items.push(item)
        saveCart(items)
    }
    const removeItem = ()=>{
        let cartItems = getCart()
        const items = cartItems.filter(({ pid })=>pid!==data.pid)
        saveCart(items)
    }
  return (
    <Card
     direction={{ base: 'column', sm: 'row' }}
    overflow='hidden'
    m={[10,10,"10px 200px"]}
    height={[type==="checkout"?"400px":"510px","480px","170px"]}
    variant='outline'
    >
        <Image
            objectFit='cover'
            maxW={{ base: '100%', sm: '130px' }}
            src={data.image}
            height={[280,20,200]}
            alt='Caffe Latte'
            mr={[0,0,50]}
        />
        <Stack>
            <CardBody>
            <Heading size='md' fontFamily="inherit">{data.productname}</Heading>
            <Text>
                Cost :- {
                    data.cost
                }₹
            </Text>
            <Text>
                Quantity :-{type==="checkout"?data.quantity :<Button cursor="default">
                  <AddIcon cursor="pointer" mr={3} onClick={addQuantity}/> {data.quantity} <MinusIcon cursor="pointer" ml={3} onClick={subQuantity}/>
                </Button>}
            </Text>
            { type!=="checkout"&&
            <Button mt={2} bgColor="tomato" onClick={removeItem}>
                Remove Item
            </Button>
            }
            </CardBody>
        </Stack>
    </Card>
  )
}

export default Item
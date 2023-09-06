import { Heading } from '@chakra-ui/react'
import React, { useContext } from 'react'
import Order from './Order'
import { UserContext } from '../contexts/userContext'

const Orders = () => {
    const { orders } = useContext(UserContext)
  return orders.length>0? (
    <div>
        <Heading fontFamily="inherit" textAlign="center">
            Your Orders
        </Heading>
        {
            orders.map((i,ind)=><Order orders={orders} data={i} key={ind}/>)
        }
    </div>
  ):(
    <>
    <Center>
        <Heading fontFamily="inherit">
            You have no orders!
        </Heading>
    </Center>
  </>
  )
}

export default Orders
'use client'
import React from 'react'
import { Card, Stack,CardBody, Heading, Button,Text } from '@chakra-ui/react'
import moment from 'moment'
import genOrder from '@/data/genOrder'
const Order = ({ data,orders }) => {
    const { productname,cost,quantity,orderDate,_id } = data
    const parsedDate = moment.utc(orderDate);
    const time = parsedDate.format('hh:mm:ss A');
    const day = parsedDate.format('YYYY-MM-DD');
  return (
        <Card direction={{ base: 'column', sm: 'row' }} display="block" height={[215,200,160]} margin="10px auto" width={[360,400,600]} overflow='hidden'variant='outline'>
            <Stack>
                <CardBody>
                <Heading fontFamily="inherit" size='md'>Name:- {productname}</Heading>
                <Text>OrderId:- {_id}</Text>
                <Text>Quantity:- {quantity} Items</Text>
                <Text>Cost:- ₹{cost}</Text>
                <Text>
                    OrderedOn:- {day} {time} 
                </Text>
                <Button ml={[0,0,450]} mt={[0,0,-150]} colorScheme='blue' onClick={()=>genOrder(data,orders)}>
                    View Bill
                </Button>
                </CardBody>
            </Stack>
        </Card>
  )
}

export default Order
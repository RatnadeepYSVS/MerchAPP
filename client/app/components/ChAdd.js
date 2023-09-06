import React from 'react'
import { 
    Card, 
    Stack,
    CardBody, 
    Heading, 
    Button,
    Text
} from "@chakra-ui/react"
const ChAdd = ({
    type,address
}) => {
  return (
    <div>
        <Card direction={{ base: 'column', sm: 'row' }} display="block"  margin="10px auto" overflow='hidden'variant='outline'>
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
                    {
                        type==="add"&& <Button onClick={onOpen} colorScheme='blue'>Change</Button>
                    }
                </CardBody>
            </Stack>
        </Card>
    </div>
  )
}

export default ChAdd
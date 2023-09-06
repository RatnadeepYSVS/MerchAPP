import React, { useContext, useState } from 'react'
import { 
    Card, 
    Stack,
    CardBody, 
    Heading, 
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
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    InputRightAddon,
    useDisclosure
 } from '@chakra-ui/react'
import { EditIcon,DeleteIcon } from '@chakra-ui/icons'
import { UserContext } from '../contexts/userContext'
import axios from 'axios'
const Address = ({
    data,type
}) => {
    const { addid } = data
    const toast = useToast()
    const { dispatchAddress } = useContext(UserContext)
    const { isOpen,onOpen,onClose } = useDisclosure()
    const [username,setUserName] = useState(data.name)
    const [email,setEmail] = useState(data.email)
    const [phone,setPhone] = useState(data.phone)
    const [house,setHouse] = useState(data.house)
    const [lane,setLane] = useState(data.lane)
    const [city,setCity] = useState(data.city)
    const [state,setState] = useState(data.state)
    const [pincode,setPincode] = useState(data.pincode)
    const [landmark,setLandmark] = useState(data.landmark)
    let height = landmark?270:250
    const deleteAddress = async()=>{
      try {
        await axios.put(`/removeaddress/${addid}`)
        dispatchAddress({type:"UPDATE",addresses:data})
        return toast({
          title:"Address Removed!",
          status:"success",
          duration:2500,
          isClosable:true,
          position:"top-right"
        })
      } catch (error) {
        return toast({
          title:"Some Error Occured",
          status:"success",
          duration:2500,
          isClosable:true,
          position:"top-right"
        })
      }
    }
    const updateAddress = async()=>{
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
          await axios.put(`/updateaddress/${addid}`,data)
          dispatchAddress({type:"UPDATE",addresses:data})
          onClose() 
          return toast({
              title:"Address Updated",
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
    <>
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
            <Button type='submit' mr={3} onClick={updateAddress}>Update Address</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    <Card direction={{ base: 'column', sm: 'row' }} display="block" height={[320,300,290]} margin="10px auto" width={[400,600,900]} overflow='hidden'variant='outline'>
            <Stack>
                <CardBody>
                <Heading fontFamily="inherit" size='md'>Name:- {data.name}</Heading>
                <Text>Email:- {data.email}</Text>
                <Text>Phone:- {data.phone}</Text>
                <Text>Address:- {data.house},{data.lane}</Text>
                <Text>City:- {data.city}</Text>
                <Text>State:- {data.state}</Text>
                <Text>
                    PinCode:-{data.pincode}
                </Text>
                {
                    data.landmark&&<Text>Landmark:- {data.landmark}</Text>
                }
                {type==="normal"&&
                <Button colorScheme='green' onClick={onOpen}>
                   <EditIcon/> Edit
                </Button>
                }
                {type==="normal"&&
                <Button ml={3} colorScheme='red' onClick={deleteAddress}>
                    <DeleteIcon/> Delete
                </Button>
                }
                </CardBody>
            </Stack>
            </Card>
        </>
  )
}

export default Address
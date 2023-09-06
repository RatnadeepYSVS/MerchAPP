import { 
    Center,
    Heading,
    Box,
    Badge,
    Image,
    useColorMode,
    SimpleGrid,
    Link,
    Button,
    Text
} from '@chakra-ui/react'
import React from 'react'
import { StarIcon } from "@chakra-ui/icons"
import { useRouter } from 'next/navigation'
const Merchandise = ({
    products,merchType
}) => {
    const router = useRouter()
    const viewProduct = (pid)=>{
        return router.push(`/viewmerch?type=${merchType}&pid=${pid}`)
    }
  return (
    <div>
            <Heading textAlign="center" mb={4} fontFamily="inherit">
                { merchType[0].toUpperCase() + merchType.slice(1) }
            </Heading>
            <Center>
            <SimpleGrid columns={[1, 2 , 3]} mb={10} spacing="60px">
                {products.map((i, ind) => {
                    const ratingArray = Array(i.rating).fill(0)
                return (
                    <Box maxW="xs" height="480px" mt={-3} borderWidth="1px" key={ind} borderRadius="lg" overflow="hidden">
                    <Image width="330px" fit="cover" height="300px" src={i.image} />
                    <Box mt={3}>
                        <Box   as="h4" lineHeight="tight" isTruncated textAlign="center">
                        {i.name} 
                        </Box>
                        <Box  as="h4" lineHeight="tight" isTruncated textAlign="center">
                        Cost:- {i.cost} 
                        </Box>
                    </Box>
                    <Box mb={2}>
                        <Box   as="h4" lineHeight="tight" isTruncated textAlign="center">
                         Rating:- { ratingArray.map(i=><StarIcon key={i+1} color="yellow.500" ml={1} />) }  
                        </Box>
                    </Box>
                    <Center>
                        <Button bgColor="green.500" onClick={()=>viewProduct(i.pid)}>
                            view
                        </Button>
                    </Center>
                    </Box>
                );
                })}
            </SimpleGrid>
            </Center>
    </div>
  )
}

export default Merchandise
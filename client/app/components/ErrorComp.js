import { Center, Heading,Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const ErrorComp = () => {
    const router = useRouter()
    const goHome = ()=>{
        return router.push("/")
    }
  return (
    <div>
        <Heading fontFamily="inherit" mt={10} textAlign="center">Something Went Wrong!</Heading>
        <Center>
            <Button onClick={goHome}>
                Go to Home!
            </Button>
        </Center>
    </div>
  )
}

export default ErrorComp
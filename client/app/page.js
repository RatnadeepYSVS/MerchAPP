"use client"
import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <main>
           <Box
        backgroundImage="b4.jpg"
        backgroundSize="cover"
        backgroundPosition="center"
        height="83vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={1}
        mr={3}
        ml={3}
        borderRadius={10}
      >
        <Box textAlign="center">
          <Heading fontFamily="inherit" mt={39} fontSize="2xl" fontWeight="bold" color="white" marginBottom={4}>
            Welcome to Merch.co, All Fashion Styles At One Single Stop!
          </Heading>
          <Heading fontFamily="inherit" fontSize="2xl" fontWeight="bold" color="white" marginBottom={4}>
            Being Fab is the new Cool.Get Every Single Product At A Very Low Price, Only At Merch.
          </Heading>
          <Button colorScheme="teal" size="lg">
            Shop Now!
          </Button>
        </Box>
      </Box>
    </main>
  )
}

'use client'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider,CSSReset,extendTheme,ColorModeScript } from '@chakra-ui/react'
import axios from 'axios'
import Navbar from './Navbar'
import UserContextProvider from '../contexts/userContext'
axios.defaults.baseURL=process.env.NEXT_PUBLIC_BACKEND_API
axios.defaults.withCredentials=true
const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
}
const theme = extendTheme({ config })
export function Providers({ 
    children 
  }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <CSSReset/>
        <UserContextProvider>
          <Navbar/>
          {children}
        </UserContextProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}
import React, { useContext, useEffect, useState } from 'react';
import { Spacer, Button, useColorMode, Heading,Box, Flex, IconButton, Menu, MenuButton, MenuList, MenuItem, Text,Avatar } from '@chakra-ui/react';
import { SunIcon,MoonIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import { UserContext } from '../contexts/userContext';
import axios from 'axios';
import Cookies from 'js-cookie';
const Navbar = () => {
    const {colorMode,toggleColorMode} = useColorMode()
    const { dispatchUser,auth } = useContext(UserContext)
    const router = useRouter()
    const logOut = async()=>{
      setToken("")
      dispatchUser({type:"LOGOUT"})
      Cookies.remove("token")
      await axios.put("/logout")
      return router.push('/')
    }
    const navigateProduct = (prod)=>{
      return router.push(`/${prod}`)
    }
    const goHome =()=>{
      return router.push("/")
    }
  return (
    <Flex as="nav"
    align="center"
    justify="space-between"
    paddingX={8}
    paddingY={4}>
      <Box>
        <Heading fontFamily="inherit" cursor="pointer" fontSize={30} color={'red.500'} onClick={()=>goHome()}>
            Merch.Co!
        </Heading>
      </Box>
      <Spacer />
        <Flex display={{ base: "none", md: "flex" }} align="center">
            <Menu>
              <MenuButton as={Button} mr={3}>Products</MenuButton>
              <MenuList>
              {
                ["Tops","Pants","Bags","Shoes","Caps"].map((i,ind)=><MenuItem key={ind} onClick={()=>navigateProduct(i.toLowerCase())}>{i}</MenuItem>)
              }
              </MenuList>
            </Menu>
            <IconButton
            icon={colorMode==='dark'?<MoonIcon/>:<SunIcon/>}
            aria-label="Cart"
            onClick={()=>toggleColorMode()}
            />
            {
              !auth?<Button bgColor="tomato" onClick={()=>{return router.push("/login")}} ml={4}>
              Login
             </Button>: <Menu>
          <MenuButton ml={3} variant="outline">
            <Avatar/>
          </MenuButton>
          <MenuList>
              {
                ["Cart","Addresses","Orders"].map((i,ind)=><Button variant="ghost" display="block" key={ind} onClick={()=>router.push(`/${i.toLowerCase()}`)}>{i}</Button>)
              }
              <Button bgColor="tomato" display="block" onClick={logOut} ml={3}>LogOut</Button>
          </MenuList>
        </Menu>
            }
        </Flex>
      <Box display={{ base: "block", md: "none" }}>
        <Menu>
          <MenuButton as={Button} mr={1}>Products</MenuButton>
          <MenuList>
            {
              ["Tops","Pants","Bags","Shoes","Caps"].map((i,ind)=><MenuItem key={ind} onClick={()=>navigateProduct(i.toLowerCase())}>{i}</MenuItem>)
            }
          </MenuList>
        </Menu>
        <IconButton
          icon={colorMode==='dark'?<MoonIcon/>:<SunIcon/>}
          aria-label="Cart"
          variant="ghost"
          onClick={()=>toggleColorMode()}
          mr={0}
        />
        {
        !auth?<Button bgColor="tomato" onClick={()=>{return router.push("/login")}} ml={1}>
          Login
         </Button>:        <Menu>
          <MenuButton variant="outline">
            <Avatar/>
          </MenuButton>
          <MenuList>
              {
                ["Cart","Addresses","Orders"].map((i,ind)=><Button variant="ghost" display="block" key={ind} onClick={()=>router.push(`/${i.toLowerCase()}`)}>{i}</Button>)
              }
              <Button bgColor="tomato" display="block" onClick={logOut} ml={3}>LogOut</Button>
          </MenuList>
        </Menu>
        }
      </Box>
    </Flex>
  );
};

export default Navbar;

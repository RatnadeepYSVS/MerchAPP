import { Spinner } from '@chakra-ui/react'
import React from 'react'

const LoadComp = () => {
  return (
    <div style={{textAlign:"center"}}>
        Loading <Spinner display="block" margin="auto"/>
    </div>
  )
}

export default LoadComp
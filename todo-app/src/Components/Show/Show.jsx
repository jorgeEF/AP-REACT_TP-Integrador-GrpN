import React from 'react'
import {Container, Box, Flex, Spacer, Center, Text} from '@chakra-ui/react'

export const Show = () => {
  return (
    <Container marginTop='25vh' maxW='2xl' height='60vh' bg='blue.600' centerContent>
      <Box display='flex' flexDir='column' mt='2' alignItems='center' padding='4' color='white' maxW='md' fontSize='1.7rem'>
        Componente Show
        <Box display='flex' flexDir='column' mt='2' alignItems='center' fontSize='1.4rem'>
          <ul>
            <li>todo 1</li>
            <li>todo 2</li>
            <li>todo 3</li>
            <li>todo 4</li>
            <li>todo 5</li>
            <li>todo 6</li>
            <li>todo 7</li>
            <li>todo 8</li>
            <li>todo 9</li>
            <li>todo 10</li>
          </ul>
        </Box>
      </Box>
    </Container>
  )
}

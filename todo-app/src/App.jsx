import { ChakraProvider } from '@chakra-ui/react'
import { Show } from "./Components/Show/Show.jsx"
export const App = () => {  

  return (
    <ChakraProvider>
      <Show />
    </ChakraProvider>
  )
}

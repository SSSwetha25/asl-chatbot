import * as React from "react"
import "../styles/globals.css"
import { ChakraProvider } from "@chakra-ui/react"
import 'bootstrap/dist/css/bootstrap.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp

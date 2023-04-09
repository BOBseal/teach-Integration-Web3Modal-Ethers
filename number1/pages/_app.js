import '../styles/globals.css'

import { AppProvider } from '../Integration/context'
// The Chain Id and Config can be setup in vanilla but I will use Thirdweb React Library to make it easy af.
//for non popular chains it needs the vanilla setup.

import { ThirdwebProvider , ChainId } from '@thirdweb-dev/react'


export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mumbai}  // thirdweb has some default chains available, if you want to modify those please refer to Thirdweb's Docs
    >
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
    </ThirdwebProvider>
  )
}

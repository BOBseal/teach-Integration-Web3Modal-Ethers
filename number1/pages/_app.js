import '../styles/globals.css'
import { AppProvider } from '../Integration/context'
export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

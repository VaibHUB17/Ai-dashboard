import '@/styles/globals.css'
import { Header } from '@/components/Header'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4">
        <Component {...pageProps} />
      </main>
    </>
  )
}

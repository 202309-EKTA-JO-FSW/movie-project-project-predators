import '@/styles/globals.css'
import '@/styles/actors.css'
import '@/styles/actor.css'
import Navbar from '../components/Navbar'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

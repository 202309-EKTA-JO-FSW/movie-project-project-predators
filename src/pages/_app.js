import '@/styles/globals.css'
import '@/styles/actors.css'
import '@/styles/actor.css'
import '@/styles/movie.css'
import '@/styles/home.css'
import '@/styles/navbar.css'
import '@/styles/search.css'
import Navbar from '../components/Navbar'
import Footer from '@/components/Footer'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

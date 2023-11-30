import '@/styles/globals.css'
// import SingleMoviePage from './movies/[movieId]'

// const TestPage = () => {
//   const movieId = 1075794

//   return <SingleMoviePage id={movieId} />
// }

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

// export default TestPage
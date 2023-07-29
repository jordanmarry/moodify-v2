import '../styles/global.css'
import Head from 'next/head'
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
        <Head>
            <meta name='author' content='Jordan Marry' />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href="/favicon/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            <link rel="manifest" href="/favicon/site.webmanifest" />
        </Head>
        
        <Navbar />
        <Component {...pageProps} />
    </>
  );
}

export default MyApp;
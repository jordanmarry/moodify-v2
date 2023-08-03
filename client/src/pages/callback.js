import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("access_token")

    if (!token && hash){
      token = hash.substring(1).split("&").find(elem => elem.startsWith(
        "access_token"
      )).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)

    }
    window.location.href = '/home'
  }, []);

  return (
    <div className='h-screen'>
      <Head>
        <title>Moodify</title>
      </Head>
    </div>
  );
};

export default Callback;

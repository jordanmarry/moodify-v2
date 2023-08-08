import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';

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

    getAccountInfo()

    window.location.href = '/home'
  }, []);

  const getAccountInfo = async () => {
    try {
      const {data} = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`
        }
      })

      const url = "http://localhost:5050/user"
      axios.post(url, {data})
      .then(result => {
        window.localStorage.setItem("displayName", result.data.display_name)
      })

    } catch (error) {
      console.error('Error while retrieving profile info', error)
    }
    
  }

  return (
    <div className='h-screen'>
      <Head>
        <title>Moodify</title>
      </Head>
    </div>
  );
};

export default Callback;

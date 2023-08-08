import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';

// Callback page when user logins into Spotify API

const Callback = () => {
  const router = useRouter();

  // This will retrieve the access_token from the API. 
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("access_token")

    // Retrieved token from URL if not found in local Storage.
    if (!token && hash){
      token = hash.substring(1).split("&").find(elem => elem.startsWith(
        "access_token"
      )).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    // Retrieving Account Information, Display Name and User ID.
    getAccountInfo()

    // Moves the User to the Home Page
    window.location.href = '/home'
  }, []);

  // Retrieving Account Info from Spotify API
  const getAccountInfo = async () => {
    try {
      // Calling Spotify API for the user's info
      const {data} = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`
        }
      })

      window.localStorage.setItem("displayName", data.display_name)
      window.localStorage.setItem("userId", data.id)

      // Posting the data to /user for the backend to then push this into DB
      const url = "http://localhost:5050/user"
      axios.post(url, {data})

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

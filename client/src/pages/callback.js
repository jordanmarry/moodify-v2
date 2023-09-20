import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';

// Callback page when user logins into Spotify API

const Callback = () => {

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
    const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
    
    // Retrieving Account Info from Spotify API
    const getAccountInfo = async () => {
      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("client_secret", clientSecret)
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri",  `${window.location.origin}/callback`);
      try {

        // Calling Spotify API for tokens
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        const { access_token, refresh_token } = await result.json();
        console.log(access_token, refresh_token);
        window.localStorage.setItem("access_token", access_token);
        window.localStorage.setItem("refresh_token", refresh_token);


        // User Profile Retrieval
        const profile = await fetch("https://api.spotify.com/v1/me", {
          method: "GET", headers: { Authorization: `Bearer ${access_token}` }
        });

        const {display_name, id} = await profile.json();
        console.log(display_name, id)
        window.localStorage.setItem("displayName", display_name)
        window.localStorage.setItem("userId", id) 

        // Posting the data to /user for the backend to then push this into DB
        const url = "http://localhost:5050/user"
        axios.post(url, {display_name, id})

        // Moves the User to the Home Page
        window.location.href = '/home'

      } catch (error) {
        console.error('Error while retrieving profile info', error)
      }
      
    }

    // Retrieving Account Information, Display Name and User ID.
    getAccountInfo()
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

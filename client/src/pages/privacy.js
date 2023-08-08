import React from "react";
import Head from 'next/head';

const Home = () => {
    return (
        <div className='h-screen items-center flex justify-center'>
            <Head>
                <title>Moodify | Privacy Policy</title>
            </Head>

            <div className="text-xl text-center text-off-white sm:w-2/5 mt-96 xs:mt-0 sm:mt-48 md:mt-0">
                <p className="text-4xl pb-10 text-dark-blue">
                    Privacy Policy
                </p>
                <p className="pb-10"> 
                    Moodify is powered by the Spotify Web API. By choosing to 
                    sign in and use this app, you are agreeing to the use of 
                    your Spotify account. 
                </p>

                <p>
                    Your email and first name will be stored for the app usability.
                    The data is protected and encrypted, but if you have any questions about
                    your data contact INSERT EMAIL. 
                </p>
            </div>
        </div>
    )
}

export default Home;
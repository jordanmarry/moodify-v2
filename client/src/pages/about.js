import React from "react";
import Head from 'next/head';

// About Page for moodify.

const Home = () => {
    return (
        <div className='h-screen items-center flex justify-center pt-10 sm:pt-0'>
            <Head>
                <title>Moodify | About</title>
            </Head>

            <div className="text-2xl text-center text-off-white sm:w-2/5">
                <p className="text-4xl pb-10 text-dark-blue">
                    Welcome to Moodify! 
                </p>
                <p>
                    I created this app to allow people to be able to express 
                    their emotions and feelings to friends, significant others, or 
                    family when words aren't enough.
                </p>
            </div>
        </div>
    )
}

export default Home;
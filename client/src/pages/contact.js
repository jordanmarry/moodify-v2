import React from "react";
import Head from 'next/head';

// Simple contact page

const Home = () => {
    return (
        <div className='h-screen items-center flex justify-center mt-16 sm:mt-0'>
            <Head>
                <title>Moodify | Contact</title>
            </Head>

            <div className="text-xl text-center text-off-white sm:w-3/5">
                <p className="text-4xl pb-10 text-dark-blue">
                    Contact
                </p>
                <p className="pb-10"> 
                    For any inquiries, contact me at&nbsp; 
                    <a target="_blank" href="mailto:jordan.a.marry@gmail.com?subject=Moodify" className="text-dark-blue">
                        jordan.a.marry@gmail.com
                    </a>
                    .&nbsp; You can also check out my other projects on my 
                    <a target="_blank" href="https://jordanmarry.github.io/" className="text-dark-blue">
                        personal website
                    </a>
                    .
                </p>
            </div>
        </div>
    )
}

export default Home;
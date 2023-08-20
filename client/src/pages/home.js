import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import SongCard from "../components/SongCard";
import FriendsList from "../components/FriendsList";


// simple home page

const Home = () => {

    const [nameToken, setNameToken] = useState(null)
    const [data, setData] = useState(null);

    const handleSong = () => {
        console.log('SONG')
    };

    useEffect(() => {
        const name = window.localStorage.getItem("displayName");
        const userId = window.localStorage.getItem("userId");

        if (name === null){
            setNameToken(null)
        } else {
            const first_name = name.split(" ")[0]
            setNameToken(first_name)
        }

        const retreiveAccount = async () => {
            try {
                const response = await fetch(`http://localhost:5050/user/${userId}`);
                const jsonData = await response.json();
                setData(jsonData[0]);
                console.log(jsonData[0])
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        if (userId !== null) {
            retreiveAccount()
        }

    }, []);

    return (
        <div className='pt-32 lg:pt-0 h-full lg:h-screen flex flex-col justify-center items-center'>
            <Head>
                <title>Moodify | Home </title>
            </Head>

            <div className="text-3xl text-off-white font-bold">
                Hey! How are we feeling <span className='text-dark-blue'>{nameToken}</span>?
            </div>

            <div className='pt-16 text-center lg:text-left'>
                <div className='lg:flex items-center justify-between text-center gap-32 md:gap-64'>
                    <div className='text-off-white font-bold text-xl pb-8 lg:pb-0'>
                        Your song for the day:
                        {data && data.trackId === "" ? (
                            // Default Song
                            <div className='pt-4'>
                                <button onClick={handleSong}>
                                    <SongCard
                                        imgSrc={"/images/default-song.png"}
                                        song={""}
                                        songLink={""}
                                        artistList={""}
                                        album={""}
                                        albumLink={""}
                                    />
                                </button>
                            </div>
                        ) : (
                            // Chosen Song
                            <div className='pt-4'>
                                <SongCard
                                    imgSrc={"/images/default-song.png"}
                                    song={""}
                                    songLink={""}
                                    artistList={""}
                                    album={""}
                                    albumLink={""}
                                />
                                
                                <button 
                                    onClick={handleSong} 
                                    className="text-xl text-off-white border 
                                        border-dark-blue rounded-md px-12 py-2 
                                        bg-dark-blue hover:bg-off-white 
                                        hover:text-dark-blue transition-all 
                                        duration-500">
                                    
                                    Change Your Song Mood

                                </button>
                            </div>
                        )}
                    </div>
                    <div className='text-off-white font-bold text-xl pb-8 lg:pb-0'>
                            Friends List
                    </div>
                    <div className='text-off-white font-bold text-xl'>
                            Top 10 Songs From Moodify Users
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

export default Home;
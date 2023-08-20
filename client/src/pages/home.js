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
        <div className='pt-24 h-screen'>
            <Head>
                <title>Moodify | Home </title>
            </Head>
            <div className='pt-16'>
                <div className="text-3xl text-off-white font-bold pb-12">
                    Hey! How are we feeling <span className='text-dark-blue'>{nameToken}</span>?
                </div>

                <div className='lg:flex items-center justify-between'>
                    <div className='text-off-white font-bold text-xl pb-8 lg:pb-0'>
                        Your song for the day:
                        {data && data.trackId === "" ? (
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
                            <div className='pt-4'>
                            <SongCard
                                imgSrc={"/images/default-song.png"}
                                song={""}
                                songLink={""}
                                artistList={""}
                                album={""}
                                albumLink={""}
                            />
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
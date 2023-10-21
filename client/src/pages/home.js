import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import SongCard from "../components/SongCard";
import SearchBarPopup from '../components/SearchBarPopup';
import FriendsList from "../components/FriendsListPopup";
import FriendCard from '@/components/FriendCard';

const Home = () => {

    const [nameToken, setNameToken] = useState(null)
    const [data, setData] = useState(null);
    const [topData, setTopData] = useState(null);


    useEffect(() => {
        const name = window.localStorage.getItem("displayName");
        const userId = window.localStorage.getItem("userId");
        
        if (userId == null) {
            window.location.href = '/'
        }

        const retreiveAccount = async () => {
            try {
                if (name === null){
                    setNameToken(null)
                } else {
                    const first_name = name.split(" ")[0]
                    setNameToken(first_name)
                }

                const response = await fetch(`http://localhost:5050/user/${userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jsonData = await response.json();
                console.log('jsonData:', jsonData);
                setData(jsonData[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        const retreiveTopSongs = async () => {
            try {
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        if (userId !== null) {
            retreiveAccount()   
        }

        retreiveTopSongs()
    }, []);

    return (
        <div className='pt-32 lg:pt-0 h-full xl:h-screen flex flex-col justify-center items-center'>
            <Head>
                <title>Moodify | Home </title>
            </Head>

            <div className="text-3xl text-off-white font-bold lg:pt-32">
                Hey! How are we feeling <span className='text-dark-blue'>{nameToken}</span>?
            </div>

            <div className='pt-8 text-center lg:text-left'>
                <div className='xl:flex items-center justify-between text-center gap-32 lg:gap-48'>
                    <div className='text-off-white text-xl pb-24 xl:pb-32'>
                        <div className='font-bold'>
                            Your song for the day:
                        </div>
                        {data === null ? (
                            // Default Song
                            <div className='pt-4'>
                                <div className='pb-4'>
                                    <SongCard
                                        imgSrc={"/images/default-song.png"}
                                        song={""}
                                        songLink={""}
                                        artistList={""}
                                        album={""}
                                        albumLink={""}
                                    />
                                </div>
                                <div>
                                    <SearchBarPopup />
                                </div>
                            </div>
                        ) : (
                            // Chosen Song
                            <div className='pt-4'>
                                <div className='pb-4'> 
                                    <SongCard
                                        imgSrc={data.albumCover}
                                        song={data.song}
                                        songLink={data.songLink}
                                        artistList={data.artistList}
                                        album={data.album}
                                        albumLink={data.albumLink}
                                    />
                                </div>
                                <div>
                                    <SearchBarPopup />
                                    
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='text-off-white font-bold text-xl pb-24 xl:pb-32'>
                            <div className='pb-2'>
                                Following List
                            </div>
                            {data === null ? (
                                <div >
                                </div>
                            ) : (
                                <div className='pb-4'>
                                    {/* Make it show list of 10 friends and then next page*/}
                                    {data.friends.map((friend, index) => (
                                        <FriendCard 
                                            displayName={friend.display_name}
                                            imgSrc={friend.photo}
                                            albumName={friend.album}
                                            songName={friend.song}
                                            artistList={friend.artistList}
                                        />
                                    ))}
                                    
                                </div>
                            )}
                            
                            <FriendsList />

                    </div>
                    <div className='text-off-white font-bold text-xl pb-24 xl:pb-32'>
                            Top 10 Songs From Moodify Users
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

export default Home;
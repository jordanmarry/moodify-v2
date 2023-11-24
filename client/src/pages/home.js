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
    const [currentCardIndex, setCurrentCardIndex] = useState(0)


    useEffect(() => {
        const name = window.localStorage.getItem("displayName");
        const userId = window.localStorage.getItem("userId");
        const topData = (JSON.parse(window.localStorage.getItem("topData")))
        console.log(topData)
        setTopData(topData)
        

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
                setData(jsonData[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        if (userId !== null) {
            retreiveAccount()   
        }
    }, []);

    const handleNextCard = () => {
        if (topData && topData.length > 0) {
            setCurrentCardIndex((currentCardIndex + 1) % topData.length);
        }
    }

    // Button to change to the previous song card on the landing page
    const handlePrevCard = () => {
        if (topData && topData.length > 0) {
            setCurrentCardIndex((currentCardIndex - 1 + topData.length) % topData.length);
        }
    }

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
                    <div className='text-off-white text-lg pb-24 xl:pb-32'>
                        <div className='font-bold text-2xl'>
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
                    <div className='text-off-white text-lg pb-24 xl:pb-32'>
                        <div className='pb-2 text-2xl font-bold'>
                            Following List
                        </div>
                        <div className='pb-2'>
                            <FriendsList />
                        </div>

                        {data === null ? (
                            <div >
                            </div>
                        ) : (
                            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                <div className='pb-4'>
                                    Make it show list of 10 friends and then next page
                                    {data.friends.map((friend, index) => (
                                        <FriendCard 
                                            key={friend.id}
                                            displayName={friend.display_name}
                                            imgSrc={friend.photo}
                                            albumName={friend.album}
                                            songName={friend.song}
                                            artistList={friend.artistList}
                                            id={friend.id}
                                        />
                                    ))}
                                    
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='text-off-white text-lg pb-24 xl:pb-32'>
                        <div className='pb-2 text-2xl font-bold'>
                            Today&apos;s Top 10 Hits By Spotify
                        </div>
                        <div className="">
                            <SongCard
                                imgSrc={topData[currentCardIndex].albumCover}
                                song={topData[currentCardIndex].song}
                                songLink={topData[currentCardIndex].songLink}
                                artistList={topData[currentCardIndex].artistList}
                                album={topData[currentCardIndex].album}
                                albumLink={topData[currentCardIndex].albumLink}
                            />
                            <div className="flex justify-center mt-4">
                                <button className="px-14 py-2 rounded-md mr-6 bg-dark-blue" onClick={handlePrevCard}>Prev</button>
                                <button className="px-14 py-2 rounded-md bg-dark-blue" onClick={handleNextCard}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

export default Home;
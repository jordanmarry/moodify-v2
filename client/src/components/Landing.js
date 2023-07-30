import React, { useEffect, useState } from "react";
import Link from 'next/link';
import SongCard from "./SongCard";

const Landing = () => {

    const [topData, setTopData] = useState(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0)


    // fetching data from localhost where the songs were stored
    const fetchTopData = async () => {
        try {
            const response = await fetch('http://localhost:5050/')
            const data = await response.json()
            if (data === 'Error Retreiving Data'){
                setTopData(null)
            } else {
                setTopData(data)
            }
        } catch (error) {
            console.error('Error while fetching playlist data:', error)
        }
    };
    
    // Fetch data when the component mounts
    useEffect(() => {
        fetchTopData()
    }, [topData])

    const handleNextCard = () => {
        if (topData && topData.length > 0) {
            setCurrentCardIndex((currentCardIndex + 1) % topData.length);
        }
    }
    
    const handlePrevCard = () => {
        if (topData && topData.length > 0) {
            setCurrentCardIndex((currentCardIndex - 1 + topData.length) % topData.length);
        }
    }

    return (
        <div className="text-off-white flex items-center justify-between h-screen pt-24">
            <div className="text-left w-2/5">
                <p className="text-5xl font-bold"> Express Your <span className="text-green">Mood</span> Through Music. </p>
                <div className="pt-6">
                    <Link href='/login' className=" text-xl text-grey border border-green rounded-md px-12 py-2 bg-green hover:bg-off-white transition-all duration-500"> login </Link>  
                </div>
            </div>
            {topData !== null && topData.length > 0 && (
                <div className="w-2/5">
                    <h1 className="text-2xl text-center font-bold pb-8"> Top 10 Songs for Today by Spotify</h1>
                    <div className="">
                        <SongCard
                            imgSrc={topData[currentCardIndex].albumCover}
                            song={topData[currentCardIndex].song}
                            songLink={topData[currentCardIndex].songLink}
                            artistList={topData[currentCardIndex].artistList}
                            album={topData[currentCardIndex].album}
                            albumLink={topData[currentCardIndex].albumLink}
                        />
                        <div className="flex justify-center text-grey mt-4">
                            <button className="px-14 py-2 border border-black rounded-md mr-6 bg-off-white" onClick={handlePrevCard}>Prev</button>
                            <button className="px-14 py-2 border border-black rounded-md bg-off-white" onClick={handleNextCard}>Next</button>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    )
}

export default Landing;
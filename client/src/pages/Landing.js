import React, { useEffect, useState } from "react";
import Link from 'next/link'
import SongCard from "../components/SongCard";

const Landing = () => {
    const [topData, setTopData] = useState(null)
    const [spotToken, setSpotToken] = useState(null)
    const [currentCardIndex, setCurrentCardIndex] = useState(0)

    function compare( a, b ) {
        if ( a.chartPos < b.chartPos ){
            return -1;
        }
        if ( a.chartPos > b.chartPos ){
            return 1;
        }
        return 0;
    }

    // fetching data from localhost where the songs were stored
    const fetchTopData = async () => {
        try {
            const response = await fetch('http://localhost:5050/')
            const data = await response.json()
            data.sort( compare );
            if (data === 'Error Retreiving Data'){
                setTopData(null)
            } else {
                window.localStorage.setItem("topData", JSON.stringify(data))
                setTopData(data)
            }
        } catch (error) {
            console.error('Error while fetching playlist data:', error)
        }
    };
    
    // Button to change to the next song card on the landing page
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

    // The user will login into Spotify API with specific scopes to access data.
    const handleLogin = () => {
        const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
        const redirectUri = `${window.location.origin}/callback`;
        const scopes = ["user-read-private", "user-read-email", "playlist-read-private"]; 
    
        const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
          redirectUri
        )}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=code`;
    
        window.location.href = loginUrl;
      };

    // Fetch data when the component mounts
    useEffect(() => {
        // Getting the top 10 songs from the database
        fetchTopData()

        // retrieving the token from local storage
        const token = window.localStorage.getItem("access_token");

        if (token === null){
            setSpotToken(null)
        } else {
            setSpotToken(token)
        }
    }, [topData])

    return (
        <div className="pt-24 md:pt-0 text-off-white sm:flex items-center justify-between h-full sm:h-screen">
            <div className="text-center md:text-left md:w-2/5">
                <p className="text-5xl font-bold pb-6">
                    Express Your <span className="text-dark-blue">Mood</span> <br/> Through Music. 
                </p>
                {spotToken === null || spotToken === "undefined" ? (
                    <button
                        onClick={handleLogin}
                        className="text-xl text-off-white border border-dark-blue rounded-md px-12 py-2 bg-dark-blue hover:bg-off-white hover:text-dark-blue transition-all duration-500"
                        >
                        Sign in with Spotify
                    </button>
                ) : (
                    <Link href='/home'
                        className="text-xl text-off-white border border-dark-blue rounded-md px-12 py-2.5 bg-dark-blue hover:bg-off-white hover:text-dark-blue transition-all duration-500"
                        >
                        Go to Home
                    </Link>
                )}
            </div>
            {topData !== null && topData.length > 0 && (
                <div className="md:w-2/5 pt-5 pb-16 md:pb-0">
                    <h1 className="text-2xl text-center font-bold pb-4 pt-8 text-off-white"> Today&apos;s Top 10 Hits By Spotify</h1>
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
                            <button className="px-14 py-2 rounded-md mr-6 bg-off-white" onClick={handlePrevCard}>Prev</button>
                            <button className="px-14 py-2 rounded-md bg-off-white" onClick={handleNextCard}>Next</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Landing;
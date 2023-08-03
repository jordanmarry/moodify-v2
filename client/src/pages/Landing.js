import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SongCard from "../components/SongCard";

const Landing = () => {
    const router = useRouter();
    const [topData, setTopData] = useState(null);
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
                setTopData(data)
            }
        } catch (error) {
            console.error('Error while fetching playlist data:', error)
        }
    };
    
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

    const handleLogin = () => {
        const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
        const redirectUri = `${window.location.origin}/callback`;
        const scopes = ["user-read-private", "user-read-email", "playlist-read-private"]; 
    
        const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
          redirectUri
        )}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=token`;
    
        window.location.href = loginUrl;
      };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchTopData()
    }, [topData])

    return (
        <div className="text-off-white flex items-center justify-between h-screen">
            <div className="text-left w-2/5">
                <p className="text-5xl font-bold pb-6">
                    Express Your <span className="text-dark-blue">Mood</span> <br/> Through Music. 
                </p>

                <button
                    onClick={handleLogin}
                    className="text-xl text-off-white border border-dark-blue rounded-md px-12 py-2 bg-dark-blue hover:bg-off-white hover:text-dark-blue transition-all duration-500"
                    >
                    Sign in with Spotify
                </button>
            </div>
            {topData !== null && topData.length > 0 && (
                <div className="w-2/5">
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
import React, { useEffect, useState } from "react";
import Link from 'next/link';

const Landing = () => {

    const [playlistData, setPlaylistData] = useState(null);

    const fetchPlaylistData = async () => {
        try {
            const response = await fetch('http://localhost:5050/');
            const data = await response.json();
            setPlaylistData(data);
            console.log(data)
        } catch (error) {
            console.error('Error while fetching playlist data:', error);
        }
    };
    
    // Fetch data when the component mounts
    useEffect(() => {
        fetchPlaylistData();
    }, []); 

    return (
        <div className="text-off-white flex items-center justify-between h-screen">
            <div className="text-left w-2/5">
                <p className="text-5xl font-bold"> Express Your <span className="text-green">Mood</span> Through Music. </p>
                <div className="pt-6">
                    <Link href='/login' className=" text-xl text-grey border border-green rounded-md px-12 py-2 bg-green hover:bg-off-white transition-all duration-500"> login </Link>  
                </div>
            </div>
            <div className="w-2/5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Aliquam purus sit amet luctus venenatis lectus magna fringilla. 
                Integer vitae justo eget magna fermentum iaculis eu non diam. 
                Etiam sit amet nisl purus in.
            </div>
        </div>
    )
}

export default Landing;
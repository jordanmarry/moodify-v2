import React, { useEffect } from "react";
import Image from "next/image";
import axios from 'axios';


const FriendCard = ({ displayName, imgSrc, albumName, 
    songName, artistList, id }) => {


    const unfollow = () => {
        const url = `http://localhost:5050/removeFriend/${id}`
        const userID = window.localStorage.getItem("userId")
        const friendID = id


        axios.post(url, { userID, friendID })
            .then(() => {
                console.log("DONE")
                location.reload();
            })
            .catch(e => {     
                console.log("Unable to Process Removal");
        });
    }

    return (
        <div className="relative flex flex-row items-center text-off-white shadow-md">
            <button className="text-dark-off-white hover:text-dark-blue absolute top-2 right-2 p-2" onClick={unfollow}>
                -
            </button>
            <div className="p-4 flex flex-col items-center justify-center">
                <img src={imgSrc} alt="Album cover" width={50} height={50} className=""/>   
                <p className="text-sm w-20 block overflow-hidden whitespace-nowrap">{displayName}</p>
            </div>
            <div>
                {songName === "" && albumName === "" ? (
                    <p className="text-lg w-72 block overflow-hidden whitespace-nowrap overflow-ellipsis">No Selection</p>
                ) : (
                    <div>
                        <p className="text-lg w-72 block overflow-hidden whitespace-nowrap overflow-ellipsis">{songName}</p>
                        {artistList && artistList.length > 0 && (
                            <div className="w-72 block overflow-hidden whitespace-nowrap overflow-ellipsis">
                                {artistList.map((artistObj, index) => (
                                    <React.Fragment key={index}>
                                        <span className="text-sm">
                                            {artistObj.artist}
                                        </span>
                                        {index !== artistList.length - 1 && ", "}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default FriendCard;

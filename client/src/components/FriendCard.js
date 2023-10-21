import React, { useEffect } from "react";
import Image from "next/image";

const FriendCard = ({ displayName, imgSrc, albumName, 
    songName, artistList }) => {

    return (
        <div className="flex flex-row items-center text-off-white shadow-md">
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

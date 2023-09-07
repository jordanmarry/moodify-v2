import React, { useEffect } from "react";
import Image from "next/image";

const SongCard = ({ imgSrc, song, songLink, artistList, 
    album, albumLink }) => {

    return (
        <div className="flex flex-col items-center">
            <div className="border border-off-white bg-off-white">
                <div className="p-4">
                    <div className="">
                        {imgSrc === "/images/default-song.png" ? (
                            <Image src={imgSrc} alt="Album cover" priority={true} width={300} height={300} className="pb-20"/>
                        ) : (
                            <a href={songLink}>
                                <Image src={imgSrc} alt="Album cover" priority={true} width={300} height={300} className=""/>
                            </a>
                        )}
                        
                    </div>
                    <div className="text-grey pt-2">
                        <div>  
                            <a href={songLink} className="text-xl w-72 block overflow-hidden whitespace-nowrap overflow-ellipsis">{song}</a>
                        </div>
                        <div>
                            <a href={albumLink} className="text-lg w-72 block overflow-hidden whitespace-nowrap overflow-ellipsis">{album}</a>
                        </div>
                        {artistList && artistList.length > 0 && (
                            <div className="w-72 block overflow-hidden whitespace-nowrap overflow-ellipsis">
                                {artistList.map((artistObj, index) => (
                                    <React.Fragment key={index}>
                                        <a href={artistObj.artistLink} className="text-sm">
                                            {artistObj.artist}
                                        </a>
                                        {index !== artistList.length - 1 && ", "}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SongCard;
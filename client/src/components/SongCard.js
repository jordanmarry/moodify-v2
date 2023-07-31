import React, { useEffect } from "react";
import Link from 'next/link';

const MAX_CHARACTERS = 20;

const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }
    return text;
};

const SongCard = ({ imgSrc, song, songLink, artistList, 
    album, albumLink }) => {

    const truncatedSong = truncateText(song, MAX_CHARACTERS);
    const truncatedAlbum = truncateText(album, MAX_CHARACTERS);

    return (
        <div className="flex flex-col items-center">
            <div className="border border-off-white bg-off-white">
                <div className="p-4">
                    <div className="">
                        <a href={songLink}>
                            <img src={imgSrc} alt="Album cover" className=""/>
                        </a>
                    </div>
                    <div className="text-grey pt-2">
                        <a href={songLink} className="text-xl w-72 block overflow-hidden whitespace-nowrap overflow-ellipsis">{song}</a>
                        <a href={albumLink} className="text-lg w-60 block overflow-hidden whitespace-nowrap overflow-ellipsis">{album}</a>
                        {artistList && artistList.length > 0 && (
                            <div className="">
                                {artistList.map((artistObj, index) => (
                                    <React.Fragment key={index}>
                                        <a href={artistObj.artistLink} className="text-sm">
                                        {truncateText(artistObj.artist, MAX_CHARACTERS)}
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
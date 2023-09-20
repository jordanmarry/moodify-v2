import React, { useEffect } from "react";
import Image from "next/image";

const SongCardSearch = ({ imgSrc, song, artistList, album, isSelected, onClick }) => {

        const cardClasses = `flex flex-row text-dark-blue p-2 rounded-md ${
                isSelected ? "bg-dark-blue text-off-white" : "hover:bg-dark-blue hover:text-off-white"
            }`;

        return (
            <div className={cardClasses} onClick={onClick}>
                <div>
                    <Image src={imgSrc} alt="Album Cover" priority={true} width={80} height={80} className=""/>
                </div>
                <div className="">
                    <p className="text-lg w-72 block overflow-hidden whitespace-nowrap overflow-ellipsis">{song}</p>
                    <p className="text-sm w-72 block overflow-hidden whitespace-nowrap overflow-ellipsis">{album}</p>
                    {artistList && artistList.length > 0 && (
                        <div className="w-72 block overflow-hidden whitespace-nowrap overflow-ellipsis">
                            {artistList.map((artistObj, index) => (
                                <React.Fragment key={index}>
                                    <span className="text-sm">
                                        {artistObj.name}
                                    </span>
                                    {index !== artistList.length - 1 && ", "}
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )

    }

export default SongCardSearch;

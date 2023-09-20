import React, { useState } from 'react';
import axios from 'axios';
import SongCardSearch from '../components/SongCardSearch'

const SearchBarPopup = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=3&offset=0`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
                }
            });

            const top5Results = response.data.tracks.items.slice(0, 5);
            setSearchResults(top5Results);

            console.log(top5Results[0].artists)
        } catch (error) {
            console.error('Error searching for tracks:', error);
        }
    };

    return (
        <div>
            <button className="bg-dark-blue text-off-white px-4 py-2 rounded-md" onClick={openPopup}>
                Choose Your Song
            </button>

            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-off-white p-4 rounded-lg">
                        <div className="flex justify-end pb-2">
                            <button className="text-dark-blue hover:text-grey" onClick={closePopup} >
                                Close
                            </button>
                        </div>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-md p-2 w-full text-dark-blue"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button 
                            className="bg-dark-blue text-white rounded-md p-2 mt-2"
                            onClick={handleSearch}
                        >
                            Search
                        </button>

                        {searchResults.length > 0 && (
                            <div>
                                <h2 className="text-dark-blue font-bold text-2xl pt-4 pb-4 underline">Search Results:</h2>
                                <ul>
                                    {searchResults.map((track) => (
                                        <li key={track.id}>
                                            <button>
                                                <SongCardSearch 
                                                    imgSrc={track.album.images[2].url}
                                                    song={track.name}
                                                    songLink={track.external_urls.spotify}
                                                    artistList={track.artists}
                                                    album={track.album.name}
                                                    albumLink={track.album.external_urls.spotify}
                                                />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBarPopup;

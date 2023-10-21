import React, { useState } from 'react';
import Image from "next/image";
import axios from 'axios';

const FriendsList = ({ friendsList }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [friendQuery, setFriendQuery] = useState('');
    const [noneUser, setNoneUser] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setFriendQuery('');
        setNoneUser(false);
    };

    const handleAddFriend = (friendID) => {
        const url = `http://localhost:5050/addFriend/${friendID}`
        const userID = window.localStorage.getItem("userId")

        axios.post(url, { userID, friendID })
        .then(() => {
            // Request was successful, do something if needed
            closePopup();
            location.reload();
        })
        .catch(e => {     
            setNoneUser(true);
            console.log("Friend not found");
        });
        
    }

    return (
        <div>
            <button className="bg-dark-blue text-off-white px-4 py-2 rounded-md" onClick={openPopup}>
                Add a Friend
            </button>
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-off-white p-4 rounded-lg">
                        <div className="flex justify-end pb-2">
                            <button className="text-dark-blue hover:text-grey" onClick={closePopup} >
                                Close
                            </button>
                        </div>
                        <div className='text-dark-blue pb-4'>
                            Search up your friend's user ID to add them. Your ID is 
                            <div className='text-pink'>
                                {window.localStorage.getItem("userId")}
                            </div>
                        </div>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-md p-2 text-dark-blue"
                            placeholder="Input User ID"
                            value={friendQuery}
                            onChange={(e) => setFriendQuery(e.target.value)}
                        />
                        <div className='pt-2'>
                            <button 
                            className="bg-dark-blue text-white rounded-md p-2 mt-2"
                            onClick={() => handleAddFriend(friendQuery)}
                            >
                                Add Friend
                            </button>
                        </div>
                        {noneUser === true && (
                            <div className='text-red pt-4 text-2xl'>
                                Error: Friend Not Found. Try Again.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
};

export default FriendsList;
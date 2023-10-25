const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require("./model/Users")
const SongModel = require("./model/Songs")
const puppeteer = require('puppeteer')
const SongsModel = require('./model/Songs')

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

// Connect to database
mongoose.connect(process.env.MDBCONNECT)

// get the Top 10 songs from today's top hits. 
// then the songs get added to the database
const topTenSongs = async () => {

    await SongModel.deleteMany({});

    const playlistURL = 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M'

    try {
        const browser = await puppeteer.launch({headless: "new"})
        const page = await browser.newPage()
        await page.goto(playlistURL, { waitUntil: 'networkidle2' })

        // anchor className song title and link to the song
        const anchorSelector = 'a.t_yrXoUO3qGsJS4Y6iXX'

        // span selector to retrieve the artist and the link to artist page
        const spanArtistSelector =
            'span.Type__TypeElement-sc-goli3j-0.bDHxRN.rq2VQ5mb9SDAFWbBIUIn.standalone-ellipsis-one-line'

        // span selector to retrieve the ablum and the link to the album page
        const anchorAlbumSelector =
            'a.standalone-ellipsis-one-line'

        // grab anchorSelector to get the song title and link to the song
        const anchorElements = await page.$$eval(anchorSelector, (anchors) =>
            anchors.slice(0, 10).map((a, index) => ({
                chartPos: index + 1,
                song: a.innerText,
                songLink: a.href,
            }))
        )

        // grab the artist and the link to the artist page
        const spanElements = await page.$$eval(spanArtistSelector, (spans) =>
            spans.slice(0, 10).map((span) => ({
                artistList: Array.from(span.querySelectorAll('a')).map((a) => ({
                    artist: a.innerText,
                    artistLink: a.href,
                })),
            }))
        )

        // grab the album name and the link to the album
        const anchorAlbumElements = await page.$$eval(anchorAlbumSelector, (anchors) =>
            anchors.slice(0, 10).map((a) => ({
                album: a.innerText,
                albumLink: a.href,
            }))
        )

        const imageArr = []
        // using the song link, grab the big photo from it 
        for (let i = 0; i < anchorElements.length; i++) {
            const songUrl = anchorElements[i].songLink

            await page.goto(songUrl, { waitUntil: 'networkidle2' })

            const firstImg = await page.evaluate(() => {
                const imgElement = document.querySelector('img');
                return imgElement ? imgElement.src : null;
            });

            imageArr.push({albumCover: firstImg})
        }

        await browser.close()

        const combinedArray = anchorElements.map((elem, index) => ({
            ...elem,
            ...spanElements[index],
            ...anchorAlbumElements[index],
            ...imageArr[index],
        }))
        
        // Return the scraped data as JSON
        for (let i = 0; i < combinedArray.length; i++) {
            SongModel.create(combinedArray[i]) 
        }
    } 

    catch (error) {
        scrapedData = null;
    }
};

//
// UNCOMMENT BELOW SOON
//

// // Calls top 10 songs function when the backend starts up
// topTenSongs();

// // Calls top 10 songs function when 12 PM passes
// cron.schedule('0 12 * * *', () => {
//     topTenSongs();
// });

app.get("/", async (req, res) => {
    try {
        // Fetch data from MongoDB using Mongoose
        const songs = await SongsModel.find({});
        res.json(songs);
    } catch (err) {
        res.json('Error Retrieving Data');
    }
})

app.post("/user", async (req, res) => {
    // using the API login, passed in info about user
    
    const data = req.body

    var info = {id: data.id, display_name: data.display_name, photo: data.profilePhoto, friends: [], 
        album: "", albumCover: "", albumLink: "", artistLink: [], song: "", songLink: ""}

    // if the db has the id within, don't create a new userModel and return 
    // the info. Else create a new UserModel and return the info still.
    UserModel.findOne({id: data.id})
    .then(async user => {
        if(user) {
            res.json(info)
        } else {
            UserModel.create(info)
            .then(res.json(info))
            .catch(err => res.json(err))
        }
    })
});

app.get("/user/:userId", async (req, res) => {
    try {
        // Fetch data using the provided userId
        const userId = req.params.userId;
        const data = await UserModel.find({ id: userId })
        res.json(data) 
    } catch (err) {
        res.json('Error Retrieving User Info')
    }
})

// Used to add friends to friends list
app.post("/addFriend/:friendId", async (req, res) => {
    const data = req.body
    UserModel.findOne({id: data.userID})
    .then(async user => {
        if (user) {
            
            UserModel.findOne({id: data.friendID})
            .then(async friend => {
                if (friend) {
                    user.friends.push({
                        id: friend.id, 
                        display_name: friend.display_name, 
                        photo: friend.photo, 
                        ablumCover: friend.albumCover, 
                        album: friend.album,
                        song: friend.song, 
                        artistList: friend.artistList, 
                        })
                    await user.save();
                    res.status(200).send("Song data added to the user.");
                } else {
                    res.status(404).send("Friend not found.");
                }
            })
            
        } else {
            res.status(404).send("User not found.");
        }
    })
})

app.post("/removeFriend/:friendId", async (req, res) => {
    const data = req.body
    try {
        const user = await UserModel.findOneAndUpdate(
            { id: data.userID },
            { $pull: { friends : { id: data.friendID } } }
        );
        res.status(200).send("Removed Friend Successfully");
    } catch (e) {
        res.status(500).send("Server Error")
    }
})

app.post("/userSong", async (req, res) => {
    const data = req.body

    UserModel.findOne({id: data.userID})
    .then(async user => {
        if (user) {
            
            user.album = data.albumName
            user.albumCover = data.albumCover
            user.albumLink = data.albumLink
            user.artistList = data.artistList
            user.song = data.songName
            user.songLink =data.songLink

            // Save the updated user object
            await user.save();

            res.status(200).send("Song data added to the user.");
        } else {
            res.status(404).send("User not found.");
        }
    })
})

app.listen(5050, () => {
    console.log('Server is running')
});
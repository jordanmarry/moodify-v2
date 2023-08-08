const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require("./model/Users")
const SongModel = require("./model/Songs")
const sanitize = require('mongo-sanitize')
const bcrypt = require("bcrypt")
const puppeteer = require('puppeteer')
const cron = require('node-cron')
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
//     scrapePlaylist();
// });

app.get("/", async (req, res) => {
    try {
        // Fetch data from MongoDB using Mongoose
        const songs = await SongsModel.find({});
        res.json(songs);
    } catch (err) {
        res.json('Error Retreiving Data');
    }
})

app.post("/user", async (req, res) => {
    // using the API login, passed in info about user
    const {data} = req.body

    console.log(data.id)

    var info = {id: data.id, display_name: data.display_name, friends: []}

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

app.listen(5050, () => {
    console.log('Server is running')
});
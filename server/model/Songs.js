const mongoose = require("mongoose")

const SongsSchema = new mongoose.Schema({
    album: String,
    albumCover: String,
    albumLink: String,
    artistList: Array,
    chartPos: Number,
    song: String,
    songLink: String
})

const SongsModel = mongoose.model("songs", SongsSchema)
module.exports = SongsModel
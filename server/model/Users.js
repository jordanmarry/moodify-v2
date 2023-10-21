const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema({
    id: String,
    display_name: String,
    photo: String,
    friends: Array,
    album: String,
    albumCover: String,
    albumLink: String,
    artistList: Array,
    song: String,
    songLink: String
})

const UsersModel =  mongoose.model("users", UsersSchema)
module.exports = UsersModel 
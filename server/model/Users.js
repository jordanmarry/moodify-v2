const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema({
    id: String,
    display_name: String,
    friends: Array,
})

const UsersModel =  mongoose.model("users", UsersSchema)
module.exports = UsersModel 
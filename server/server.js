const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require("./model/Users")
const sanitize = require('mongo-sanitize')
const bcrypt = require("bcrypt")

require('dotenv').config();

const app = express()
app.use(express.json())
app.use(cors())

// Connect to database
mongoose.connect(process.env.MDBCONNECT)

// 
app.post("/login", (req, res) => {

    // retrieve given password and email
    const {email, password} = req.body

    // clean the password and email 
    var cleanEmail = sanitize(email)
    var cleanPass = sanitize(password)
    
    // find if the user exists within the database
    UserModel.findOne({email: cleanEmail})
    .then(async user => {
        if(user) {
            const pass = await bcrypt.compare(cleanPass, user.password)
            // if passwords match return sucess
            if (pass) {
                res.json("Sucess")
            } 
            // if they don't, return password is incorrect
            else {
                res.json("Password is Incorrect")
            }
        
        } else {
            res.json("User Does Not Exist ")
        }
    })
})

app.post("/register", async (req, res) => {

    // retrieve the password, name, email of user
    const {name, email, password} = req.body

    // clean info given
    var cleanName = sanitize(name)
    var cleanEmail = sanitize(email)
    var sanPass = sanitize(password)

    var cleanPass = await bcrypt.hash(sanPass, 13)

    var info = {name: cleanName, email: cleanEmail, password: cleanPass}

    UserModel.findOne({email: cleanEmail})
    .then(async user => {
        if(user) {
            res.json("User Already Exists.")
        
        } else {
            // create the user and put them in the database
            UserModel.create(info) 
            .then(res.json("Registered Successfully"))
            .catch(err => res.json(err))
        }
    })

    
})

app.listen(3001, () => {
    console.log('Server is running ')
})
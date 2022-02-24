/*      
        Sheak Iftakhar Rahaman
        101054615
*/
const express = require('express')
const User = require('../models/User')
const { db } = require('../models/User')
const userModel = require('../models/User')
const users = require('../User')

const app = express()

console.log(users)

// GET All Users
app.get('/users', async (req, res) => {
    const users = await userModel.find({})

    try {
        res.status(200).send(users)
    } catch(err) {
        console.log("ERROR: " + err)
        res.status(500).send(err)
    }
})

// POST a User / Create New Records
app.post('/users', async (req, res) => {
    User.insertMany(users)
})

module.exports = app
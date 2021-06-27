require('dotenv/config')
const express=require('express')

const app=express()

const bodyParser=require('body-parser')
const { urlencoded } = require('body-parser')
app.use(bodyParser.json())

// Creating Databse Connection
const mongoose=require('mongoose')
mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true, useUnifiedTopology: true },function(){
    console.log('connection successful')
})

// Importing routes
const Users=require('./User/User.js');
const Story=require('./Story/story.js');

// Route MiddleWares
app.use('/User',Users);
app.use('/Story',Story);

// Home Page
app.get('/',function(req,res){
    res.send("You are on home page");
})

// Server
let port=3000
app.listen(port,function(){
    console.log("Server running on port "+port)
})
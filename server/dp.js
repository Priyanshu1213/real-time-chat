const mongoose=require('mongoose')
const dotenv = require("dotenv")



//This is used to hide password and id in  database url . "npm i dotenv"
dotenv.config();

// const MongoUser= process.env.DB_username;
// const MongoPass= process.env.DB_userpass;

var mongoURL=`mongodb+srv://priyanshuyadav39976:priyanshu@cluster0.m6bjq0k.mongodb.net/`


   mongoose.connect(mongoURL)
var connection=mongoose.connection;
connection.on('error' , ()=>{
   console.log("  ")
})
connection.on('connected' , ()=>{
   console.log("Mongo is running")
})
module.exports =mongoose;


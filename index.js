const express = require('express');
const cors = require('cors');
require('dotenv').config()

require("./config/dbConfig");
const notes = require("./routes/notes")

const PORT = process.env.PORT || 9876 ;

const app = express() ;

var cors_domains = process.env.cors_domains ;

var corsOptions = {
  origin: function (origin, callback) {
    if (cors_domains.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


app.use(cors(corsOptions))

app.get("/" , (_,res) => {
    res.status(200).send("To kaise hai aap log") ;
})

app.use("/notes",notes) ;

app.all("*",(_,res) => {
    res.status(404).json({status:"error",message:"Page Not Found!"});
})

app.listen(PORT,() => {
    console.log(`Listen on Port : ${PORT}`) ;
})
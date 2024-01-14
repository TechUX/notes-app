const express = require('express');
const cors = require('cors');

require("./config/dbConfig");
const notes = require("./routes/notes")

const PORT = process.env.PORT || 8080 ;

const app = express() ;

var corsOptions = {
    origin: 'http://127.0.0.1:8080',
    optionsSuccessStatus: 200
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
const express = require('express');
require("./config/dbConfig");
const notes = require("./routes/notes")

const PORT = process.env.PORT || 8080 ;

const app = express() ;

app.get("/", (_,res) => {
    res.status(200).send("To kaise hai aap log") ;
})

app.use("/notes",notes) ;

app.all("*",(_,res) => {
    res.status(404).json({"message":"Page Not Found!"});
})

app.listen(PORT,() => {
    console.log(`Listen on Port : ${PORT}`) ;
})
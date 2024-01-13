const express = require('express');

const PORT = process.env.PORT || 8080 ;

const app = express() ;

app.get("/", (_,resp) => {
    resp.status(200).send("To kaise hai aap log") ;
})


app.listen(PORT,() => {
    console.log(`Listen on Port : ${PORT}`) ;
})
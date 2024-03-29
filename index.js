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
    if (cors_domains.indexOf(origin) !== -1 || !origin ) {
      callback(null, true)
    } else {
      callback(new Error('CORSerror'))
    }
  }
}

app.use(cors(corsOptions))
app.disable('x-powered-by');

// handle if error generated by CORS
app.use((err, _, res, next) => {
    if (err.message === 'CORSerror') {
      res.status(403).json();
    } else {
      next(err);
    }
  });

  
app.get("/" , (_,res) => {
    res.setHeader("App","Simple Notes App") ;
    res.status(200).send("To kaise hai aap log") ;
})

app.use("/notes",notes) ;

app.all("*",(_,res) => {
    res.status(404).json({status:"error",message:"Page Not Found!"});
})

app.listen(PORT,() => {
    console.log(`Listen on Port : ${PORT}`) ;
})
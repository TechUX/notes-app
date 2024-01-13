const express = require('express');
const notes = require("../schema/notes")

const app = express.Router() ;

// list all notes
app.get("/", async (_,res) => {
    let data = await notes.find({});
    res.status(200).send(data) ;
}) ;

// list notes by id or title
app.get('/:by',async (req,res)=>{
    let value = req.query.value ;
    if(!["title","id"].includes(req.params.by) || !value){
        return res.status(400).send("Missing or Invalid parameter or value") ;
    }

    try {
        if (req.params.by == "id"){
            let data = await notes.find({_id:value});
            return res.status(200).send(data) ;
        } else {
            let data = await notes.find({title:{ $regex: value, $options: 'i' }}) ;
            return res.status(200).json({status:"ok",data:data}) ;
        }
    } catch(error){
        console.log(error);
        return res.status(500).json({status:"error", msg:"Pass correct value with ID"}) ;
    }
    
    

    // if(!req.params.by || !req.params.value){
    //     return res.status(400).send('Missing parameter');
    // }
    // let data = await notes.find({req.params.by:req.params.value}) ;

    // res.send(data) ;
}) ;


module.exports = app ;
const express = require('express');
const notes = require("../schema/notes")

const app = express.Router() ;

app.use(express.json());

// list all notes
app.get("/", async (_,res) => {
    let data = await notes.find({});
    res.status(200).json({status:"ok",note:data}) ;
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
            return res.status(200).json({status:"ok",note:data}) ;
        } else {
            let data = await notes.find({title:{ $regex: value, $options: 'i' }}) ;
            res.status(200).json({status:"ok",note:data}) ;
        }
    } catch(error){
        console.log(error);
        res.status(500).json({status:"error", msg:"Pass correct value with ID"}) ;
    }
    
    

    // if(!req.params.by || !req.params.value){
    //     return res.status(400).send('Missing parameter');
    // }
    // let data = await notes.find({req.params.by:req.params.value}) ;

    // res.send(data) ;
}) ;

// create a new note

app.post("/add", async (req,res)=>{
    let note = req.body

    if(!note){
        return res.status(400).json({status:"error", msg:"Missing notes content"}) ;
    }
    note.createdAt = Date.now();
    note.updatedAt = Date.now();

    let newNote = new notes(note) ;

    try {
        const result = await newNote.save() ;
        res.status(201).json({status:'ok',msg:result}) ;
    }
    catch(e){
        res.status(400).json({status:'error',msg: e}) ;
    }
})

module.exports = app ;
const mongoose = require('mongoose');

let notesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: Date,
    updatedAt: Date
});

let notes = mongoose.model("notes", notesSchema) ;

module.exports = notes ;
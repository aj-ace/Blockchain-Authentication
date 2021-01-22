const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    token:{
        type: String,
        required: true
    }
});

const Note = mongoose.model('note', NoteSchema);

module.exports = Note;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const NoteSchema = new Schema({
  note: {
    type: String,
    required: true
  },
  user_id: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Note = mongoose.model('note', NoteSchema);
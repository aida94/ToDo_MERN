const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const ItemSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    note_id: {
        type: String,
        required: true
    },
    is_checked: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);
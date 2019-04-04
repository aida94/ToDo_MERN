const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Items Model
const Item = require('../../models/Item');

// @route   Get /api/items
// @desc    Get items
// @access  Private
router.get('/:note_id', (req, res) => {
    Item.find()
        .where('note_id', req.params.note_id)
        .sort({ date: -1 })
        .then(items => res.json(items))
});

// @route   Post /api/items
// @desc    Add item
// @access  Private
router.post('/:note_id', (req, res) => {
    const { item } = req.body;

    if(!item) {
        return res.status(400).json({ msg: 'Please add item' });
    }

    const newItem = new Item ({
        item,
        note_id: req.params.note_id
    });

    newItem.save()
        .then(item => res.json(item));
});

// @route   Post /api/items
// @desc    Check item
// @access  Private
router.put('/:id', (req, res) => {
    const id = req.params.id;

    Item.findById(id)
        .then(item => {
            let check = !item.is_checked;
            console.log(check);
            Item.updateOne({ is_checked: check })
        });

    // Item.findByIdAndUpdate( 
    //     // the id of the item to find
    //     id,

    //     // the change to be made.
    //     { $set: {"is_checked": false} },

    //     // an option that asks mongoose to return the updated version of the document instead of the pre-updated one.
    //     {new: true},
        
    //     // the callback function
    //     (err, item) => {
    //     // Handle any possible database errors
    //         if (err) return res.status(500).send(err);
    //         return res.send(item);
    //     }
    // );
});

// @route   Delete /api/items
// @desc    Delete item
// @access  Private
router.delete('/:id', (req, res) => {
    Item.findOneAndDelete({_id: req.params.id }, 
    (error, result) => {
      if (error) return res.status(404).send(error);
      return res.status(200).send(result);
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Items Model
const Item = require('../../models/Item');


// @route   Get /api/items/:note_id
// @desc    Get items
// @access  Private
router.get('/:note_id', auth, async (req, res) => {

  try {
    const items = await Item.find().where('note_id', req.params.note_id).sort({ date: -1 });
    return res.json({ items });

  } catch(error) {
      throw(error);
  }

});


// @route   Post /api/items/:note_id
// @desc    Add item
// @access  Private
router.post('/:note_id', auth, async (req, res) => {
  const { item } = req.body;

  // Validate input
  if(!item) {
    return res.status(400).json({ msg: 'Please add item' });
  }

  try {
    const newItem = await Item.create({ item, note_id: req.params.note_id });
    return res.json({ item: newItem });

  } catch(error) {
      throw(error)
  }

});


// @route   Post /api/items/:id
// @desc    Check item
// @access  Private
router.put('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.json({ message: 'Item not found!' });
    }
    const updatedItem = await Item.findOneAndUpdate({ _id: id }, { is_checked: !item.is_checked }, { new: true });
    return res.json({ updatedItem });

  } catch (error) {
    throw error;
  }

});


// @route   Delete /api/items/:id
// @desc    Delete item
// @access  Private
router.delete('/:id', async (req, res) => {

  try {
    const item = await Item.findOneAndDelete({ _id: req.params.id });
    return res.json({ item });

  } catch(error) {
      throw(error)
  }

});

module.exports = router;
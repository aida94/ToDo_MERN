const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Notes Model
const Note = require('../../models/Note');


// @route   Get api/notes
// @desc    Get user notes
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find().where('user_id', req.user.id).sort({ date: -1 });
    return res.json({ notes });

  } catch(error) {
      throw(error);
  }
});


// @route   Post api/notes
// @desc    Add note
// @access  Private
router.post('/', auth, async (req, res) => {
  const { note } = req.body;

  // Validate input
  if(!note) {
    return res.status(400).json({ msg: 'Please add note' });
  }

  try {
    const newNote = await Note.create({ note, user_id: req.user.id });
    return res.json({ note: newNote });

  } catch(error) {
      throw(error)
  }
});


// @route   Delete api/notes/:id
// @desc    Delete note
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id });
    return res.json({ note });

  } catch(error) {
      throw(error)
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Notes Model
const Note = require('../../models/Note');

// @route   Get api/notes
// @desc    Get user notes
// @access  Private
router.get('/', auth, (req, res) => {
    Note.find()
        .where('user_id', req.user.id)
        .sort({ date: -1 })
        .then(notes => res.json(notes))
});

// @route   Post api/notes
// @desc    Add note
// @access  Private
router.post('/', auth, (req, res) => {
    const { note } = req.body;

    if(!note) {
        return res.status(400).json({ msg: 'Please add note' });
    }

    const newNote = new Note ({
        note,
        user_id: req.user.id
    });

    newNote.save()
        .then(note => res.json(note));
});

// @route   Delete api/notes
// @desc    Delete note
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Note.findById(req.params.id)
        .then(note => 
            note.remove()
                .then(() => res.json({ success: true}))
        )
        .catch(err => res.status(404)
                            .json({success: false})
        );
});

module.exports = router;
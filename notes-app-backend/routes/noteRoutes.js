const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const auth = require('../middleware/auth');

router.get('/', auth, noteController.getAllNotes);
router.get('/:id', auth, noteController.getNote);
router.post('/', auth, noteController.createNote);
router.patch('/:id', auth, noteController.updateNote);
router.delete('/:id', auth, noteController.deleteNote);
router.post('/:id/collaborators', auth, noteController.addCollaborator);

module.exports = router;
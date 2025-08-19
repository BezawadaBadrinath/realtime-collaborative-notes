const User = require('../models/User');
const Note = require('../models/Note');

// Get all notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.user.id });
    res.json({ notes });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single note
exports.getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ note });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create note
exports.createNote = async (req, res) => {
  try {
    const note = new Note({ ...req.body, owner: req.user.id });
    await note.save();
    res.status(201).json({ note });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update note
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ note });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addCollaborator = async (req, res) => {
  try {
    const { email } = req.body;
    const collaborator = await User.findOne({ email });
    if (!collaborator) {
      return res.status(404).json({ message: 'Collaborator not found' });
    }
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { $addToSet: { collaborators: collaborator._id } },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ message: 'Note not found or not owned by you' });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
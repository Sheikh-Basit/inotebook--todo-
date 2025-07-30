const express = require('express');
const router = express.Router();
const Notes = require('../model/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// Get all notes of login user  (GET /auth)    http://localhost:3000/note/getallNotes
router.get('/getallNotes', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({user:req.user.id})
    // if(notes==0){
    //     res.send({message:"No notes are available for given user"})
    // }
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create a new Note (POST /auth)  http://localhost:3000/note/addNote
router.post('/addNote', [
  body('title').notEmpty().withMessage("Title must be Required"),
  body('tag'),
  body('description').isLength({ min: 5 }).withMessage('Description must be atleast 5 character'),
],fetchuser, async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const { title, tag, description } = req.body;

    const note = await Notes.create({ user:req.user.id,title, tag, description });

    res.status(201).json({ note });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update a Note (PUT /auth)   http://localhost:3000/note/updateNote/id
router.put('/updateNote/:id',fetchuser, async (req, res) => {
  try {

    const { title, tag, description } = req.body;
    const newNote = {};
    if(title){newNote.title = title}
    if(tag){newNote.tag = tag}
    if(description){newNote.description = description}

    //Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(401).send("Not Found")
    }

    //check the authenticated user update the note or not
    if(note.user.toString() != req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.status(201).json({ note, message:"Note Updated Successfully" });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a Note (DELETE /auth)   http://localhost:3000/note/deleteNote/id
router.delete('/deleteNote/:id',fetchuser, async (req, res) => {
  try {

    //Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(401).send("Not Found")
    }

    //check the authenticated user delete the note or not
    if(note.user.toString() != req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.status(201).json({ message:"Note Deleted Successfully" });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
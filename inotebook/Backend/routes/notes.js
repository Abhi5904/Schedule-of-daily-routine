const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../model/Notes')
const { body, validationResult } = require('express-validator')

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }

})

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 4 }),
    body('description', 'description must be 5 character').isLength({ min: 5 }),
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { title, description, tag } = req.body
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }
})
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not found")
        }
        console.log(note.title)
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }
})
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "success":"note has been deleted",note:note })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router
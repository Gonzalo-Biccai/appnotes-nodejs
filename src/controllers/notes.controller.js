const notesCtrl = {}

const Note = require('../models/Note')
const { request } = require('../server')

notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note')
}

notesCtrl.createNewNote = async (req, res) => {
    const { title, description } = req.body
    const newNote = new Note({title, description})
    newNote.user = req.user.id
    await newNote.save()
    req.flash('success_msg', 'Note Added')
    

    res.redirect('/notes')
}

notesCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find({user: req.user.id}).lean().sort({createdAt: 'desc'}); //Sin el lean() no se lee como debe
    res.render('notes/all-notes', { notes })
}

notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean()
    if(note.user != req.user.id){
        req.flash('error_msg', 'No es tu nota')
        return res.redirect('/notes')
    }
    res.render('notes/edit-note', { note })
}

notesCtrl.updateNote = async (req, res) => {
    //console.log(req.body)
    const { title, description } = req.body
    await Note.findByIdAndUpdate(req.params.id, {title, description})
    req.flash('success_msg', 'Note Updated')
    res.redirect('/notes')
}

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Note Deleted')
    res.redirect('/notes')
}

module.exports = notesCtrl
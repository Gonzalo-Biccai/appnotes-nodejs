const notesCtrl = {}

const { Note, TimeNote } = require('../models/Note')
const User = require('../models/User')
const { request } = require('../server')

// Add (GET)
notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note')
}

// Add (POST)
notesCtrl.createNewNote = async (req, res) => {
    //console.log(req.body) //Muestra los datos enviados del formulario, solo los que tenian name
    console.log(req.body.noteType)
    var newNote
    var { title, description, datetimeLocal } = req.body
    switch (req.body.noteType) { //No funciona excepto descripcion
        case "Descripcion":
            console.log('Descripcion Note')
            newNote = new Note({title, description})
            break;
        case "Tiempo":
            console.log('Time Note')
            newNote = new TimeNote({title, datetimeLocal})
            newNote.time = datetimeLocal
            break;
        case "Lista":
            console.log('Lista Note')
            newNote = new Note({title, description})
            break;
        default:
            break;
    }
    //const { title, description } = req.body
    //newNote = new Note({title, description})
    newNote.user = req.user.id
    const userC = await User.findById({_id: req.user.id}).lean(); //Sin el lean() no se lee como debe
    newNote.creador = userC.name
    await newNote.save()
    req.flash('success_msg', 'Note Added')
    res.redirect('/notes')
}

// View All (GET)
notesCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find({user: req.user.id}).lean().sort({createdAt: 'desc'}); //Sin el lean() no se lee como debe
    const timeNotes = await TimeNote.find({user: req.user.id}).lean().sort({createdAt: 'desc'}); //Sin el lean() no se lee como debe
    res.render('notes/all-notes', { notes, timeNotes })
}

notesCtrl.renderEditForm = async (req, res) => {
    var note = await Note.findById(req.params.id).lean()
    if(!note){ note = await TimeNote.findById(req.params.id).lean() }
    

    if(note.user != req.user.id){
        req.flash('error_msg', 'No es tu nota')
        return res.redirect('/notes')
    }
    res.render('notes/edit-note', { note })
}

notesCtrl.updateNote = async (req, res) => {
    //console.log(req.body)
    const { title, description, datetimeLocal } = req.body
    var notes = await Note.findByIdAndUpdate(req.params.id, {title, description})
    if(!notes) { notes = await TimeNote.findByIdAndUpdate(req.params.id, {title, time: datetimeLocal}) }
    console.log(req.body)
    console.log(notes)
    
    req.flash('success_msg', 'Note Updated')
    res.redirect('/notes')
}

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    await TimeNote.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Note Deleted')
    res.redirect('/notes')
}

module.exports = notesCtrl
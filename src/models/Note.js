const { Schema, model } = require('mongoose')

const NoteScheme = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    user: { type: String, required: true},
    creador: { type: String }
}, {
    timestamps: true
})

const TimeNoteScheme = new Schema({
    title: { type: String, required: true },
    time: { type: String },
    user: { type: String, required: true},
    creador: { type: String }
}, {
    timestamps: true
})

const ListNoteScheme = new Schema({
    title: { type: String, required: true },
    list: { type: Array },
    user: { type: String, required: true},
    creador: { type: String }
}, {
    timestamps: true
})

var Nota = model('Note', NoteScheme)
var TiempoNota = model('TimeNote', TimeNoteScheme)
var ListaNota = model('ListNote', ListNoteScheme)
module.exports = {
    Note: Nota,
    TimeNote: TiempoNota,
    ListNote: ListaNota
}

//module.exports = model('Note', NoteScheme)
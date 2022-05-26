const mongoose = require('mongoose')

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE, MONGODB_ATLAS } = process.env;
//const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`

mongoose.connect('mongodb+srv://All:123@cluster0.4ube8.mongodb.net/notes-app?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(db => console.log('Database is connected'))
.catch(err => console.log(err))
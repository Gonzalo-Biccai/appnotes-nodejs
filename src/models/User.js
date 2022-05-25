const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const UserScheme = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
})

UserScheme.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

UserScheme.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

/*
UserScheme.methods.matchPassword = password => {
    await bcrypt.compare(passowrd)
}
*/

module.exports = model('User', UserScheme)
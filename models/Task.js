const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completion : {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
},
    {
        versionKey: false //here
    }
)

module.exports = mongoose.model('Task', taskSchema)
const mongoose = require ('mongoose')

const schema = new mongoose.Schema({
    id:{
        type: Number,
        require: true,
    },
    task: {
        type: String,
        require: true,
    },
    strike: {
        type: String,
        require : true,
    },
    edit: {
        type : Boolean,
        require: true,
    }
})

module.exports = mongoose.model ('task', schema)
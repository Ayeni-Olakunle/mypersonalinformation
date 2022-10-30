const mongoose = require('mongoose');
const infoSchema = mongoose.Schema({
    linkName: {
        type: String,
        required: [true, "Please enter a text"],
    },
    link: {
        type: String,
        required: [true, "Please enter a text"],
    },
    description: {
        type: String,
        required: [true, "Please enter a text"],
    }
}, { timestamps: true })

module.exports = mongoose.model("informations", infoSchema)
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: String,  // Optional
    imageUrl: {
        type: String,
        required: true
    },
    description: String  // Optional
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
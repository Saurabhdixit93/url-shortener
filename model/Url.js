const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        require: true,
    },
    shortUrl: {
        type: String,
        require: true,
    },
    clicks: {
        type: Number,
        require: true,
    },
    createdAt: {
        type: Date,
        require: true,
    }

});

module.exports = mongoose.model('Url' , UrlSchema);
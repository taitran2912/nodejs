const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
    Name: { type: String, maxLength: 255 },
    Description: { type: String, maxLength: 600 },
    Image: { type: String, maxLength: 255 },
    CreatedAt: { type: Date, default: Date.now },
    UpdatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', Course);

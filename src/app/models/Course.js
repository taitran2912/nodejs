const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const slugify = require('slugify');

const Course = new Schema(
    {
        Name: { type: String, required: true },
        Description: { type: String, maxLength: 600 },
        Image: { type: String, maxLength: 255 },
        VideoId: { type: String, maxLength: 255 },
        Level: { type: String, maxLength: 255 },
        Slug: { type: String, unique: true },
    },
    {
        timestamps: true,
    },
);

// Tự động tạo slug trước khi lưu
Course.pre('save', function (next) {
    if (!this.Slug && this.Name) {
        this.Slug = slugify(this.Name, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('Course', Course);

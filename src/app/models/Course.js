const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');
const mongooseDelete = require('mongoose-delete');

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

// mongoose.plugin('slug');

// Đảm bảo slug không trùng
Course.pre('save', async function (next) {
    if (!this.isModified('Name')) return next(); // Không đổi Name → bỏ qua

    let baseSlug = slugify(this.Name, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    // Kiểm tra trùng slug
    while (await mongoose.models.Course.findOne({ Slug: slug })) {
        slug = `${baseSlug}-${count++}`;
    }

    this.Slug = slug;
    next();
});

// Soft delete
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

// custom query helpers
Course.query.sortable = function (req) {
    if (Object.prototype.hasOwnProperty.call(req.query, '_sort')) {
        const isValidtype = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc',
        });
    }
    return this;
};

module.exports = mongoose.model('Course', Course);

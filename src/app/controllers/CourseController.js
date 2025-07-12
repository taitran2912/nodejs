const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ Slug: req.params.slug })
            .then((course) => {
                res.render('course/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('course/create');
    }

    // [POST] /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.Image = `https://img.youtube.com/vi/${req.body.VideoId}/sddefault.jpg`;

        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => {
                if (error.name === 'ValidationError') {
                    res.status(400).send('Validation Error: ' + error.message);
                } else {
                    next(error);
                }
            });
    }
    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) => {
                res.render('course/edit', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        const formData = req.body;
        formData.Image = `https://img.youtube.com/vi/${req.body.VideoId}/sddefault.jpg`;

        Course.updateOne({ _id: req.params.id }, formData)
            .then(() => res.redirect('/me/store/course'))
            .catch(next);
    }
}

module.exports = new CourseController();

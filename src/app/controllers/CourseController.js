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
}

module.exports = new CourseController();

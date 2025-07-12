const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/store/course
    storedCourse(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('me/stored-course', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();

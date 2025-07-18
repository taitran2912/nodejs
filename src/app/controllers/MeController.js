const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/store/course
    storedCourse(req, res, next) {
        Promise.all([
            Course.find(),
            Course.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([courses, deleteCount]) =>
                res.render('me/stored-course', {
                    deleteCount,
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    // [GET] /me/trash/course
    trashCourse(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then((courses) => {
                res.render('me/trash-course', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();

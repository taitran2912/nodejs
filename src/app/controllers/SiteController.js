const Course = require('../models/Course');

class SiteController {
    async index(req, res) {
        try {
            const courses = await Course.find({});
            res.json(courses);
        } catch (err) {
            res.status(400).json({ error: 'Error' });
        }
    }

    search(rep, res) {
        res.render('search');
    }
}

module.exports = new SiteController();

const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/store/course', meController.storedCourse);
router.get('/trash/course', meController.trashCourse);

module.exports = router;

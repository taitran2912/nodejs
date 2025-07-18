const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create); // Hiển thị form tạo mới
router.post('/handle-action', courseController.handleAction); // Xử lý hành động (xóa, khôi phục, v.v.)
router.get('/:id/edit', courseController.edit); // Sửa khóa học (theo id)
router.post('/store', courseController.store); // Lưu khóa học mới
router.put('/:id', courseController.update); // Cập nhật
router.patch('/:id/restore', courseController.restore); // Khôi phục
router.delete('/:id', courseController.delete);
router.delete('/:id/force', courseController.forceDelete); // Xóa (soft delete)

router.get('/:slug', courseController.show); // Xem chi tiết (theo slug)

module.exports = router;

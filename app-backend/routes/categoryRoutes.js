const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/categories', categoryController.getAll);
router.get('/category/:id/articles', categoryController.getCategoryArticles);
// router.get('/categories/add', categoryController.addCategory);



module.exports = router;

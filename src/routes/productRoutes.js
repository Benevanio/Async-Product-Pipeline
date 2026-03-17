const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.batch');

router.post('/batch', controller.createBatch);
router.get('/', controller.getAll);

module.exports = router;
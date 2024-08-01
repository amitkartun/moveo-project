const express = require('express');
const codeBlockController = require('../controllers/codeBlockController');

const router = express.Router();

router.get('/', codeBlockController.getAllCodeBlocks);
router.get('/:id', codeBlockController.getCodeBlock);

module.exports = router;
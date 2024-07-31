const mongoose = require('mongoose');

const codeBlockSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: false,
  },
}, { collection: 'code_blocks' });

module.exports = mongoose.model('CodeBlock', codeBlockSchema);
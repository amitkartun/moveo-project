const CodeBlock = require('../models/CodeBlock');

exports.getAllCodeBlocks = async (req, res, next) => {
  try {
    const codeBlocks = await CodeBlock.find({}, '_id title code solution');
    res.json(codeBlocks);
  } catch (error) {
    next(error);
  }
};

exports.getCodeBlock = async (req, res, next) => {
  try {
    const codeBlock = await CodeBlock.findById(req.params.id);
    if (!codeBlock) {
      return res.status(404).json({ message: 'Code block not found' });
    }
    res.json(codeBlock);
  } catch (error) {
    next(error);
  }
};

exports.updateCodeBlock = async (req, res, next) => {
  try {
    const codeBlock = await CodeBlock.findByIdAndUpdate(
      req.params.id,
      { code: req.body.code },
      { new: true, runValidators: true }
    );
    if (!codeBlock) {
      return res.status(404).json({ message: 'Code block not found' });
    }
    res.json(codeBlock);
  } catch (error) {
    next(error);
  }
};
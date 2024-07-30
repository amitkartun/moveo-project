const codeBlocks = require('../mockData/codeBlocks');

exports.getAllCodeBlocks = (req, res) => {
  res.json(codeBlocks.map(({ id, title }) => ({ id, title })));
};

exports.getCodeBlock = (req, res) => {
  const codeBlock = codeBlocks.find(block => block.id === req.params.id);
  if (!codeBlock) {
    return res.status(404).json({ message: 'Code block not found' });
  }
  res.json(codeBlock);
};

exports.updateCodeBlock = (req, res) => {
  const index = codeBlocks.findIndex(block => block.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Code block not found' });
  }
  codeBlocks[index].code = req.body.code;
  res.json(codeBlocks[index]);
};
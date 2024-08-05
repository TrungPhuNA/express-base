const formatResponse = require('../utils/response');

exports.uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json(formatResponse('error', [], 'No file uploaded'));
    }
    const fileUrl = req.file.path;
    res.status(201).json(formatResponse('success', { fileUrl }, 'File uploaded successfully'));
};

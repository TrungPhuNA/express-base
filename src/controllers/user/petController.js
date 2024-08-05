const petService = require('../../services/user/petService');
const formatResponse = require('../../utils/response');

exports.createPet = async (req, res) => {
    try {
        const petData = { ...req.body, owner: req.user.id };
        const pet = await petService.createPet(petData);
        res.status(201).json(formatResponse('success', { pet }, 'Pet created successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.updatePet = async (req, res) => {
    try {
        const petId = req.params.id;
        const pet = await petService.updatePet(petId, req.body);
        if (!pet) {
            return res.status(404).json(formatResponse('error', [], 'Pet not found'));
        }
        res.json(formatResponse('success', { pet }, 'Pet updated successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.deletePet = async (req, res) => {
    try {
        const petId = req.params.id;
        await petService.deletePet(petId);
        res.json(formatResponse('success', [], 'Pet deleted successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.getUserPets = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.page_size) || 10;

        const { pets, meta } = await petService.getUserPets(req.user.id, page, pageSize);

        res.json(formatResponse('success', { pets, meta }, 'Pets retrieved successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

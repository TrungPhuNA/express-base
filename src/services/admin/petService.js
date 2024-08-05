const Pet = require('../../models/Pet');

exports.getAllPets = async (page, pageSize) => {
    const total = await Pet.countDocuments();
    const pets = await Pet.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate('owner', 'name email');

    return {
        pets,
        meta: {
            total,
            total_page: Math.ceil(total / pageSize),
            page,
            page_size: pageSize
        }
    };
};

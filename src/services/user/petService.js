const Pet = require('../../models/Pet');

exports.createPet = async (petData) => {
    const pet = new Pet(petData);
    await pet.save();
    return pet;
};

exports.updatePet = async (petId, petData) => {
    return await Pet.findByIdAndUpdate(petId, petData, {new: true});
};

exports.deletePet = async (petId) => {
    await Pet.findByIdAndDelete(petId);
};

exports.getUserPets = async (userId, page, pageSize) => {
    const total = await Pet.countDocuments({ owner: userId });
    const pets = await Pet.find({ owner: userId })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

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

const Pet = require('../../models/Pet');

exports.createPet = async (petData) => {
    console.info("===========[] ===========[petData] : ",petData);
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

exports.getUserPets = async (userId, page, pageSize, params) => {
    // Tạo điều kiện tìm kiếm
    const query = {
        owner: userId,
    };

    if (params.name) {
        query.name = { $regex: params.name, $options: 'i' };  // Tìm kiếm theo tên, không phân biệt hoa thường
    }

    if (params.gender) {
        query.gender = { $regex: params.gender, $options: 'i' };  // Tìm kiếm theo giới tính, không phân biệt hoa thường
    }

    // Lấy tổng số lượng pets phù hợp với điều kiện tìm kiếm
    const total = await Pet.countDocuments(query);

    // Lấy danh sách pets theo điều kiện tìm kiếm và phân trang
    const pets = await Pet.find(query)
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

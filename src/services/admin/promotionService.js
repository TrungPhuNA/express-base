const Promotion = require('../../models/Promotion');

exports.createPromotion = async (promotionData) => {
    const promotion = new Promotion(promotionData);
    await promotion.save();
    return promotion;
};

exports.updatePromotion = async (promotionId, promotionData) => {
    const promotion = await Promotion.findByIdAndUpdate(promotionId, promotionData, { new: true });
    return promotion;
};

exports.deletePromotion = async (promotionId) => {
    await Promotion.findByIdAndDelete(promotionId);
};

exports.getPromotionById = async (promotionId) => {
    const promotion = await Promotion.findById(promotionId);
    return promotion;
};

exports.getAllPromotions = async (page, pageSize, searchName, searchType) => {
    const query = {};

    if (searchName) {
        query.name = { $regex: searchName, $options: 'i' }; // Case-insensitive search
    }

    if (searchType) {
        query.type = searchType;
    }

    const total = await Promotion.countDocuments(query);
    const promotions = await Promotion.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize);

    return {
        promotions,
        meta: {
            total,
            total_page: Math.ceil(total / pageSize),
            page,
            page_size: pageSize
        }
    };
};

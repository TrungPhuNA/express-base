const Service = require('../models/Service');

exports.createService = async (serviceData) => {
    const service = new Service(serviceData);
    await service.save();
    return service;
};

exports.updateService = async (serviceId, serviceData) => {
    const service = await Service.findByIdAndUpdate(serviceId, serviceData, { new: true });
    return service;
};

exports.deleteService = async (serviceId) => {
    await Service.findByIdAndDelete(serviceId);
};

exports.getServiceById = async (serviceId) => {
    const service = await Service.findById(serviceId);
    return service;
};

exports.getAllServices = async (page, pageSize) => {
    const total = await Service.countDocuments();
    const services = await Service.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize);

    return {
        services,
        meta: {
            total,
            total_page: Math.ceil(total / pageSize),
            page,
            page_size: pageSize
        }
    };
};
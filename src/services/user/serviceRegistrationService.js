const ServiceRegistration = require('../../models/ServiceRegistration');

exports.registerService = async (registrationData) => {
    const registration = new ServiceRegistration(registrationData);
    await registration.save();
    return registration;
};

exports.cancelServiceRegistration = async (registrationId, userId) => {
    const registration = await ServiceRegistration.findOne({ _id: registrationId, user: userId });
    if (!registration) {
        throw new Error('Service registration not found');
    }
    if (registration.status !== 'pending') {
        throw new Error('Cannot cancel approved or already canceled service registration');
    }
    registration.status = 'canceled';
    await registration.save();
    return registration;
};

exports.getUserServiceRegistrations = async (userId) => {
    return await ServiceRegistration.find({ user: userId }).populate('service', 'name description price');
};

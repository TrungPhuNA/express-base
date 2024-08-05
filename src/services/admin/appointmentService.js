const Appointment = require('../../models/Appointment');

exports.getAllAppointments = async (page, pageSize) => {
    const total = await Appointment.countDocuments();
    const appointments = await Appointment.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate('user', 'name email')
        .populate('service', 'name');

    return {
        appointments,
        meta: {
            total,
            total_page: Math.ceil(total / pageSize),
            page,
            page_size: pageSize
        }
    };
};

exports.confirmAppointment = async (appointmentId) => {
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status: 'confirmed' }, { new: true });
    return appointment;
};

exports.cancelAppointment = async (appointmentId) => {
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status: 'canceled' }, { new: true });
    return appointment;
};

const Appointment = require('../models/Appointment');
const moment = require('moment-timezone');

exports.createAppointment = async (appointmentData) => {
    const appointment = new Appointment({
        ...appointmentData,
        createdAt: moment().tz("Asia/Bangkok").toDate(), // Đặt createdAt về múi giờ +7
    });
    await appointment.save();
    return appointment;
};

exports.updateAppointment = async (appointmentId, appointmentData) => {
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, appointmentData, { new: true });
    return appointment;
};

exports.deleteAppointment = async (appointmentId) => {
    await Appointment.findByIdAndDelete(appointmentId);
};

exports.getAppointmentById = async (appointmentId) => {
    const appointment = await Appointment.findById(appointmentId).populate('user', 'name email').populate('service', 'name');
    return appointment;
};

exports.getUserAppointments = async (userId, page, pageSize) => {
    const total = await Appointment.countDocuments({ user: userId });
    const appointments = await Appointment.find({ user: userId })
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

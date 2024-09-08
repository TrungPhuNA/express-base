const Consultation = require('../../models/Consultation');

exports.createConsultation = async (req, res) => {
    try {
        const { text, type } = req.body;
        const userId = req.user.id; // Lấy user từ token sau khi đã xác thực

        const consultation = new Consultation({
            user: userId,
            text,
            type
        });

        await consultation.save();

        res.status(201).json({
            message: 'Consultation created successfully',
            consultation
        });
    } catch (error) {
        console.error('Error creating consultation:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getConsultationsByUser = async (req, res) => {
    try {
        const userId = req.user._id;

        const consultations = await Consultation.find({ user: userId });

        res.status(200).json(consultations);
    } catch (error) {
        console.error('Error fetching consultations:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateConsultationStatus = async (req, res) => {
    try {
        const consultationId = req.params.id;
        const { status } = req.body;

        const consultation = await Consultation.findById(consultationId);

        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }

        consultation.status = status;
        await consultation.save();

        res.status(200).json({
            message: 'Consultation status updated successfully',
            consultation
        });
    } catch (error) {
        console.error('Error updating consultation status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

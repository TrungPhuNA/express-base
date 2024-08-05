const client = require('../config/twilio');
const { parsePhoneNumber } = require('libphonenumber-js');
const formatResponse = require('../utils/response');
require('dotenv').config(); // Load environment variables

exports.sendSMS = async (to, body) => {
    try {
        // Chuyển đổi số điện thoại sang định dạng E.164
        const phoneNumber = parsePhoneNumber(to, 'VN'); // Thay 'VN' bằng mã quốc gia của bạn nếu cần
        const e164Number = phoneNumber.number;

        const message = await client.messages.create({
            body: body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: e164Number
        });
        return formatResponse('success', { sid: message.sid }, 'SMS sent successfully');
    } catch (err) {
        return formatResponse('error', [], `Failed to send SMS: ${err.message}`);
    }
};

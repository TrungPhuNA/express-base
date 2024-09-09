const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://thienhn2k2:0TJ7poYzpcIUTHCX@cluster0.zdwdd.mongodb.net/peca?retryWrites=true&w=majority&appName=Cluster0', {
        // await mongoose.connect('mongodb://localhost:27017/2024_mern_pet', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

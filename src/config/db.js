const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not set. Add it to your .env file.');
        }

        await mongoose.connect(process.env.MONGO_URI, {
            
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
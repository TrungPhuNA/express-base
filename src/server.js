const express = require('express');
const connectDB = require('./config/db');
const swaggerSetup = require('./config/swagger');
require('dotenv').config(); // Load environment variables

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api', require('./routes'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/appointments', require('./routes/appointment'));
app.use('/api/notifications', require('./routes/notification'));

// Setup Swagger
swaggerSetup(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

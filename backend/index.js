// index.js

const express = require('express');
const app = express();
const router = express.Router();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectionMongodb = require('./db');
const path = require('path');
const routes = require('./routes/index.js');

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', '*'],
    credentials: true
}));

// Route handling
app.use('/api', routes);

// Static files (if necessary)
app.use('/images', express.static(path.join(__dirname, 'uploadedimages')));

// Connect to MongoDB and start the server
connectionMongodb()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

module.exports = app;

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

dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));

app.use('/api', routes);

// app.use('/images', express.static(path.join(__dirname, 'uploadedimages')));
app.use("/public", express.static(path.join(__dirname, "./public")));


connectionMongodb()
    .then(() => {
        app.listen(process.env.PORT || 5858, () => {
            console.log(`Server is running on port http://localhost:${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

module.exports = app;

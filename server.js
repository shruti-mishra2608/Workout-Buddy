require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Workout API' });
});

app.use('/api/workouts', workoutRoutes);

// Connect to MongoDB first, then start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running at http://localhost:${process.env.PORT}`);
            console.log('MongoDB connected');
        });
    })
    .catch((error) => {
        console.log('MongoDB connection error:', error);
    });


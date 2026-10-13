
const Workout = require('../models/workoutModel');
const mongoose = require('mongoose'  )


const createWorkout = async (req, res) => {
    try {
        const { title, reps, load } = req.body;

        const workout = await Workout.create({
            title,
            reps,
            load
        });

        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({})
            .sort({ createdAt: -1 });

        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getWorkout = async (req, res) => {
    try {
        const { id } = req.params;

        if(!mongoose.isValidObjectId(id)) {
            return res.status(404).json({error: 'No such workout'})
        }

        const workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({
                error: 'No such workout'
            });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const deleteWorkout =  async (req, res) => {
      try {
          const { id } = req.params;
        if(!mongoose.isValidObjectId(id)) {
            return res.status(404).json({error: 'No such workout'})
        }
        const workout = await Workout.findByIdAndDelete(id);

        if (!workout) {
            return res.status(404).json({
                error: 'Workout not found'
            });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const updateWorkout = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                error: 'Invalid workout ID'
            });
        }

        const workout = await Workout.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!workout) {
            return res.status(404).json({
                error: 'No such workout'
            });
        }

        res.status(200).json(workout);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
};

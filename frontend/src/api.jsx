import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

export const getExercises = () => API.get('exercises/');
export const getWorkouts = () => API.get('workouts/');
export const createWorkout = (workout) => API.post('workouts/', workout);
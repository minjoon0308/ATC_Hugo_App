import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

export const getExercises = () => API.get('exercises/');
export const getWorkouts = () => API.get('workouts/');
    export const createWorkout = (workout,token, id=null) => 
        {
            if (id) {
                workout.id = id;
            }        
            return API.post('workouts/', workout, {
                headers: {Authorization: `Bearer ${token}`}
            });
        }

export const getUserWorkouts = async () => {
    const token = localStorage.getItem('authToken');
    console.log(token)
    if (!token) {
        throw new Error('No token found. Please log in again.');
    }
    return API.get('workouts/', {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getWorkoutById = async (workoutId) => {
    const token = localStorage.getItem('authToken');
    return API.get(`workouts/${workoutId}/`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteWorkout = async (workoutId) => {
    const token = localStorage.getItem('authToken');
    return API.delete(`workouts/${workoutId}/`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
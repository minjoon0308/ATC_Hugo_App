import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

//Exercises 
export const getExercises = () => API.get('exercises/');
export const deleteExercise = async (exerciseId) => {
    const token = localStorage.getItem('authToken');
    return API.delete(`exercises/${exerciseId}/`, {
        headers: { Authorization: `Bearer ${token}`}
    });
};
export const createExercise = (exercise, token) =>{
    
    return API.post('exercises/', exercise, {
        headers: {Authorization: `Bearer ${token}`}
    });
}
export const updateExercise = async (id, exercise, token) => {
    return API.put(`exercises/${id}/`, exercise, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

//Workouts
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
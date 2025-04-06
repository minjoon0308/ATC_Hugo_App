import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";

import {getWorkoutById} from "./api/api.jsx";

export default function RunWorkout(){
    const {workoutId, stepIndex} = useParams()
    console.log(stepIndex)
    const [workout, setWorkout] = useState(() => 
        ({
            name: localStorage.getItem("workoutName") || "", 
            duration: 0, 
        })
);
    const [selectedExercises, setSelectedExercises] = useState(() => {
        const savedExercises = localStorage.getItem("selectedExercises");
        return savedExercises ? JSON.parse(savedExercises) : [];
    });
    console.log(selectedExercises)
    useEffect(() => {
              const fetchWorkout = async () => {
                const response = await getWorkoutById(workoutId);
                console.log("HIII", response.data)
                setWorkout({
                    name: response.data.name, 
                    duration: response.data.duration})
                setSelectedExercises(response.data.workout_exercises)
              };
              fetchWorkout();
          }, [workoutId]);
    
    return(
        <>
        <div>{workoutId} - {workout.name}</div>
        <div>
        {selectedExercises[stepIndex].exercise.name}
        </div>
        </>
        
    )
}
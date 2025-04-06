"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { createWorkout } from "../api/api";

interface StartProps{
    id: number;
    step: number;
    name: string; 
    exercises: [];
    duration: number;
}
export default function StartWO(props:StartProps){    
    const navigate = useNavigate();
    const handleStart = async () => {
        try {
          if (props.id) {
            // Already have a workout ID
            navigate(`/workout/${props.id}/step/${props.step}`);
          } else {
            // Create new workout before starting
            const token = localStorage.getItem("authToken");
    
            const workoutData = {
              name: props.name || "",
              exercises: props.exercises || [],
              duration: props.duration || 0,
            };
    
            const res = await createWorkout(workoutData, token);
            const newWorkoutId = res.data.id;
            

            localStorage.removeItem("workoutId");
            localStorage.removeItem("workoutName");
            localStorage.removeItem("selectedExercises");

            navigate(`/workout/${newWorkoutId}/step/${props.step}`);
          }
        } catch (error) {
          console.error("Error starting workout:", error);
        }
      };

    return(
        <div className="fixed bottom-5 right-5 text-4xl ">
            <button onClick={handleStart}
            className="bg-blue-gray-300/80 py-7 cursor-pointer duration-300 ease-in hover:bg-blue-gray-500 text-white ">Start Workout</button>
        </div>
    )   
}
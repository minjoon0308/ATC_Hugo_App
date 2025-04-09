"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { createWorkout } from "../api/api";

interface StartProps{
    id: any;
    step: number;
    name: string; 
    exercises: [];
    duration: number;
    changed: boolean;
}
export default function StartWO(props:StartProps){    
    const navigate = useNavigate();
    const handleStart = async () => {
        try {
          const token = localStorage.getItem("authToken");
          if (!props.changed) {
            // Already have a workout ID
            navigate(`/workout/${props.id}/step/${props.step}`);
          } else {
            const workoutData = {
              name: props.name || "",
              exercises: props.exercises || [],
              duration: props.duration || 0,
            };
      
            let workoutId = props.id;
      
            if (props.id) {
              await createWorkout(workoutData, token, props.id);
            } else {
              const res = await createWorkout(workoutData, token);
              workoutId = res.data.id;
            }
      
            localStorage.removeItem("workoutId");
            localStorage.removeItem("workoutName");
            localStorage.removeItem("selectedExercises");
      
            navigate(`/workout/${workoutId}/step/${props.step}`);
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
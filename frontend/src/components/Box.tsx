import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { getWorkoutById, deleteWorkout } from "../api/api";

interface BoxProps{
    id: number;
    exercises: [];
    date: string; 
    name: string;
    duration: number; 
    setRefresh: any
    
}

export default function Box(props: BoxProps){
    const navigate = useNavigate();

    const updateLocalStorage = async(id, name, exercises) => {
        localStorage.setItem("workoutId", id); // Store workout ID
        localStorage.setItem("workoutName", name);
        const response = await getWorkoutById(props.id);
        console.log(response.data.workout_exercises)
        exercises = response.data.workout_exercises
        const transformedExercises = exercises.map((e)=>({
            ...e.exercise, numReps: e.num_reps,  
            duration: e.duration,
            rest: e.rest_time
        }));
        localStorage.setItem("selectedExercises", JSON.stringify(transformedExercises || []));
        navigate("/create"); // Navigate to CreateWO
    }

    const deleteWO = async() =>{
        await deleteWorkout(props.id);
        props.setRefresh((prev) => !prev);
    }
    return(
        <div className="relative w-[90vw] flex flex-col rounded-xl bg-slate-200 content-center  place-content-center justify-center items-center m-5 pt-10 shadow-lg outline outline-black/5 
        hover:cursor-pointer"
        onClick={() => updateLocalStorage(props.id, props.name, props.exercises)}>
           <h2 className="mb-4 text-4xl font-semibold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{props.name}</h2> 
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            <span className="bold"> EST: {props.duration}</span> minutes
            <span className="bold"> Date: </span>{props.date} 
            </p>
            <button className=" absolute top-1 right-1  focus:outline-hidden mb-8 outline-none px-3 py-1 opacity-90"
                onClick={(e) => {
                    e.stopPropagation(); // Prevents modal from opening
                    deleteWO();
                  }}
                >x</button>
        </div>
    )
}
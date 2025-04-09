import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { getWorkoutById, deleteWorkout } from "../api/api";

interface BoxProps{
    id: number;
    exercises: [];
    difficulty: string; 
    name: string;
    body_region: number; 
    setRefresh: any
    
}

export default function CreateExBox(props: BoxProps){
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
        navigate(`/create/${id}`); // Navigate to CreateWO
    }

    const deleteWO = async() =>{
        await deleteWorkout(props.id);
        props.setRefresh((prev) => !prev);
    }
    return(
        <div
            className="relative flex flex-col w-64 rounded-2xl mt-10 mx-5 mb-5 p-6 shadow-md border hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
            onClick={() => updateLocalStorage(props.id, props.name, props.exercises)}
            >
            <h2 className="text-2xl font-bold text-gray-800 mb-2  text-wrap">{props.name}</h2>
            <p className="text-gray-600 text-sm">
                <span className="font-semibold">Difficulty:</span> {props.difficulty} minutes &nbsp;|&nbsp;
                <span className="font-semibold ">Body Region:</span> {props.body_region}
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
import React, { useState, useEffect } from "react";
import {  createWorkout } from "./api/api";
import AddExercise from "./components/AddExercise"
import ExerciseBox from "./components/ExerciseBox"
import StartWO from "./components/StartWO";
import { useNavigate } from "react-router-dom";

export default function CreateWO(){
    const [workoutId, setWorkoutId] = useState(() => localStorage.getItem("workoutId") || null);
    const [workoutName, setWorkoutName] = useState(() => localStorage.getItem("workoutName") || "");
    const [selectedExercises, setSelectedExercises] = useState(() => {
        const savedExercises = localStorage.getItem("selectedExercises");
        return savedExercises ? JSON.parse(savedExercises) : [];
    });

    const navigate = useNavigate();
    const [totalTime, setTotalTime] = useState(0)
    // const [selectedExercises, setSelectedExercises] = useState<number[]>([]);

    //Updates the whole exercise array basically the workout
    const updateExercises = (newItem) => {
        setSelectedExercises(newItem);
    }

    //updates and individual exercise
    const updateExercise = (updatedExercise, ind) =>{
        setSelectedExercises((prevExercises) => 
            prevExercises.map((exercise, index) =>
                index === ind ? { ...exercise, ...updatedExercise } : exercise
            )
        );
    }

    const handleDelete = (index) =>{
        const updatedExercises = [...selectedExercises];
        updatedExercises.splice(index, 1); // Remove exercise at index
        setSelectedExercises(updatedExercises);
        localStorage.setItem("selectedExercises", JSON.stringify(updatedExercises));

    }   

    // Update Time when the exercise list changes 
    useEffect(() => {
        const sum = selectedExercises.reduce(
            (accumulator, current) => accumulator + current.duration * current.numReps+ current.rest/60,
            0
        );
        setTotalTime(sum);
    }, [selectedExercises]);

    // Delete Everything
    const resetAll = () => {
        setWorkoutName("");
        setSelectedExercises([])
        localStorage.removeItem("workoutId");
        localStorage.removeItem("workoutName");
        localStorage.removeItem("selectedExercises");
    }

    // Create Workout
    const handleCreateWorkout = async() =>{
        const token = localStorage.getItem("authToken");
        const workoutData = {
            name: workoutName, 
            exercises: selectedExercises,
            duration: totalTime
        }
        try {
            if (workoutId) {
                console.log(workoutId)
                // Update existing workout
                const res = await createWorkout( workoutData, token, workoutId);
                console.log("Workout updated", res.data);
                navigate('/app')
            }

            else {
                console.log(token)
                const res = await createWorkout(workoutData, token)
                console.log("Workout created", res.data)
                navigate('/app')
            }
            // Cleanup local storage
            localStorage.removeItem("workoutId");
            localStorage.removeItem("workoutName");
            localStorage.removeItem("selectedExercises");

        } catch (error) {
            console.error("Error creating workout:", error.response ? error.response.data : error);
        }
        
    }

    //STORAGEEEE
    useEffect(() => {
        console.log(workoutName)
        localStorage.setItem("workoutName", workoutName);
    }, [workoutName]);

    useEffect(() => {
        console.log(JSON.stringify(selectedExercises))
        localStorage.setItem("selectedExercises", JSON.stringify(selectedExercises));
    }, [selectedExercises]);
    
    useEffect(() => {
        const savedWorkoutName = localStorage.getItem("workoutName");
        if (savedWorkoutName) setWorkoutName(savedWorkoutName);
    
        const savedExercises = localStorage.getItem("selectedExercises");
        console.log(savedExercises)
        if (savedExercises){
            let se = JSON.parse(savedExercises)
            setSelectedExercises(se);

        }
    }, []);

    return(
        <div className="">
            <div className="w-[70vw] flex flex-col justify-center mb-4">
                <div className="text-5xl flex font-semibold items-center mb-10 focus:outline-hidden focus:outline-none">
                    <p className="">Create Your Workout - </p>
                    <input type="text"
                    placeholder="Workout Name"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    className="border-transparent focus:border-transparent focus:ring-0 "/>
                    <p className=" text-lg font-normal lg:text-xl text-gray-700">est: {totalTime}</p> 
                </div>
                <div className="mb-4 bg">
                    <button onClick={(resetAll)} className="bg-red-300">reset all</button>
                </div>
                
                <div className="flex flex-col justify-center items-center">
                    {selectedExercises.map((exercise:object, index) => (
                        <ExerciseBox index={index} description={exercise} {...exercise} handleDelete={handleDelete} updateExercise={updateExercise} />
                        )
                    )}
                </div>
                <div className="flex flex-col gap-4 justify-center items-center">
                    <AddExercise updateExercises={updateExercises} existingExercises={selectedExercises}/>
                    <button className="w-full mt-10 text-xl outline-none focus:outline-hidden focus:outline-none bg-blue-200"
                    onClick={handleCreateWorkout}>Finalize Workout
                    </button>
                </div>
            </div>
            <StartWO/>
        </div>
    )
}
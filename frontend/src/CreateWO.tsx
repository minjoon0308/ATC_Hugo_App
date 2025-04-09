import React, { useState, useEffect } from "react";
import {  createWorkout } from "./api/api";
import AddExercise from "./components/AddExercise"
import ExerciseBox from "./components/ExerciseBox"
import StartWO from "./components/StartWO";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkoutById } from "./api/api.jsx";

export default function CreateWO(){
    const { workoutId } = useParams();
    const [workoutName, setWorkoutName] = useState(() => localStorage.getItem("workoutName") || "");
    const [selectedExercises, setSelectedExercises] = useState(() => {
        const savedExercises = localStorage.getItem("selectedExercises");
        return savedExercises ? JSON.parse(savedExercises) : [];
    });
    const [changed, setChanged] = useState(false)     
    useEffect(() => {
        if (workoutId ) {
            console.log(workoutId)
          // fetch from backend to prefill form if localStorage is empty
            const fetchWorkout = async () => {
                    const response = await getWorkoutById(workoutId);
                    const data = response.data
                    console.log(data)
                    setWorkoutName(data.name);
                    console.log("OLDDDD", data.workout_exercises)
                    setSelectedExercises(data.workout_exercises);
                };
          
          fetchWorkout();
          console.log("HIII", selectedExercises)
          
        };
      }, [workoutId]);
    
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
        console.log(
            "changed: ",
            selectedExercises
        )
        setChanged(true) 
        const sum = selectedExercises.reduce(
            (accumulator, current) => accumulator + current.duration * current.num_reps+ current.rest_time/60,
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
            duration: totalTime,
        };

        try {
            if (workoutId) {
                // Update existing workout
                const res = await createWorkout( workoutData, token, workoutId);
                navigate('/app')
            }

            else {
                const res = await createWorkout(workoutData, token)
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
        localStorage.setItem("workoutName", workoutName);
    }, [workoutName]);

    useEffect(() => {
        localStorage.setItem("selectedExercises", JSON.stringify(selectedExercises));
    }, [selectedExercises]);
    
    useEffect(() => {
        const savedWorkoutName = localStorage.getItem("workoutName");
        if (savedWorkoutName) setWorkoutName(savedWorkoutName);
    
        const savedExercises = localStorage.getItem("selectedExercises");
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
                    {selectedExercises.map((elem:object, index) => (
                        <ExerciseBox index={index} description={elem} {...elem} {...elem.exercise} handleDelete={handleDelete} updateExercise={updateExercise} />
                        )
                    )}
                </div>
                <div className="flex flex-col gap-4 justify-center items-center mb-5">
                    <AddExercise updateExercises={updateExercises} existingExercises={selectedExercises}/>
                    <button className="w-full my-10 text-xl outline-none focus:outline-hidden focus:outline-none bg-blue-200"
                    onClick={handleCreateWorkout}>Finalize Workout
                    </button>
                </div>
            </div>
            <StartWO changed={changed} id={workoutId} step={0} name={workoutName} exercises={selectedExercises} duration = {totalTime}/>
        </div>
    )
}
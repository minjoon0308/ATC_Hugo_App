import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Exercise from "./components/Exercise";
import ExerciseNav from "./components/ExerciseNav";
import ExerciseDetails from "./components/ExerciseDetails";

import { getWorkoutById } from "./api/api.jsx";

export default function RunWorkout() {
    

    const { workoutId, stepIndex } = useParams();
    const step = stepIndex ? parseInt(stepIndex, 10) : 0;

    const [workout, setWorkout] = useState(() => ({
        name: localStorage.getItem("workoutName") || "",
        duration: 0,
    }));
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [loading, setLoading] = useState(true); // optional loading state

    useEffect(() => {
        const fetchWorkout = async () => {
        const response = await getWorkoutById(workoutId);

        setWorkout({
        name: response.data.name,
        duration: response.data.duration,
        });

        setSelectedExercises(response.data.workout_exercises);
        setLoading(false); // loading is done
        };

        fetchWorkout();
    }, [workoutId]);

    const currentExercise = selectedExercises[step];
    
    

    return (
    <>
    

    <div>
    {loading ? (
        <div>Loading exercise...</div>
    ) : currentExercise ? (
        <div>
            <ExerciseNav
            savedExercises={selectedExercises}
            workout={workoutId}
            current={stepIndex}
             />
            <div className="text-5xl flex font-semibold items-center my-4 focus:outline-hidden focus:outline-none">
                Workout {workoutId} - {workout.name}: <span className="font-normal px-2">{currentExercise.exercise.name}</span>
            </div>
            <Exercise {...currentExercise.exercise} />
            <ExerciseDetails workoutId={workoutId} total={selectedExercises.length} step={step} currentExercise={currentExercise} />
        </div>
        
    ) : (
        <div>No exercise found at step {step}</div>
    )}
    </div>


    </>
    );
    }

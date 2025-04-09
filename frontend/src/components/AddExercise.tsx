"use client";
import React, {useState, useEffect} from "react";
import { getExercises } from "../api/api.jsx";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
   

interface AddExerciseProps {
    updateExercises: (arg0: any) => void;
    existingExercises: any[];
}

export default function AddExercise(props: AddExerciseProps){    
    const [open, setOpen] = useState(false); //MODAL
    const [exercises, setExercises] = useState<object[]>([]) // Taken from my API
    const [selectedExercise, setSelectedExercise] = useState<any>(null)
    const [numReps, setNumReps] = useState(1)
    const [duration, setDuration] = useState(5)
    const [rest, setRest] = useState(30)

    const handleOpen = () => setOpen(!open); // Generally how you deal with states

    useEffect(()=> {
        getExercises().then((response) => setExercises(response.data))
    }, []);

    const handleConfirm = () => {
        if (selectedExercise) {
            let newExercise = { exercise:selectedExercise, num_reps: numReps, duration, rest_time: rest }
            console.log(newExercise)
            props.updateExercises([...props.existingExercises, newExercise]);
            setOpen(false);
        }
    };

    return(
        <div className="block  w-full">
            <button onClick={handleOpen} 
            className="w-full text-xl outline-none focus:outline-hidden focus:outline-none"
            >Add + Exercise</button>
            <Dialog open={open} handler={handleOpen}>
            <DialogHeader>Choose Your Exercise</DialogHeader>
            <DialogBody>
                <ul className="space-y-2">
                    {exercises.map((exercise) => (
                        <li key={exercise.id} className="flex items-center space-x-2">
                            <input 
                                type="radio"
                                id={`exercise-${exercise.id}`}
                                name="exercise"
                                value={exercise.id}
                                checked={selectedExercise?.id === exercise.id}
                                onChange={() => setSelectedExercise(exercise)}
                            />
                            <label htmlFor={`exercise-${exercise.id}`} className="cursor-pointer">
                                {exercise.name}
                            </label>
                        </li>
                    ))}
                </ul>
                <div>
                    <label className="block text-sm font-medium">Reps:</label>
                    <input type="number" min="1" 
                    value={numReps} 
                    onChange={(e) => setNumReps(parseInt(e.target.value))}
                    className="w-full border px-2 py-1 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Duration (minutes):</label>
                    <input type="number" min="1" 
                    value={duration} 
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full border px-2 py-1 rounded"
                    /> 
                </div>
                <div>
                    <label className="block text-sm font-medium">Rest Time (seconds):</label>
                    <input type="number" min="1" 
                    value={rest} 
                    onChange={(e) => setRest(parseInt(e.target.value))}
                    className="w-full border px-2 py-1 rounded"
                    /> 
                </div>

            </DialogBody>
            <DialogFooter>
                <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
                >
                <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={handleConfirm}>
                <span>Confirm</span>
                </Button>
            </DialogFooter>
            </Dialog>
        </div>
    )   
}
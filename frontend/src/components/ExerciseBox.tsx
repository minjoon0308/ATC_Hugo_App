import React, {useState, useEffect} from "react";
import { getExercises } from "../api/api.jsx";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
   

interface BoxProps{
    description: object;
    duration: number;
    difficulty: string;
    target_muscle: string;
    primary_classification: string;
    body_region: string;
    primary_equipment: string;
    short_demo: string;
    demo: string;
    id: number;
    index: number;
    name: string;
    numReps: number;
    rest: number;
    handleDelete: (arg0: number) => void;
    updateExercise: (arg0: any, arg1: number) => void;

}

// 
export default function ExerciseBox(props: BoxProps){
    const [open, setOpen] = useState(false); //MODAL

    // Things you can edit
    const [numReps, setNumReps] = useState(props.numReps)
    const [duration, setDuration] = useState(props.duration)
    const [rest, setRest] = useState(props.rest)
    const handleOpen = () => setOpen(!open); // Generally how you deal with states
    const handleConfirm = () => {
            let newExercise = {numReps: numReps, rest: rest, duration:duration}
            console.log(newExercise)
            props.updateExercise(newExercise, props.index);
            setOpen(false);
    };

    console.log(props.duration)
    return(
        <>
        <div onClick={handleOpen} className={`relative w-full flex flex-col rounded-xl bg-slate-200 content-center hover:cursor-pointer place-content-center justify-center items-center m-5 pt-10 shadow-lg outline outline-black/5 
            ${
                props.difficulty === "Beginner"
                ? "bg-green-200"
                : props.difficulty === "Intermediate"
                ? "bg-orange-500"
                : props.difficulty === "Novice"
                ? "bg-yellow-500"
                : "bg-slate-200" // default background
            
            }`}>
            <h2 className="mb-4 text-4xl font-semibold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{props.name}</h2> 
                
                <p className="mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48">
                    An exercise primary focused on the {props.body_region} region</p>

                    <p className="py-1 px-3 mb-4 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-200">
                    <span className="bold">Duration: </span>{props.duration*props.numReps} minutes 
                    <span className="bold"> Sets: </span>{props.numReps} 
                    
                </p>
                <button className=" absolute top-1 right-1  focus:outline-hidden mb-8 outline-none px-3 py-1 opacity-90"
                onClick={(e) => {
                    e.stopPropagation(); // Prevents modal from opening
                    props.handleDelete(props.index);
                  }}
                >x</button>
        </div>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>{props.name}</DialogHeader>
                <DialogBody>
                    {/* YouTube Shorts Embed */}
                    {props.short_demo && (
                        <div className="w-full flex justify-center mb-4">
                            <iframe
                                className="rounded-lg"
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${props.short_demo.split("shorts/")[1]?.split("?")[0]}?autoplay=1&controls=1`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                        {/* Exercise Details */}
                        <div className="flex gap-4 py-5">
                            <p className="text-gray-700"><span className="font-semibold">Difficulty:</span> {props.difficulty}</p>
                            <p className="text-gray-700"><span className="font-semibold">Target Muscle:</span> {props.target_muscle}</p>
                            <p className="text-gray-700"><span className="font-semibold">Classification:</span> {props.primary_classification}</p>
                            <p className="text-gray-700"><span className="font-semibold">Body Region:</span> {props.body_region}</p>
                            <p className="text-gray-700"><span className="font-semibold">Equipment:</span> {props.primary_equipment}</p>
                        </div>
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
                    <Button variant="text"
                    color="red"
                    className="mr-1"
                        onClick={(e) => {props.handleDelete(props.index);}}
                        >Delete
                    </Button>
                    <Button
                    variant="text"
                    color=""
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
        
        </>
    )
}
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { getWorkoutById, deleteExercise, updateExercise } from "../api/api";
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
    num_reps: number;
    rest_time: number;
    exercises: []; 
    setRefresh: any
    
}

export default function CreateExBox(props: BoxProps){
    let body_regions = ['Lower Body', 'Full Body', 'Upper Body', 'Midsection']
    let difficulty_levels = ['Intermediate', 'Beginner', 'Grand Master', 'Novice', 'Advanced', 'Master', 'Legendary', 'Expert']
    let primary_classifications = ['Bodybuilding', 'Ballistics', 'Plyometric', 'Powerlifting', 'Calisthenics', 'Unsorted*', 'Animal Flow', 'Olympic Weightlifting ', 'Olympic Weightlifting', 'Mobility', 'Balance', 'Postural', 'Grinds']
    let target_muscle = ['Glutes', 'Forearms', 'Quadriceps', 'Abductors', 'Shins', 'Adductors', 'Hip Flexors', 'Biceps', 'Triceps', 'Calves', 'Trapezius ', 'Back', 'Shoulders', 'Trapezius', 'Hamstrings', 'Chest', 'Abdominals']
    let equipment = ['Parallette Bars', 'Trap Bar', 'Barbell', 'Slam Ball', 'Resistance Band', 'Ab Wheel', 'Dumbbell', 'Miniband', 'Macebell', 'EZ Bar', 'Bodyweight', 'Suspension Trainer', 'Tire', 'Cable', 'Bulgarian Bag', 'Wall Ball', 'Kettlebell', 'Sandbag', 'Weight Plate', 'Medicine Ball', 'Superband', 'Battle Ropes', 'Indian Club', 'Sliders', 'Gymnastic Rings', 'Clubbell', 'Stability Ball', 'Pull Up Bar', 'Landmine', 'Heavy Sandbag']
    const [open, setOpen] = useState(false); //MODAL
    const handleOpen = () => setOpen(!open);
    const [exercise, setExercise] = useState(()=>({
        body_region: props.body_region, 
        demo: props.demo,
        difficulty: props.difficulty, 
        name:props.name, 
        primary_classification: props.primary_classification, 
        primary_equipment: props.primary_equipment, 
        short_demo : props.short_demo, 
        target_muscle : props.target_muscle 
    }));

    useEffect(() => {
        setExercise({
            body_region: props.body_region, 
            demo: props.demo,
            difficulty: props.difficulty, 
            name:props.name, 
            primary_classification: props.primary_classification, 
            primary_equipment: props.primary_equipment, 
            short_demo : props.short_demo, 
            target_muscle : props.target_muscle 
        })
    }, [])

    const handleConfirm = async() => {
        const token = localStorage.getItem("authToken");
        try{
            const res = await updateExercise(props.id, exercise, token)
            navigate('/exercise')
            handleOpen()
        } catch (error) {
            console.error("Error updating exercise:", error.response ? error.response.data : error);
        }
    
        
        
        
};
    const navigate = useNavigate();

    
    const deleteEx = async() =>{
        await deleteExercise(props.id);
        props.setRefresh((prev) => !prev);
    }



    return(
        <>
        <div
            className="relative flex flex-col w-64 rounded-2xl mt-10 mx-5 mb-5 p-6 shadow-md border hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
            onClick={handleOpen}
            >
            <h2 className="text-2xl font-bold text-gray-800 mb-2  text-wrap">{props.name}</h2>
            <p className="text-gray-600 text-sm">
                <span className="font-semibold">Difficulty:</span> {props.difficulty} {props.primary_classification} &nbsp;|&nbsp;
                <span className="font-semibold ">Body Region:</span> {props.body_region}
            </p>

            <button className=" absolute top-1 right-1  focus:outline-hidden mb-8 outline-none px-3 py-1 opacity-90"
                onClick={(e) => {
                    e.stopPropagation();
                    deleteEx()
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
                                src={`https://www.youtube.com/embed/${props.short_demo.split("shorts/")[1]?.split("?")[0]}?autoplay=0&rel=0&controls=1`}                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                        {/* Exercise Details */}
                        <div className="flex flex-wrap flex-col gap-4 py-5">
                            <label className="block text-sm font-semibold">Body Region:</label>
                            <select
                                value={exercise.body_region}
                                onChange={(e) => setExercise((prev) => ({ ...prev, body_region: e.target.value }))}
                            >
                            <option value="" disabled hidden>Choose a body region</option>
                            {body_regions.map((elem) => (
                                <option key={elem} value={elem}>
                                {elem}
                                </option>
                            ))}
                            </select>
                            
                            <label className="block text-sm font-semibold">Difficulty:</label>
                            <select
                            value={exercise.difficulty}
                            onChange={(e) => setExercise((prev) => ({ ...prev, difficulty: e.target.value }))}
                            >
                            <option value="" disabled hidden>Choose a difficulty</option>
                            {difficulty_levels.map((elem) => (
                                <option key={elem} value={elem}>
                                {elem}
                                </option>
                            ))}
                            </select>

                            <label className="block text-sm font-semibold">Primary Classification:</label>
                            <select
                            value={exercise.primary_classification}
                            onChange={(e) =>
                                setExercise((prev) => ({ ...prev, primary_classification: e.target.value }))
                            }
                            >
                            <option value="" disabled hidden>Choose a classification</option>
                            {primary_classifications.map((elem) => (
                                <option key={elem} value={elem}>
                                {elem}
                                </option>
                            ))}
                            </select>

                            <label className="block text-sm font-semibold">Target Muscle:</label>
                            <select
                            value={exercise.target_muscle}
                            onChange={(e) => setExercise((prev) => ({ ...prev, target_muscle: e.target.value }))}
                            >
                            <option value="" disabled hidden>Choose a target muscle</option>
                            {target_muscle.map((elem) => (
                                <option key={elem} value={elem}>
                                {elem}
                                </option>
                            ))}
                            </select>

                            <label className="block text-sm font-semibold">Primary Equipment:</label>
                            <select
                            value={exercise.primary_equipment}
                            onChange={(e) =>
                                setExercise((prev) => ({ ...prev, primary_equipment: e.target.value }))
                            }
                            >
                            <option value="" disabled hidden>Choose equipment</option>
                            {equipment.map((elem) => (
                                <option key={elem} value={elem}>
                                {elem}
                                </option>
                            ))}
                            </select>
                            <label className="block text-sm font-semibold">Video Url:</label>
                            <input type="text" 
                                value={exercise.short_demo} 
                                onChange={(e) => setExercise((prev) => ({...prev, short_demo: e.target.value}))}
                                className="w-full border px-2 py-1 rounded"
                            /> 

                        </div>

                </DialogBody>
                <DialogFooter>
                    <Button variant="text"
                    color="red"
                    className="mr-1"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteEx()}}
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
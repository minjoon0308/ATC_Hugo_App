import React, { useState, useEffect } from "react";
import {createExercise, createWorkout } from "./api/api";
import { useNavigate } from "react-router-dom";
import PreviousMap_ from "postcss/lib/previous-map";


export default function CreateExercise(){
    let body_regions = ['Lower Body', 'Full Body', 'Upper Body', 'Midsection']
    let difficulty_levels = ['Intermediate', 'Beginner', 'Grand Master', 'Novice', 'Advanced', 'Master', 'Legendary', 'Expert']
    let primary_classifications = ['Bodybuilding', 'Ballistics', 'Plyometric', 'Powerlifting', 'Calisthenics', 'Unsorted*', 'Animal Flow', 'Olympic Weightlifting ', 'Olympic Weightlifting', 'Mobility', 'Balance', 'Postural', 'Grinds']
    let target_muscle = ['Glutes', 'Forearms', 'Quadriceps', 'Abductors', 'Shins', 'Adductors', 'Hip Flexors', 'Biceps', 'Triceps', 'Calves', 'Trapezius ', 'Back', 'Shoulders', 'Trapezius', 'Hamstrings', 'Chest', 'Abdominals']
    let equipment = ['Parallette Bars', 'Trap Bar', 'Barbell', 'Slam Ball', 'Resistance Band', 'Ab Wheel', 'Dumbbell', 'Miniband', 'Macebell', 'EZ Bar', 'Bodyweight', 'Suspension Trainer', 'Tire', 'Cable', 'Bulgarian Bag', 'Wall Ball', 'Kettlebell', 'Sandbag', 'Weight Plate', 'Medicine Ball', 'Superband', 'Battle Ropes', 'Indian Club', 'Sliders', 'Gymnastic Rings', 'Clubbell', 'Stability Ball', 'Pull Up Bar', 'Landmine', 'Heavy Sandbag']
    const [name, setName] = useState("")
    const [open, setOpen] = useState(false); //MODAL
    const handleOpen = () => setOpen(!open);
    const [formError, setFormError] = useState("");
    
    const isExerciseValid = () => {
        const requiredFields = [
          "name",
          "body_region",
          "difficulty",
          "primary_classification",
          "target_muscle",
          "primary_equipment",
          "demo",
          "short_demo"
        ];
      
        for (const field of requiredFields) {
          if (!exercise[field] || exercise[field].trim() === "") {
            setFormError(`Please fill out the "${field.replace("_", " ")}" field.`);
            return false;
          }
        }
      
        if (!isValidUrl(exercise.demo)) {
          setFormError("Video URL is invalid.");
          return false;
        }
      
        if (!isValidUrl(exercise.short_demo)) {
          setFormError("Shorts URL is invalid.");
          return false;
        }
      
        setFormError(""); // Clear any previous errors
        return true;
      };

    const [exercise, setExercise] = useState(()=>({
        body_region: "", 
        demo: "",
        difficulty: "", 
        name: "", 
        primary_classification: "", 
        primary_equipment: "", 
        short_demo : "", 
        target_muscle : "" 
    }));
    const navigate = useNavigate()

    const isValidUrl = (url) => {
        try {
          new URL(url);
          return true;
        } catch (err) {
          return false;
        }
      };
    
    const handleCreateExercise = async() =>{
        const token = localStorage.getItem("authToken");
        try {

            const res = await createExercise(exercise, token)
            navigate('/exercise')

        } catch (error) {
            console.error("Error creating exercise:", error.response ? error.response.data : error);
        }
        
    }
    
    

    return(
        <div>
             <div className="text-5xl flex font-semibold items-center mb-10 focus:outline-hidden focus:outline-none">
                    <p className="">Create Your Exercise - </p>
                    <input type="text"
                    placeholder="Exercise Name"
                    value={exercise.name}
                    onChange={(e) => setExercise((prev) => ({...prev, name:e.target.value}))}
                    className="border-transparent focus:border-transparent focus:ring-0 "/>
                </div>

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
                        value={exercise.demo} 
                        onChange={(e) => setExercise((prev) => ({...prev, demo: e.target.value}))}
                        className="w-full border px-2 py-1 rounded"
                    /> 
                    {!isValidUrl(exercise.short_demo) && (
                        <p className="text-red-500 text-sm">Please enter a valid URL</p>
                    )}

                    <label className="block text-sm font-semibold">Shorts Url:</label>
                    <input type="text" 
                        value={exercise.short_demo} 
                        onChange={(e) => setExercise((prev) => ({...prev, short_demo: e.target.value}))}
                        className="w-full border px-2 py-1 rounded"
                    /> 
                    {!isValidUrl(exercise.short_demo) && (
                        <p className="text-red-500 text-sm">Please enter a valid URL</p>
                    )}

                    {formError && (
                    <p className="text-red-500 text-md font-medium text-center mt-4">{formError}</p>
                    )}
            </div>
            <div className="flex flex-col gap-4 justify-center items-center mb-5">
            <button className="w-full my-10 text-xl outline-none focus:outline-hidden focus:outline-none bg-blue-200"
            onClick={() => 
            {   
                if (isExerciseValid()) {
                    handleCreateExercise();
                }
            }}>Finalize Workout
            </button>
        </div>
        </div>
        
    )
}
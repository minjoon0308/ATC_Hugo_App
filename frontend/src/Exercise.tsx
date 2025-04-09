import React, {useState, useEffect} from "react";
import {getExercises} from "./api/api.jsx";
import Add from "./components/Add";
import CreateExBox from "./components/CreateExBox"

export default function Exercise(){
    const [exercises, setExercises] = useState<any>([])
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
            const fetchWorkouts = async () => {
                try {
                    const response = await getExercises(); 
                    if (!response.data.length){
                        setExercises([{id:"1", name: "Add an Exercise!", desc: "Add an exercise using the button on the bottom right"},]); 
                    }
                    else{
                        setExercises(response.data); 
                        console.log(response.data)
                    } 
                } catch (error) {
                    setExercises([ {id:"2", name: "Error Fetching Workouts", desc: "Please logout and login again."}])
                    console.error('Error fetching workouts:', error);
                }
            }; 
            fetchWorkouts();
        }, [refresh])

        return(
                <div>
                    <h1 className="mb-5">Exercises</h1>
                    <div className="flex flex-wrap gap-4 w-full h-full justify-start items-start">
                        {exercises.map((workout, index) => (
                            <CreateExBox key={index} {...workout} setRefresh={setRefresh} />
                        ))}
                    </div>
                    <Add link="createExercise"/>
                </div>
            )
}
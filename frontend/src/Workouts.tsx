import React, {useState, useEffect} from "react";
import {getUserWorkouts} from "./api/api.jsx";
import Add from "./components/Add";
import Box from "./components/Box"

export default function Workouts(){
    const [workouts, setWorkouts] = useState<any>([])

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await getUserWorkouts(); 
                console.log(response.data.length);
                if (!response.data.length){
                    console.log("GOT HERE")
                    setWorkouts([{id:"1", name: "Add Exercise!", desc: "Add an exercise using the button on the bottom right"}, {id:"2", name: "Add Exercise!", desc: "Add an exercise using the button on the bottom right"}]); 
                }
                else setWorkouts(response.data); 
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }
        }; 
        fetchWorkouts();
    }, [])
    return(
        <div>
            <h1>Workouts</h1>
            <div className="flex flex-col justify-center items-center h-full k">
                {workouts.map((workout) => (
                    <Box name={workout.name} desc={workout.desc} />
                ))}
            </div>
            <Add/>
        </div>
    )
}
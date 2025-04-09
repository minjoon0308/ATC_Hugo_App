import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { CiCircleChevLeft, CiCircleChevRight  } from "react-icons/ci";

interface Props{
    currentExercise: {}
    step: number
    total: number
    workoutId: number
}

export default function ExerciseDetails(props: Props){
    const navigate = useNavigate();
    const [current, setCurrent] = useState(1)
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const exercise = props.currentExercise

    console.log(props.total)
    useEffect(() => {
            if (props.currentExercise) {
              const duration = exercise.duration*60  || 30; // fallback to 30 seconds
              setTimeLeft(duration);
              setIsRunning(false);
            }
        }, [props.currentExercise]);
    
    useEffect(() => {
        let interval: NodeJS.Timeout;
        
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRunning) {
            // Move to next step
            if (current==exercise.num_reps){// if our reps reached the number we wanted
                const nextStep = props.step + 1;
                console.log("HEREEE")
                if (nextStep < props.total) {
                    console.log("YAY")
                navigate(`/workout/${props.workoutId}/step/${nextStep}`);
                } else {
                alert("Workout complete!");
                setIsRunning(false);
                }
            }
            else{
                setCurrent((cur)=>cur+1)
                setTimeLeft(exercise.duration*60)
            }
        }
        
        return () => clearInterval(interval);
        }, [isRunning, timeLeft]);


    return(
        <div >
            <div className="flex gap-4"> 
                <div className="text-4xl font-bold mb-4">
                Num Reps: <span className="font-normal">{exercise.num_reps}</span>
                </div>

                <div className="text-4xl font-bold mb-4">
                    Current Rep: <span className="font-normal">{current}</span>
                </div>
                
                <div className=" flex gap-4">
                    <div className="text-4xl font-bold mb-4">Time Remaining: <span className="font-normal">{timeLeft}s </span></div>
                        {!isRunning ? (
                        <button
                            className="bg-green-500 px-6 py-2 rounded text-white"
                            onClick={() => setIsRunning(true)}
                        >
                            Start
                        </button>
                        ) : (
                        <button
                            className="bg-yellow-500 px-6 py-2 rounded text-white"
                            onClick={() => setIsRunning(false)}
                        >
                            Pause
                        </button>
                        )}
                        <button
                        className="bg-red-500 px-6 py-2 rounded text-white"
                        onClick={() => {
                            const duration = exercise.duration*60 || 30;
                            setTimeLeft(duration);
                            setIsRunning(false);
                        }}
                        >
                        Restart
                        </button>
                </div>
            </div>
            
            <div className="flex text-[4em]">
            {props.step !== 0 &&  <a href={`/workout/${props.workoutId}/step/${props.step - 1}`}>
                <CiCircleChevLeft />
            </a>       
            }
            {props.step+1 !== props.total && <a href={props.step==props.total ? "/" : `/workout/${props.workoutId}/step/${props.step + 1}` }>
                <CiCircleChevRight /></a>} 
            

            </div>
        </div>
        
    )
}
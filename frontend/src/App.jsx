//import logo from "./logo.svg";
// import ExerciseList from "./components/ExerciseList.jsx";
import Nav from "./components/Nav.js";

import PrivateRoute from "./components/PrivateRoutes";

//AUTH COMPS
import Login from "./Login.js";
import Signup from "./Signup.js";
import Logout from "./Logout.js"

//WORKOUTS
import Workouts from "./Workouts.js"
import CreateWO from "./CreateWO.js";
import RunWorkout from "./RunWorkout.js";


import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route
          path="/app"
          element={
          <div className="App">
            <Nav/>
            <div className="Content">          
              <Workouts/>
            </div>
          </div>
        }/>
        <Route
          path="/create"
          element={
          <div className="create">
            <Nav/>
            <div className="Content">      
              <CreateWO/>
            </div>
          </div>
          }/>


        <Route
          path="/workout"
          element={
          <div className="create">
            <Nav/>
            <div className="Content">      
              <RunWorkout/>
            </div>
          </div>
          }/>
        </Route>
      
      


      

      {/* Auth Routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/logout" element={<Logout />} />

    </Routes>
    </BrowserRouter>
  );
  
}

export default App;

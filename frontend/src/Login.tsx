import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {loginUser} from "./api/auth.jsx";

export default function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const token = await loginUser(username, password);
            localStorage.setItem('authToken', token);
            navigate('/app');
        }
        catch (error){
            console.log("Login Failed", error);
        }
    }
    return (
        <div className="flex flex-col h-[100vh] w-[20vw] justify-center items-center bg-black ">
          <div className="bg-slate-1    00 rounded mt-5 ">
            <h2 className="font-bold p-2">Login</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex items-center justify-between gap-5">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Sign In
                    </button>

                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a>
                </div>
                <div>
                    <p className="mt-5">Need an account? <a href="/auth/signup">Signup</a></p>
                </div>

            </form>
          </div>

        </div>
      );
}
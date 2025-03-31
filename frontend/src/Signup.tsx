import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './api/auth'; // API function for signup

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
        setError("All fields are required.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
    try {
      await registerUser(username, email, password);
      navigate('/auth/login'); // Redirect to login page after signup
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex flex-col h-[100vh] justify-center items-center ">
          <div className="bg-slate-100 rounded mt-5">
            <h2 className="font-bold p-2">Signup</h2>
            {error && (
                <p className='text-red-700 mx-3'>
                    {error}
                </p>
            )}
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
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
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
                        Sign Up
                    </button>

                </div>
                <div>
                    <p className="mt-5">Already have an account? <a href="/auth/signup">Login</a></p>
                </div>

            </form>
          </div>

        </div>
  );
};

export default Signup;

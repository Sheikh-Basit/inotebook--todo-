import React, { useContext, useState } from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { NoteContext } from '../Context/NoteProvider';

const Login = () => {
  const navigate = useNavigate();

  const {LoginUser, showAlert} = useContext(NoteContext);
  const [input, setInput] = useState({email:'', password:''});
  
  // Handle input changes
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
  e.preventDefault();
  const token = await LoginUser(input.email, input.password); // make sure LoginUser returns json

  if (token && token.authToken) {
    showAlert("success", "Login successful!");
    navigate('/'); // ✅ redirect to home
  } else {
    showAlert("Error", token.error);
  }
  setInput({ email: '', password: '' });
};


  return (
    <div className='container mx-auto my-3 sm:px-6 lg:px-8'>
      <div className="w-full md:w-1/2 mx-auto">
      <h2 className="text-lg">Login Details</h2>
      <form onSubmit={handleSubmit} className="border-gray-200 border p-3 mt-2">
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input type="email" id="email" name='email' value={input.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-[#009de0] block w-full p-2.5" placeholder="name@flowbite.com" required />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input type="password" id="password" name='password' autoComplete='cpassword' value={input.password} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-[#009de0] block w-full p-2.5" required />
            </div>
            
            <button type="submit" className="text-white bg-[#009de0] hover:bg-[#00b3ff] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Login</button>
            <span className='block mt-2'>You don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-600">Signup</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login

import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { NoteContext } from '../Context/NoteProvider';
const Signup = () => {
  const navigate = useNavigate()
  const {showAlert,SignUpUser} = useContext(NoteContext)
  const [input,setInput] = useState({username:'',email:'', password:'',cpassword:''});

  const handleChange = (e) => {
    setInput({...input, [e.target.name]:e.target.value});
  }
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(input.password !== input.cpassword){
      showAlert('Error:', 'Password and Confirm Password must be match')
    }else{
      const SignupReply = await SignUpUser(input.username,input.email,input.password);
      console.log(SignUpUser)
      if(SignupReply && SignupReply.authToken){
        showAlert('Success! ', "User Added Successfully")
        setInput({username:'',email:'', password:'',cpassword:''})
        navigate('/login');
      }else{
        showAlert('Error! ', SignupReply)
      }
    }


  }
  return (
    <div className='container mx-auto my-3 sm:px-6 lg:px-8'>
      <div className="w-full md:w-1/2 mx-auto">
      <h2 className="text-lg">Create an Account</h2>
      <form onSubmit={handleSubmit} className="border-gray-200 border p-3 mt-2">
        <div className="mb-5">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                <input type="text" id="username" name='username' value={input.username} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-[#009de0] block w-full p-2.5" placeholder="M Ali" required />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input type="email" id="email" name='email' value={input.email} onChange={handleChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-[#009de0] block w-full p-2.5" placeholder="name@flowbite.com" required />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input type="password" id="password" name='password' value={input.password} onChange={handleChange}  autoComplete='off' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-[#009de0] block w-full p-2.5" required minLength={5} />
            </div>
            <div className="mb-5">
                <label htmlFor="cpassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                <input type="password" id="cpassword" name='cpassword' value={input.cpassword} onChange={handleChange} autoComplete='off' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-[#009de0] block w-full p-2.5" required minLength={5}/>
            </div>
            
            <button type="submit" className="text-white bg-[#009de0] hover:bg-[#00b3ff] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Signup</button>
            <span className='block mt-2'>Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-600">Login</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Signup

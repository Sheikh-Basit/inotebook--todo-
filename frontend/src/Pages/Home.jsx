import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import Note from '../components/Note';


const Home = () => {
  const navigate = useNavigate();

  //Check the user is Loged in or not
  useEffect(()=>{  
  if(!localStorage.getItem("token")){
      navigate('/login');
    }
    },[]);
      

  return (
    <div className="container flex flex-col sm:flex-row mx-auto sm:px-6 lg:px-8 p-4 my-3">
      <div className="form w-full md:w-1/2 lg:w-1/3 sm:pe-2 mb-2 sm:mb-0">
        <h2 className='text-3xl font-semibold'>Enter Text to make Notes</h2>
        <Form />
      </div>
      <div className="ShowAllNotes border border-gray-200 w-full md:w-1/2 lg:w-2/3 px-2">
        <h2 className='text-3xl font-semibold ps-1'>All Notes</h2>
        <Note />
      </div>
    </div>
  );
};

export default Home;

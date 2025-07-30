import React, { useContext, useState } from 'react'
import { NoteContext } from '../Context/NoteProvider';

const Form = () => {
    const {AddNote,showAlert} = useContext(NoteContext);
    const [noteInput, setNoteInput] = useState({title:'', tag:'', description:''});

    const handleChange = (e)=>{
        setNoteInput({...noteInput,[e.target.name]:e.target.value});
    }

    const handleSubmit = async(e)=>{
        if(localStorage.getItem("token")){
            e.preventDefault();
            const note = await AddNote(noteInput.title, noteInput.tag, noteInput.description);
            if(note){
                showAlert("Success! ","Note added successfully");
                setNoteInput({title:'', tag:'', description:''});
            }
        }
    }
    return (

        <form onSubmit={handleSubmit} className="border-gray-200 border p-3 mt-2">
            <div className="mb-5">
                <label htmlFor="Title" className="block mb-2 text-sm font-medium text-gray-900">Enter Title</label>
                <input type="text" id="Title" name='title' value={noteInput.title} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-[#009de0] block w-full p-2.5" placeholder="name@flowbite.com" required />
            </div>
            <div className="mb-5">
                <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-900">Enter Tag</label>
                <input type="text" id="tag" name='tag' value={noteInput.tag} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-[#009de0] block w-full p-2.5" required />
            </div>
            <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Enter Description</label>
                <textarea rows={5} type="text" id="description" name='description' value={noteInput.description} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-[#009de0] block w-full p-2.5" required />
            </div>
            
            <button type="submit" className="text-white bg-[#009de0] hover:bg-[#00b3ff] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add Note</button>
        </form>

    )
}

export default Form

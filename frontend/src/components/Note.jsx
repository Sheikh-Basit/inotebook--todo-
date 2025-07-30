import React, {useContext, useState} from 'react'
import { MdDelete } from "react-icons/md";    //Delete icon
import { FaRegEdit } from "react-icons/fa";  //Edit Icon
import EditDelete from './Modal/EditDelete';
import { NoteContext } from '../Context/NoteProvider';

const Note = () => {
    const {note} = useContext(NoteContext);
    

    // set variable for open and close modal to edit the user detail
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] =useState(false);
    const [isDelete, setIsDelete] =useState(false);
    const [noteData, setnoteData] = useState(null);
    // for edit modal
    const openModal = () => setIsOpen(true);
    // const closeModal = () => setIsOpen(false);

    // function for open the Edit Note Modal
    const EditNote = (id,title,tag,description)=>{
        openModal();
        setnoteData({id:id,title:title,tag:tag,description:description});
        setIsEdit(true);
        setIsDelete(false);
        
    }
    // function for open the Delete Note Modal
    const DeleteNote = (id)=>{
        openModal();
        setnoteData(id);
        setIsEdit(false);
        setIsDelete(true);
    
    }
    // If there is no note then return the message
    if (!note || note < 1) {
        return <p>No note found! Add the note first.</p>
    }
    return (
        <div className="flex flex-wrap py-2">
            <EditDelete isOpen={isOpen} isEdit={isEdit} isDelete={isDelete} noteData={noteData} setIsOpen={setIsOpen}/>
            {localStorage.getItem("token") && note.map((note) => (
                <div key={note._id} className="w-full lg:w-1/2 xl:w-1/3 p-1">
                    <div className="border border-gray-300 p-4 rounded shadow h-full flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold">{note.title}</h4>
                            <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded">{note.tag}</span>
                        </div>
                        <p className="text-sm text-gray-700">{note.description}</p>
                        <span className='grow'></span>
                        <div className="flex justify-between mt-2">
                            <button id='editNote' className="flex items-center gap-x-1 bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded" onClick={()=>EditNote(note._id,note.title,note.tag,note.description)}><FaRegEdit /> Edit</button>
                            <button id='deleteNote' className="flex items-center gap-x-1 bg-red-200 text-red-800 text-xs px-2 py-1 rounded" onClick={()=>DeleteNote(note._id)}><MdDelete /> Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Note

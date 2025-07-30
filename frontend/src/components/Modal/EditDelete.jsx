import React, { useContext, useState, useEffect } from 'react';
import { NoteContext } from '../../Context/NoteProvider';

const EditDelete = ({ isOpen, setIsOpen, isEdit, isDelete, noteData }) => {
    const { UpdateNote, DeleteNote } = useContext(NoteContext);
    // State to manage the input fields for editing
    // Initialize with empty values or the current note data
    const [noteInput, setNoteInput] = useState({
        id: '',
        uTitle: '',
        uTag: '',
        uDescription: '',
    });

    // Update state when noteData changes
    useEffect(() => {
        if (noteData) {
            setNoteInput({
                id: noteData.id || '',
                uTitle: noteData.title || '',
                uTag: noteData.tag || '',
                uDescription: noteData.description || '',
            });
        }
    }, [noteData]);


    const handleChange = (e) => {
        setNoteInput({ ...noteInput, [e.target.name]: e.target.value });
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();
        UpdateNote(noteInput.id, noteInput.uTitle, noteInput.uTag, noteInput.uDescription);
        closeModal();
        
    }
    
    const closeModal = () => {
        setIsOpen(false);
        setNoteInput({ uTitle: '', uTag: '', uDescription: '' });
    }


    return (
        <>
            {/* Main modal */}
            {isOpen && (
                <div className="fixed top-0 left-0 right-0 z-10 flex justify-center items-center w-full h-full">
                    <div className="bg-black absolute top-0 left-0 bottom-0 right-0 opacity-50" onClick={closeModal}></div>
                    {/* Edit Form */}
                    {isEdit && (<div className="bg-white rounded-lg shadow-md w-full max-w-md p-5 z-10">

                        {/* Modal header */}
                        <div className="flex justify-between items-center border-b pb-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Create New Product
                            </h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-800"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal body */}
                        <form onSubmit={handleSubmit} className="border-gray-200 border p-3 mt-2">
                            <div className="mb-5">
                                <label htmlFor="uTitle" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                                <input type="text" id="uTitle" name='uTitle' value={noteInput.uTitle} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-[#009de0] block w-full p-2.5" placeholder="name@flowbite.com" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="uTag" className="block mb-2 text-sm font-medium text-gray-900">Tag</label>
                                <input type="text" id="uTag" name='uTag' value={noteInput.uTag} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-[#009de0] block w-full p-2.5" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="uDescription" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <textarea rows={5} type="text" id="uDescription" name='uDescription' value={noteInput.uDescription} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-[#009de0] block w-full p-2.5" required />
                            </div>

                            <button type="submit" className="text-white bg-[#009de0] hover:bg-[#00b3ff] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update Note</button>
                        </form>
                    </div>)}

                    {/* Delete Form */}
                    {isDelete && (<div className="bg-white rounded-lg shadow-md w-full max-w-md p-6 relative">

                        {/* Close icon */}
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                        >
                            ✕
                        </button>

                        <div className="text-center">
                            <svg
                                className="mx-auto mb-4 text-gray-400 w-12 h-12"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500">
                                Are you sure you want to delete this note?
                            </h3>

                            <div className="flex justify-center gap-3">
                                <button
                                    onClick={async () => {
                                        // handle Delete function and share noteID as a parameter
                                        DeleteNote(noteData);
                                        closeModal();
                                    }}
                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                >
                                    Yes, I'm sure
                                </button>

                                <button
                                    onClick={closeModal}
                                    className="text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
                                >
                                    No, cancel
                                </button>
                            </div>
                        </div>

                    </div>)}


                </div>
            )}
        </>
    );
};

export default EditDelete;

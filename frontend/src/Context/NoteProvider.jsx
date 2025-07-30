import React, { createContext, useState, useEffect } from 'react';

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const [note, setNote] = useState([]);

  // Show Alert Function
  const showAlert = (type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  // Login User
  const LoginUser = async (email, password) => {
    const url = "http://localhost:3000/auth/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const json = await response.json();

      // if (!response.ok) {
      //   throw new Error(json.error || `HTTP error: ${response.status}`);
      // }

      // Save token
      if (json.authToken) {
        localStorage.setItem("token", json.authToken);
      }

      return json;

    } catch (error) {
      console.error("Login error:", error);
      // return error.message;
    }
  };

  // Signup User
  const SignUpUser = async (name, email, password) => {
    const url = "http://localhost:3000/auth/createuser";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || `HTTP error: ${response.status}`);
      }
      
      return json;

    } catch (error) {
      console.error("Signup error:", error.message);
      return error.message;
    }
  };

  // Fetch Logged-In User Data
  const UserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const url = "http://localhost:3000/auth/getuser";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-Token": token
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || `HTTP error: ${response.status}`);
      }

      // Store user name or whatever info needed
      localStorage.setItem("user", json.name);

    } catch (error) {
      console.error("User data fetch error:", error.message);
    }
  };

  // Fetch All Notes
  const FetchNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const url = "http://localhost:3000/note/getallNotes";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-Token": token
        },
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || `HTTP error: ${response.status}`);
      }
      setNote(json);
    } catch (error) {
      console.error("Fetch notes error:", error.message);
    }
  };

  // Add new Note
  const AddNote = async (title, tag, description) => {
    const url = "http://localhost:3000/note/addNote";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-Token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, tag, description })
      });

      const json = await response.json();
      FetchNotes();  // everytime call when the AddNote function call
      return json;

    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Update the existing Note
  const UpdateNote = async (noteID, title, tag, description) => {
    const url = `http://localhost:3000/note/updateNote/${noteID}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-Token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, tag, description })
      });

      const json = await response.json();
      FetchNotes();  // everytime call when the AddNote function call
      if(json){
        showAlert("Success", json.message);
      }

    } catch (error) {
      console.error("Login error:", error);
    }
  };


  // Delete the existing Note
  const DeleteNote = async (noteid,title, tag, description) => {
    const url = `http://localhost:3000/note/deleteNote/${noteid}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-Token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, tag, description })
      });

      const json = await response.json();
      FetchNotes();  // everytime call when the DeleteNote function call
      if(json){
        showAlert("Success",json.message);
      }

    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        alert,
        note,
        showAlert,
        LoginUser,
        SignUpUser,
        UserData,
        FetchNotes,
        setNote,
        AddNote,
        UpdateNote,
        DeleteNote
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export { NoteContext };
export default NoteProvider;

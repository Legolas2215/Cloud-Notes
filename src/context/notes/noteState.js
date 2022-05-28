//here we are defining the state
//A key point is that we do not import noteState in notes.js
//we use the context file

import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const [alert, setAlert] = useState(null);
  const local = 'http://localhost:5000'

  let notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null)
    }, 1500);

  }

  const getNotes = async () => {
    const url = `${local}/api/notes/getnotes`;
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    setNotes(json)
  }


  const addNote = async (title, description, tags) => {
    //Use API  
    const url = `${local}/api/notes/addnotes`;
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tags })
    });

    showAlert("Note Added","success");
    getNotes();
  }

  const editNote = async (id, title, description, tags) => {
    //API Call
    // const id= id;
    const url = `${local}/api/notes/update/${id}`;
    const response = await fetch(url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tags })
    });
    showAlert("Note Updated","success");
    getNotes();
  }



  const deleteNote = async (id) => {
    // console.log(id);
    const url = `${local}/api/notes/delete/${id}`;
    const response = await fetch(url, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    
    getNotes();
    showAlert("Note Deleted","success");
  }





  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, getNotes, editNote, alert,setAlert }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
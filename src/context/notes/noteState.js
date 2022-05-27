//here we are defining the state
//A key point is that we do not import noteState in notes.js
//we use the context file

import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

  const local = 'http://localhost:5000'

  let notesInitial = [];

  const [notes, setNotes] = useState(notesInitial)

  const getNotes = async () => {
    const url = `${local}/api/notes/getnotes`;
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4MzY3MzA5ZjI3ZjVlNzM2ZTRhNjA4In0sImlhdCI6MTY1Mjc4MTA1N30.Dz3nDTaSCyqQlysDbloApcs33LuRqOAi2PXEyDAp9QA'
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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4MzY3MzA5ZjI3ZjVlNzM2ZTRhNjA4In0sImlhdCI6MTY1Mjc4MTA1N30.Dz3nDTaSCyqQlysDbloApcs33LuRqOAi2PXEyDAp9QA'
      },
      body: JSON.stringify({ title, description, tags })
    });


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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4MzY3MzA5ZjI3ZjVlNzM2ZTRhNjA4In0sImlhdCI6MTY1Mjc4MTA1N30.Dz3nDTaSCyqQlysDbloApcs33LuRqOAi2PXEyDAp9QA'
      },
      body: JSON.stringify({ title, description, tags })
    });

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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4MzY3MzA5ZjI3ZjVlNzM2ZTRhNjA4In0sImlhdCI6MTY1Mjc4MTA1N30.Dz3nDTaSCyqQlysDbloApcs33LuRqOAi2PXEyDAp9QA'
      }
    });

    getNotes();
  }





  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, getNotes, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
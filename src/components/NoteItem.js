import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

export const NoteItem = (props) => {
    const { notes, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;


    return (
        <div className="card col-md-3" >
            <div className="card-body">
                <h5 className="card-title">{notes.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{notes.tags}</h6>
                <p className="card-text">{notes.description}</p>
                <i className="fa-solid fa-trash-can mx-1" onClick={() => {
                    deleteNote(notes._id);
                }}></i>
                <i className="fa-solid fa-pen-to-square mx-1" onClick={() => {
                    updateNote(notes);
                    // console.log("From noteItem" + notes.tag)
                }}></i>

                
            </div>
        </div>
    )
}

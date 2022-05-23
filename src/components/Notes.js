import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import { NoteItem } from './NoteItem';


export const Notes = () => {

  const context = useContext(noteContext);
  const { notes, setNotes } = context;

  return (
    <div>
      <div className="container my-3">
        <h2>Add Notes</h2>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">Title</label>
          <input type="text" className="form-control" id="newNoteTitle" placeholder="Title of Your Note" />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">Description</label>
          <input type="text" className="form-control" id="newNoteDesc" placeholder="Description" />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">Tags</label>
          <input type="text" className="form-control" id="newNoteTags" placeholder="Different tags seperated by space" />
        </div>
        <button type="submit" className="btn btn-dark">Submit</button>
      </div>
      <br /><br />
      <div className="container my-3">
        <h2>My Notes</h2>
        <br />
        <div className="row">
        {
          notes.map((note) => {
            return (<NoteItem notes={note} />)
          })}
          </div>
      </div>
    </div>
  )
}

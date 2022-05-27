import React, { useContext, useState, useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext'
import { NoteItem } from './NoteItem';


export const Notes = () => {

  const context = useContext(noteContext);
  const { notes, addNote, getNotes, editNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tags: "" })
  const [enote, seteNote] = useState({etitle: "", edescription: "", etag: "",eid:""})
  const ref = useRef(null);
  const refClose = useRef(null);
  useEffect(() => {
    getNotes();
  }, [])




  const clearForm = () => {
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    document.getElementById('tags').value = "";

  }
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tags);
    clearForm();
  }

  //Here we are using spread syntax: basically passing the setNote as the current note value and further
  //changing only things that have changes
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const updateNote = (currentNote) => {

    ref.current.click();
    seteNote({etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tags, eid:currentNote._id})
    // console.log("Data in Notes" + currentNote.tag)
    
  }
  const eonChange = (e)=>{
    seteNote({ ...enote, [e.target.name]: e.target.value })
  }
  const ehandleClick = ()=>{

    editNote(enote.eid,enote.etitle,enote.edescription,enote.etag);
    refClose.current.click();
  }

  return (
    <div>
      {/* Adding Notes */}
      <div className="container my-3">
        <h2>Add Notes</h2>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" onChange={onChange} name="title" placeholder="Title of Your Note" />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" onChange={onChange} name="description" placeholder="Description" />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">Tags</label>
          <input type="text" className="form-control" id="tags" onChange={onChange} name="tags" placeholder="Different tags seperated by space" />
        </div>
        <button type="submit" className="btn btn-dark" onClick={handleClick}>Submit</button>
      </div>
      <br /><br />
      {/* Modal for Updating Notes */}



      <button style={{ display: 'none' }} ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Notes</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" onChange={eonChange} name="etitle" value={enote.etitle}/>
              </div>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" onChange={eonChange} name="edescription" value={enote.edescription} />
              </div>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Tags</label>
                <input type="text" className="form-control" id="etags"  name="etags" onChange={eonChange} value={enote.etag} />
              </div>
              
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={ehandleClick}>Update Changes</button>
            </div>
          </div>
        </div>
      </div>



      {/* Displaying Notes */}
      <div className="container my-3">
        <h2>My Notes</h2>
        <br />
        <div className="row">
          {
            notes.map((note) => {
              return (<NoteItem notes={note} key={note._id} updateNote={updateNote} />)
            })}
        </div>
      </div>
    </div>
  )
}

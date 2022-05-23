import React from 'react'


export const NoteItem = (props) => {
    const note = props.notes;
    return (
        <div className="card col-md-3" key={note._id}>
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
    )
}

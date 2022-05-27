import React from 'react'

export const NoteUpdate = (props) => {
    const notes = props.notes;
    console.log(notes);
    return (
        <>
            <i className="fa-solid fa-pen-to-square mx-1" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
            <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title_u" name="title" value={notes.title} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Description</label>
                                <input type="text" className="form-control" id="description_u" name="description" value={notes.description} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput2" className="form-label">Tags</label>
                                <input type="text" className="form-control" id="tags_u" name="tags" value={notes.tags} />
                            </div>
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

//here we are defining the state
//A key point is that we do not import noteState in notes.js
//we use the context file

import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "6285f5aeabc9250fe23e7716",
            "user": "628367309f27f5e736e4a608",
            "title": " No Meeting tonight",
            "description": "Go Valorant",
            "tags": "personal",
            "Date": "2022-05-19T07:45:50.750Z",
            "__v": 0
        },
        {
            "_id": "6285f91c32620b6d480a9d56",
            "user": "628367309f27f5e736e4a608",
            "title": "Meeting tonight",
            "description": "Do not go valorant",
            "tags": "personal",
            "Date": "2022-05-19T08:00:28.154Z",
            "__v": 0
        },
        {
            "_id": "6285f5aeabc9250fe23e7716",
            "user": "628367309f27f5e736e4a608",
            "title": "Improve Wordle",
            "description": "Practice more and try to finish within first 3",
            "tags": "personal",
            "Date": "2022-05-19T07:45:50.750Z",
            "__v": 0
        },
        {
            "_id": "6285f91c32620b6d480a9d56",
            "user": "628367309f27f5e736e4a608",
            "title": "Stranger Things Recap",
            "description": "Rewatch Stranger Things before premiere of Season 4 Part 1",
            "tags": "personal",
            "Date": "2022-05-19T08:00:28.154Z",
            "__v": 0
        },
        {
            "_id": "6285f5aeabc9250fe23e7716",
            "user": "628367309f27f5e736e4a608",
            "title": "Complete React",
            "description": "Finish React by Month-end and apply for internship",
            "tags": "personal",
            "Date": "2022-05-19T07:45:50.750Z",
            "__v": 0
        },
        {
            "_id": "6285f91c32620b6d480a9d56",
            "user": "628367309f27f5e736e4a608",
            "title": "Complete Andrew Ng Course",
            "description": "Very less is left just get it overwith",
            "tags": "personal",
            "Date": "2022-05-19T08:00:28.154Z",
            "__v": 0
        }
    ]




    const [notes, setNotes] = useState(notesInitial)


    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
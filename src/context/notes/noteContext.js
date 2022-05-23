//We can create contexts that can be used in all components without drilling
//Here basically we are creating it and then use that in noteState in which we create 
//the state with data
//then import this in notes.js to use the created state
import { createContext } from "react";

const noteContext = createContext();

export default noteContext;
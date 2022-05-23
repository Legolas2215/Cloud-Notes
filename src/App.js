import './App.css';
import { Home } from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Aboutus } from './components/Aboutus';
import { Login } from './components/Login';
import { Notes } from './components/Notes';
//Wrapping the Routes around with NoteState and then inside those components we can call noteContext
import NoteState from './context/notes/noteState';

function App() {
  return (
    <>


      <NoteState>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />}> </Route>
            </Routes>
            <Routes>
              <Route exact path="/aboutus" element={<Aboutus />}> </Route>
            </Routes>
            <Routes>
              <Route exact path="/login" element={<Login />}> </Route>
            </Routes>
            <Routes>
              <Route exact path="/notes" element={<Notes />}> </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>

    </>
  );
}

export default App;

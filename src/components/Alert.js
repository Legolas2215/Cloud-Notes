import {React,useContext} from 'react'
import noteContext from '../context/notes/noteContext'

export const Alert = () => {

    const context = useContext(noteContext);
    const {alert} = context;
    return (
        <div className='container'>
            {alert && <div class="alert alert-dark" role="alert" >
                {alert.message}
            </div>}
        </div>
    )
}

export default Alert;
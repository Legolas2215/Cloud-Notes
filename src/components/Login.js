import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom';


export const Login = () => {
  let navigate = useNavigate();
  const [creds, setCreds] = useState({email:"",password:""});
  const clearForm=()=>{
    //Clearing the form
    setCreds({email:"",password:""});
  }
  const onClick =async(e)=>{
    const local = 'http://localhost:5000'
    e.preventDefault();
    // console.log(creds.email +" " +creds.password);
    const url = `${local}/api/auth/login`;
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email:creds.email, password: creds.password })
    });
    const json = await response.json();

    if(json.success){
      console.log(json.authToken);
      localStorage.setItem('token', json.authToken);
      //saving and redirect
      navigate('/Notes');
    }
    else{
      console.log("Error");
    }
    // clearForm();
  }
  
  const onChange =(e)=>{
    setCreds({...creds,[e.target.name]:e.target.value})
  }
  return (
    <form onSubmit={onClick}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" onChange={onChange} value={creds.email} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" name="password" id="exampleInputPassword1" onChange={onChange} value={creds.password} required/>
      </div>
      
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

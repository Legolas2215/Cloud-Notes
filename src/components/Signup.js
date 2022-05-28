import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const navigate = useNavigate();  
    const [creds, setCreds] = useState({name:"",email:"",password:"",cpassword:""});
  const clearForm=()=>{
    //Clearing the form
    setCreds({email:"",password:""});
  }
  const onSubmit =async(e)=>{
    const local = 'http://localhost:5000'
    e.preventDefault();
    // console.log(creds.email +" " +creds.password);
    const url = `${local}/api/auth/createUser`;
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name:creds.name ,email:creds.email, password: creds.password })
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
    
  }
  
  const onChange =(e)=>{
    setCreds({...creds,[e.target.name]:e.target.value})
  }
    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={onChange} name="name"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} name="email" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label"  >Password</label>
                <input type="password" className="form-control" id="password" onChange={onChange} name="password" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" />
            </div>            
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

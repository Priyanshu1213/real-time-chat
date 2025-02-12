// LoginForm.js
import React, { useState } from "react";
import "./UserStyle.css";
import { useNavigate } from "react-router-dom";
import FirstPage from "../FirstPage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Admin } from "../../action";
// import dotenv from "dotenv";
// dotenv.config();
function LoginForm() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChangeP = (e) => {
    const name = e.target.value;
    setPassword(name);
  };

  const handleChangeE = (e) => {
    const name = e.target.value;
    setEmail(name);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  const loginButton = async () => {
    console.log(`${process.env.REACT_APP_BASE_URL_PORT}`)
    const userExists = await axios.post(`${process.env.REACT_APP_BASE_URL_PORT}/api/login`, {
      email: email,
      password: password,
    });
    console.log(userExists.data.data.friends)
    // const getLatestMessage= async()=>{

      for(let i=0;i<userExists.data.data.friends.length;i++){
         
        const f_ID=userExists.data.data.friends[i];
        const Admin_ID=userExists.data.data._id;
        const messageTop= await axios.post(`${process.env.REACT_APP_BASE_URL_PORT}/api/getlatestmessage`,{
          users:[f_ID,Admin_ID]
        });
        userExists.data.data.friends[i].latestMessage = messageTop.data.data
    
      }
     
      //  console.log(userExists)
    // }
    
   

    if (userExists.data.success) {
   
      dispatch(Admin(userExists.data));
      localStorage.setItem("admin", JSON.stringify(userExists.data.data));
      navigate("/firstpage", FirstPage);
    } else {
      alert("Check your credentials! Try again!");
    }
  };

  return (
    <div className="login-form">

    
      
      <form onSubmit={handleSubmit}>
      <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChangeE}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChangeP}
          />
        </div>
        <button type="submit" onClick={loginButton}>
          Login
        </button>
        <br />
        <br />
        
        <u onClick={() => navigate('/')}>Create New Users</u>

      </form>
    </div>
  );
}

export default LoginForm;

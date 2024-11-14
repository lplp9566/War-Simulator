import React, { FC, useEffect, useState } from "react";
import "./LoginPage.css"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {  Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/features/UserSlice";
import { User } from "../../types";
import axios from "axios";
import { useSocket } from "../../services/useSockit";




const useAppDispatch = () => useDispatch<AppDispatch>();
const BASE_URL = import.meta.env.VITE_BASE_URL;
const LoginPage: FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const [users ,setusers]= useState <User[] |[]>([])
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state: RootState) => state.user);




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const newUser = {
    //   userName:userName,
    //   password:password
    // }
    
    // const user =await axios.post(`${BASE_URL}/api/login`,newUser)
    const result = await dispatch(loginUser({userName,password}))
  // localStorage.setItem("token",result.payload.data.token)
    console.log(result)
    if (result){

    
    try {
       
       
       
        navigate("/attackPage");
      
     
     } catch (err) {
       console.error("Login failed:", err);
     }}
  };

  return (
    
    <div className="login-container">
      <h2>Login</h2>
      {status === "pending" && <p className="loading-message">Loading...</p>}
      {status === "rejected" && error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          autoComplete="username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button type="submit">Send</button>
        <p className="switch-auth">
         create an account <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

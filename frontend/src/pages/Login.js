import React, { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import {login, register,reset} from '../features/auth/authSlice'
import Spinner from "../Components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {email, password } = formData;

  const navigate=useNavigate()
  const dispatch = useDispatch()
  const {user,isLoading,isError,isSuccess,message}=useSelector(
    (state)=>state.auth)

    useEffect(()=>{
      if(isError){
        toast.error(message)
      }
      if(isSuccess|| user){
      navigate('/')
      }
      dispatch(reset())
          },[user,isError,isSuccess,message,navigate,dispatch])

  const onChange = (e) =>{
    console.log("called");
    setFormData((prevState)=>({
     ...prevState,
     [e.target.name]:e.target.value
    }))
  };
  const onSubmit=(e)=>{
    console.log("called");
    e.preventDefault()
    const userData={
      email,
      password
    }
    dispatch(login(userData))
  }
  if(isLoading){
    return <Spinner/>
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Login and start setting Goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter Your Email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter  password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;

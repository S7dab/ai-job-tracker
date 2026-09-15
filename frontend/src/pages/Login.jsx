import React, { useContext, useState } from 'react'
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login() {
    const {login , token} = useContext(AuthContext);
 // login form state
  const initializeLoginFormDetails = {
    email: "",
    password: "",
  };
  const [loginFormDetails, setLoginFormDetails] = useState(
    initializeLoginFormDetails,
  );
  // validation states
  const [emailError,setEmailError]=useState();
  const [passwordError,setPasswordError]=useState();
  // show password state
  const [showPassword,setShowPassword] = useState(false)

    const inputChangeBox = (e)=>{
     const value = e.target.value;
    const name = e.target.name;

    setLoginFormDetails((prevDet) => ({ ...prevDet, [name]: value }));
    }
    
//  handling login form submit btn
const navigate = useNavigate();
    const handleLoginForm = async (e)=>{
        e.preventDefault();

        try {
          let isValid = true;
          //email validation
          if(loginFormDetails.email.trim().length<=0){
            setEmailError("Email is required");
            isValid = false;
          }if (!/^.+@.+\..+$/.test(loginFormDetails.email.trim())) {
            setEmailError("Please enter a valid email address with '@' and '.'");
            isValid=false
          } else {
            setEmailError("")
          }

           //password validation
          if(loginFormDetails.password.trim().length<=0){
            setPasswordError("Password is required");
            isValid = false;
          }if (loginFormDetails.password.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
            isValid=false
          } else {
            setPasswordError("")
          }
          


          if(!isValid){
            return
          }
            const response = await api.post("/auth/login",loginFormDetails);

            const token = response.data.token;
            login(token,response.data.user);
            
            if(response.status===200){
              toast.success(response.data.message)
            navigate("/dashboard")
            }
        } catch (error) {
          toast.error(error.response.data.message || error.message)
            console.log("error",error)
        }
        
    }

    // handling show password checkbox
    const onChangeCheckBox = (e)=> {
      setShowPassword(e.target.checked);
    }
    

    if(token){
      return <Navigate to="/dashboard" replace/>
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
    <form
      onSubmit={handleLoginForm}
      className="w-full max-w-md bg-base-100 border border-base-content/10 rounded-2xl shadow-xl p-6 sm:p-8"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="text-base-content/60 mt-2">
          Login to your AI Job Tracker account
        </p>
      </div>

      {/* Email */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-medium">
            Email
          </span>
        </label>

        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={loginFormDetails.email}
          onChange={inputChangeBox}
          className="input input-bordered w-full"
        />
        <p className=' text-red-500 text-sm mt-1'>{emailError}</p>
      </div>

      {/* Password */}
      <div className="form-control space-y-2">
        <div>
          <label className="label">
          <span className="label-text font-medium">
            Password
          </span>
        </label>

        <input
          type={showPassword? "text" :"password"}
          name="password"
          placeholder="Enter your password"
          value={loginFormDetails.password}
          onChange={inputChangeBox}
          className="input input-bordered w-full"
        />
        <p className=' text-red-500 text-sm mt-1'>{passwordError}</p>
        </div>
          <div
      className=' flex justify-start items-center '>
         <label className="label text-sm">
    <input type="checkbox" onChange={onChangeCheckBox} className="checkbox checkbox-xs" />
    Show Password
  </label>
      </div>
      </div>
    

      {/* Sign up */}
      <div className="text-sm text-center mt-5">
        <span className="text-base-content/60">
          Don't have an account?{" "}
        </span>

        <Link
          to="/signup"
          className="link link-primary font-medium"
        >
          Sign Up
        </Link>
      </div>

      {/* Login button */}
      <button
        type="submit"
        className="btn btn-primary w-full mt-6"
      >
        Login
      </button>
    </form>
  </div>
  )
}

export default Login
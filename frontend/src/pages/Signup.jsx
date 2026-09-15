import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

function Signup() {
  // show password state
  const [showPassword , setShowPassword] = useState(false);
    const initialization = {
        name:"",
        email:"",
        password:""
    };
    const [signupFormDetails,setSignupFormDetails] = useState(initialization);
    // validation states
    const [nameError,setNameError] = useState()
      const [emailError,setEmailError]=useState();
      const [passwordError,setPasswordError]=useState();
// handling input change of email,password,name
    const inputChangeBox = (e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setSignupFormDetails((preData)=>({...preData,[name]:value}));
    }

    // handling form submit details or creating new user
    const navigate = useNavigate();
    const handleFormDetailsBtn = async (e) => {
try {
    e.preventDefault();

    let isValid = true;

    // name validation
if (signupFormDetails.name.trim().length <= 0) {
  setNameError("Name is required");
  isValid = false;
} else {
  setNameError("");
}
// email validation
if (signupFormDetails.email.trim().length <= 0) {
  setEmailError("Email is required");
  isValid = false;
} else if (!/^.+@.+\..+$/.test(signupFormDetails.email.trim())) {
  setEmailError("Please enter a valid email address with '@' and '.'");
  isValid = false;
} else {
  setEmailError("");
}
// password validation
if (signupFormDetails.password.trim().length <= 0) {
  setPasswordError("Password is required");
  isValid = false;
} else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_]).{8,}$/.test(signupFormDetails.password)) {
  setPasswordError("Password must be at least 8 characters, include one uppercase, one number, and one special character (like !@#$%^&*_)");
  isValid = false;
} else {
  setPasswordError("");
}

    if(!isValid){
      return
    }

    const response = await api.post("/auth/register",signupFormDetails)
    
    if(response.status === 201){
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/login")
      }, 500);
    }
} catch (error) {
     if (error.response && error.response.data) {
      toast.error(error.response.data.message);
    } 
}
    }

    useEffect(()=>{
      handleFormDetailsBtn()
    },[])

    // handle show password check box
    const onChangeCheckBox = (e)=> {
      setShowPassword(e.target.checked);
    }
    
  return (
    <div>
        
          <div className="min-h-screen flex justify-center items-center bg-base-200">
    <form onSubmit={handleFormDetailsBtn} className="card bg-base-100 w-96 shadow-sm p-6">

      <h1 className="text-3xl font-bold text-center">
        Create Account
      </h1>

      <p className="text-center text-base-content/60 mt-1 mb-6">
        Create your JobTrack account
      </p>
{/* name input part */}
      <div>
        <label className="label">Name</label>
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        className="input input-bordered w-full"
        value={signupFormDetails.name}
        onChange={inputChangeBox}
      />
      <p className=' text-red-500 text-sm'>{nameError}</p>
      </div>
{/* email part */}
      <div>
        <label className="label mt-3">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="input input-bordered w-full"
        value={signupFormDetails.email}
        onChange={inputChangeBox}
      />
      <p className=' text-red-500 text-sm'>{emailError}</p>
      </div>
{/* password input part */}
     <div className=' space-y-2'>
       <div>
        <label className="label mt-3">Password</label>
      <input
        type={showPassword? "text" : "password"}
        name="password"
        placeholder="Create a password"
        className="input input-bordered w-full"
        value={signupFormDetails.password}
        onChange={inputChangeBox}
      />
      <p className=' text-red-500 text-sm'>{passwordError}</p>
      </div>
       <div
      className=' flex justify-start items-center '>
         <label className="label text-sm">
    <input type="checkbox" onChange={onChangeCheckBox} className="checkbox checkbox-xs" />
    Show Password
  </label>
      </div>
     </div>
<div className=' mt-2'>
  <p className=' flex gap-2'>Have an account?<Link to={"/login"} className=' text-blue-400'>Login</Link></p>
</div>
{/* button sing in */}
      <button type="submit" className="btn btn-primary mt-6">
        Sign Up
      </button>

    </form>
  </div>
    </div>
  )
}

export default Signup
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../Utils.js/userSlice";
import { BASE_URL } from "../Utils.js/constants";

const Login = () => {

  const [emailId,setEmailId] = useState("123@gmail.com");
  const [password,setPassword] = useState("@123"); 

  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [isLoginForm,setIsLoginInForm] = useState(true);

  const [error,setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
      const res = await axios.post(BASE_URL + "/login" , 
      {
        emailId,
        password
      }, {withCredentials : true});

      dispatch(addUser(res.data));
      return navigate("/");
    }
    
    catch(err) {
      setError(err?.response?.data ||"Something went wrong !!!");
    }
  };

  const handleSignUp = async () => {
    try{
      const res = await axios.post(BASE_URL+"/signup",
        {
          firstName, lastName, emailId, password
        },
        { withCredentials: true}
      ); 
      dispatch(addUser(res.data.data)); 
      return navigate("/profile");
    }
    catch(err) {
      setError(err?.response?.data || "Something went wrong");
    }
  }

  return (
    <div className = "flex justify-center my-10 ">
      <div className=" card card-dash bg-base-300 w-96 ">
        <div className="card-body">
          <h2 className="card-title flex justify-center"> {isLoginForm ? "Login" : "Sign Up"} </h2>
          <div>
          {!isLoginForm && (
          <>
            <fieldset className="fieldset" >
              <legend className="fieldset-legend">First Name</legend>
              <input 
                type="text" 
                value = {firstName}
                className="input" 
                placeholder="Enter your First name*" 
                onChange = {(e) => setFirstName(e.target.value) }
              />
            </fieldset>

            <fieldset className="fieldset" >
              <legend className="fieldset-legend">Last Name</legend>
              <input 
                type="text" 
                value = {lastName}
                className="input" 
                placeholder="Enter your Last name*"
                onChange = {(e) => setLastName(e.target.value) }
              />
            </fieldset>
          </>
          )}
            <fieldset className="fieldset" >
              <legend className="fieldset-legend">Email Id</legend>
              <input 
                type="text" 
                value = {emailId}
                className="input" 
                placeholder="Enter your email*" 
                onChange = {(e) => setEmailId(e.target.value) }
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input 
                type="text" 
                value = {password}
                className="input" 
                placeholder="Enter your Password*"
                onChange = {(e) => setPassword(e.target.value) }
              />
            </fieldset>
            <p className = "text-red-600"> {error} </p>
          <div className="card-actions justify-center mt-6 cursor-pointer">
            <button className="btn btn-primary " 
              onClick= {isLoginForm ? handleLogin 
                                    : handleSignUp
              }>
              {isLoginForm ? "Log In" : "Sign Up" }</button>
          </div>
            <div className="card-actions justify-center my-4 ">
          </div>
          <p className = "text-center cursor-pointer" onClick={() => 
            setIsLoginInForm((value) => !value)
          }> 
            {isLoginForm ? "New User ? Sign Up Here" :
             "Existing User? Login Here"  }
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
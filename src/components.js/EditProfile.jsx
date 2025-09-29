import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../Utils.js/constants";
import { addUser } from "../Utils.js/userSlice";

const EditProfile = ({user}) => {

    const [firstName,setFirstName] = useState(user.firstName);
    const [lastName,setLastName] = useState(user.lastName);
    const [age,setAge] = useState(user.age || "");
    const [about,setAbout] = useState(user.about);
    const [gender,setGender] = useState(user.gender || "");
    const [photoURL,setPhotoURL] = useState(user.photoURL );
    const [error,setError] = useState("");
    const [showToast,setShowToast] = useState(false);

    const dispatch = useDispatch(); 

    const saveProfile = async () => {
      // to clean errors
      setError("");

      try{
        const res = await axios.patch(BASE_URL + "/profile/edit",
          {firstName, lastName, age, about, gender, photoURL},
          {withCredentials: true}
        );
        dispatch(addUser(res?.data?.data));
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
          }, 3000);
      }
      catch(err){
        setError(err.response.data);
      }
    }

    return (
      <div>
        <div className = "flex justify-center my-10">
          <div className = "flex justify-center mx-10">
            <div className=" card card-dash bg-base-300 w-96 ">
              <div className="card-body">
                <h2 className="card-title flex justify-center"> Edit Profile </h2>
                  <fieldset className="fieldset" >
                    <legend className="fieldset-legend">First name:</legend>
                    <input 
                      type="text" 
                      value = {firstName}
                      className="input" 
                      placeholder="Enter your firstName*" 
                      onChange = {(e) => setFirstName(e.target.value) }
                    />
                  </fieldset>

                  <fieldset className="fieldset" >
                    <legend className="fieldset-legend">Last name:</legend>
                    <input 
                      type="text" 
                      value = {lastName}
                      className="input" 
                      placeholder="Enter your lastname*" 
                      onChange = {(e) => setLastName(e.target.value) }
                    />
                  </fieldset>

                  <fieldset className="fieldset" >
                    <legend className="fieldset-legend">Age:</legend>
                    <input 
                      type="text" 
                      value = {age}
                      className="input" 
                      placeholder="Enter your age*" 
                      onChange = {(e) => setAge(e.target.value) }
                    />
                  </fieldset>

                  <fieldset className="fieldset" >
                    <legend className="fieldset-legend">Photo URL:</legend>
                    <input 
                      type="text" 
                      value = {photoURL}
                      className="input" 
                      placeholder="Enter your Photo URL*" 
                      onChange = {(e) => setPhotoURL(e.target.value) }
                    />
                  </fieldset>

                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Gender:</legend>
                    <select
                      id="gender"
                      className="input"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="" disabled>Please select your gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </fieldset>

                  <fieldset className="fieldset">
                      <legend className="fieldset-legend">About:</legend>
                      <textarea 
                        className="textarea h-24" 
                        placeholder="About" 
                        value = {about}
                        onChange = {(e) => setAbout(e.target.value) }
                      ></textarea>
                  </fieldset>
                  <p className = "text-red-500"> {error} </p>
                  <div className="card-actions justify-center my-2">
                    <button className="btn btn-primary " onClick= {saveProfile}> Save Profile </button>
                  </div>
                  
                </div>
              </div>
            </div>
          <UserCard user = {{firstName, lastName, age, about, gender, photoURL}} />
        </div >
        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-info">
              <span>Profile saved successfully.</span>
            </div>
        </div>
      )}
      </div>
  );
}
     
export default EditProfile;
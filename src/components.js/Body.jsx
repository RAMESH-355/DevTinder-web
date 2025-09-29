import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../Utils.js/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser } from "../Utils.js/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try{
      const res = await axios.get(BASE_URL + "/profile/view" ,{
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    }
    catch(err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.log(err.message);
    }
  };

  useEffect (() => {
    fetchUser();
  },[]);
  
  return (
    <div>
        <NavBar />
        <Outlet />
        <Footer />
    </div>
   
  );
};

export default Body;
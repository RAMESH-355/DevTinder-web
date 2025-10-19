import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../Utils.js/constants";
import { addFeed } from "../Utils.js/feedSlice";
import { useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
axios.defaults.withCredentials = true;

const Feed = () => {
  const feed = useSelector((store) => store.feed); 

  const dispatch = useDispatch();
   
  const getFeed = async () => {

    if (feed && feed.length > 0) return;

    try{
      const res = await axios.get(BASE_URL+"/user/feed",{withCredentials: true});
      dispatch(addFeed(res.data));
    }
    catch(err) {
      console.error(err);
    };
  }; 
  useEffect (() => {
    getFeed();
  },[]);

  if (!feed) return <h2>Loading feed...</h2>;;

  if (feed.length === 0) return <h1 className = "flex justify-center text-3xl text-red-600"> No new users have been found </h1>;

  return (
    feed && (
    <div className = "flex justify-center my-10">
      <UserCard user = {feed[0]} />
    </div>
    )
  );
};

export default Feed;
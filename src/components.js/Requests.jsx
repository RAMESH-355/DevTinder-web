import axios from "axios";
import { BASE_URL } from "../Utils.js/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../Utils.js/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector(store => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(`${BASE_URL}/request/review/${status}/${requestId}`, {}, { withCredentials: true });
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.log(err.message);
    }
  };

  const requestsFetch = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true });
      console.log("Fetched Requests:", res.data.connectionRequests); // Debug
      dispatch(addRequests(res.data.connectionRequests));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    requestsFetch();
  }, []);

  if (!requests || requests.length === 0) {
    return <h1 className="text-2xl text-center text-red-600 mt-10">No requests found</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-3xl text-orange-600 font-bold mb-5">Requests</h1>
      {requests.map(request => {
        const user = request.fromUserId; // Use fromUserId
        return (
          <div key={request._id} className="flex m-4 p-4 items-center rounded-md bg-base-300 w-2/3 mx-auto">
            <div>
              <img
                alt="User"
                src={user.photoURL || "https://via.placeholder.com/80"}
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">{user.firstName} {user.lastName}</h2>
              {user.age && user.gender && <p>{user.age}, {user.gender}</p>}
              {user.about && <p>{user.about}</p>}
            </div>
            <div>
              <button className="btn btn-primary mx-2" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
              <button className="btn btn-secondary mx-2" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;



/*

import axios from "axios";
import { BASE_URL } from "../Utils.js/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../Utils.js/requestSlice";
import { useEffect } from "react";

const Requests = () => {
    const requests = useSelector(store => store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status,_id) => {
        try{
            const res = await axios.post(BASE_URL + "/request/review/"  
                + status + "/" + _id, {} , {withCredentials:true}
            );
            dispatch(removeRequest(_id));
        }

        catch(err){
            console.log(err.message);
        }
    };

    const requestsFetch = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/requests/received",{
            withCredentials: true
        }); 
        dispatch(addRequests(res.data.connectionRequests));
        }
        catch(err){
            console.log(err.message);
        }
    };

    useEffect(() => {
        requestsFetch();
    },[]);

    if (!requests) return; 

    if (requests.length === 0) return <h1 className = "text-2xl text-center flex justify-center text-red-600"> No requests found </h1>;

    return (
    <div className="text-center my-10">
      <h1 className = "text-3xl text-orange-600 text-bold">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoURL, age, gender, about} = request.fromUserId;  
        
        return(
            <div key={request._id} className = "flex m-4 p-4 items-center rounded-md bg-base-300 w-2/3 mx-auto ">
                <div>
                    <img 
                        alt = "User Photo"
                        className = "w-20 h-20 rounded-full"
                        src = {photoURL}
                    />
                </div>
                <div className = "text-left mx-4">
                    <h2 className = "font-bold text-xl">
                        {firstName + " " + lastName}
                    </h2>
                    {age && gender && <p> {age + ", " + gender} </p>}
                    <p> {about} </p>
                </div>
                <div>
                    <button className="btn btn-primary mx-2"
                        onClick = {() => reviewRequest("rejected",request._id)}
                    >Reject</button>
                    <button className="btn btn-secondary mx-2"
                        onClick = {() => reviewRequest("accepted",request._id)}
                            >Accept</button>
                </div>
            </div>
        );
      })}

    </div>
  );
};

export default Requests;

*/
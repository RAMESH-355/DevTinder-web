import axios from "axios";
import { BASE_URL } from "../Utils.js/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../Utils.js/connections";
import { Link } from "react-router-dom";

const Connections = () => {
    
    const connections = useSelector(store => store.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/connections" , {
                withCredentials: true
            });
            dispatch(addConnections(res?.data?.data));
        }
        catch(err) {
            console.error(err);
        }
    }
    useEffect(() => {
            fetchConnections();
        },[]);

    if (!connections) return ; 

    if (connections.length === 0) return (<h1 className = "text-2xl text-center flex justify-center font-bold text-red-600 my-5"> No Connections , Make New Friends !!! </h1>) 

    return (
    <div className="text-center my-10">
        <h1 className = "text-3xl text-orange-600 text-bold">Connections</h1>

        {connections.map((connection) => {
        const {_id , firstName, lastName, photoURL, age, gender, about} = connection;  

        return(
            <div key={connection._id} className = "flex m-4 p-4 rounded-md bg-base-300 w-1/2 mx-auto ">
                <div>
                    <img 
                        alt = "User Photo"
                        className = "w-20 h-20"
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
                <div className = "flex justify-end flex-grow items-center">
                    <Link to = {"/chat/" + _id}  >
                        <button className = "btn btn-sm btn-primary mt-2 "> Message </button>
                    </Link>
                </div>
            </div>
        )
      })}
    </div>
  );
};

export default Connections;
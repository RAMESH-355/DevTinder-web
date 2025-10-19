import { useDispatch } from "react-redux";
import { BASE_URL } from "../Utils.js/constants";
import axios from "axios";
import { removeUserFromFeed } from "../Utils.js/feedSlice";
axios.defaults.withCredentials = true;

const UserCard = ({user}) => {
    const {_id, firstName, lastName, age, gender, photoURL, about} = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status,userId) => {
        try{
            const res = await axios.post(BASE_URL + "/request/send/" +
                status + "/" + userId , {}, 
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(userId));
        }

        catch (err) {
            console.log(err.message);
        }
    }

    return(
        <div className="card bg-base-300 w-96 h-auto shadow-sm">
            <figure>
                <img
                className = "mt-10"
                src= {photoURL}
                alt="User profile" />
            </figure>
            <div className="card-body">
                <h2 className="card-title justify-center text-orange-700 text-3xl"> {firstName + " " + lastName} </h2>
                {age && gender && <p className = "text-center text-2xl">  {age + ", " + gender} </p>}
                <p className="text-center text-md"> {about} </p>
                <div className="card-actions justify-center pt-2">
                <button 
                    className="btn btn-primary "
                    onClick = {() => handleSendRequest("ignored",_id) }
                        >Ignore</button>
                <button 
                    className="btn btn-secondary"
                    onClick = {() => handleSendRequest("interested",_id)}
                        >Interested</button>
                </div>
            </div>
            </div>
    );
};
 
export default UserCard;

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils.js/constants";
import { removeUser } from "../Utils.js/userSlice";
import axios from "axios";
axios.defaults.withCredentials = true;

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
        await axios.post(BASE_URL + "/logout" , {} , {withCredentials: true});  // to remove existing token
        dispatch(removeUser()); 
        return navigate("/login");
    }
    catch(err){
      console.error(err);
    }
  
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to = "/" className="btn btn-ghost text-xl">🖥️ Dev Tinder</Link>
      </div>
        {user && (
          <div className="flex items-center gap-1">
            <div className="form-control text-orange-600"> Welcome {user.firstName} </div>
            <div className="dropdown dropdown-end mx-5 flex items-center ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="user photo"
                    src= {user.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-36 w-52 p-2 shadow"
              >
                <li>
                  <Link to = "/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li><Link to = "/connections">Connections</Link></li>
                <li><Link to = "/requests">Requests</Link></li>
                <li><a onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          </div>
        )}
      </div>
  );
};

export default NavBar;
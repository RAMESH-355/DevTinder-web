import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components.js/Body";
import Login from "./components.js/Login";
import Profile from "./components.js/Profile";
import { Provider } from "react-redux";
import appStore from "./Utils.js/appStore";
import Feed from "./components.js/Feed";
import Connections from "./components.js/Connections";
import Requests from "./components.js/Requests";

function App() {

  return (
    <div>
      <Provider store={appStore} >
        <BrowserRouter baseName = "/">
          <Routes>
            <Route path="/" element = {<Body /> }> 
              <Route path="/" element = {<Feed /> }/> 
              <Route path="/login" element = {<Login /> } />
              <Route path="/profile" element = {<Profile /> } />
              <Route path="/connections" element = {<Connections /> } />
              <Route path="/requests" element = {<Requests /> } />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

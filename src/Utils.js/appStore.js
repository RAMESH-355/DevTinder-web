import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import FeedReducer from "./feedSlice";
import connectionReducer from "./connections";
import requestReducer from "./requestSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: FeedReducer,
        connections: connectionReducer,
        requests: requestReducer,
    },
});

export default appStore;
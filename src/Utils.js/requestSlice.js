import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: [],
    reducers: {
        addRequests: (state,action) => action.payload,
        removeRequest: (state,action) => {
            const newArray = state.filter((req) => req._id !== action.payload);
            return newArray;
        },
    },
}); 

export const {addRequests,removeRequest} = requestSlice.actions; 
export default requestSlice.reducer;
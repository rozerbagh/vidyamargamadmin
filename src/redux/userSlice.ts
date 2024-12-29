import { createSlice } from "@reduxjs/toolkit";
import { UserStateProps } from "../Interfaces/ReduxInterface/ReduxInterface";

const initialState: UserStateProps = {
  usersdata: [],
};
export const usersReducers = createSlice({
  name: "users",
  initialState,
  reducers: {
    storeUsers: (state, action) => {
      state.usersdata = action.payload.map((ele: any, idx: number) => ({
        _id: ele._id,
        key: `${idx + 1}`,
        fullname: ele.fullname,
        phone: ele.phone,
        email: ele.email,
        address: ele.address ? "" : "",
        status: ele.status,
        role: ele.role,
      }));
    },
    addUser: (state, action) => {},
    removeUser: (state, action) => {
      state.usersdata = action.payload;
    },
    editUser: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser, editUser, storeUsers } =
  usersReducers.actions;

export default usersReducers.reducer;

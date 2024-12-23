import { createSlice } from "@reduxjs/toolkit";
import { UserStateProps } from "../Interfaces/ReduxInterface/ReduxInterface";

const initialState: UserStateProps = {
  usersdata: [
    {
      key: "1",
      fullname: "John Brown",
      phone: "8050849022",
      email: "test@example.com",
      address: "New York No. 1 Lake Park",
      status: 1,
      role: 1,
    },
    {
      key: "2",
      fullname: "Jim Green",
      phone: "8050849022",
      email: "test@example.com",
      address: "London No. 1 Lake Park",
      status: 0,
      role: 2,
    },
    {
      key: "3",
      fullname: "Joe Black",
      phone: "8050849022",
      email: "test@example.com",
      address: "Sydney No. 1 Lake Park",
      status: 2,
      role: 3,
    },
  ],
};
export const usersReducers = createSlice({
  name: "users",
  initialState,
  reducers: {
    storeUsers: (state, action) => {
      state.usersdata = action.payload.map((ele: any, idx: number) => ({
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
      state.usersdata = action.payload
    },
    editUser: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser, editUser, storeUsers } =
  usersReducers.actions;

export default usersReducers.reducer;

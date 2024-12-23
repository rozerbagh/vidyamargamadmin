/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import AddCustomerForm from "../Layout/Modals/AddCustomerForm";
import CircularLoader from "../components/Loader/CircularLoader";
import useAdd from "../hooks/useAdd";
import useFetch from "../hooks/useFetch";
import { UserInterface } from "../Interfaces/ReduxInterface/ReduxInterface";
import { storeUsers } from "../redux/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faDeleteLeft,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

type UsersProps = {
  title: string;
};
type ResponseProps = {
  data: object | undefined;
  error: object | undefined;
};
type UserValues = {
  username: string;
  fullname: string;
  email: string;
  password: string;
  phoneno: string;
};

const UserRoleEnum = Object.freeze({
  ADMIN: 1,
  MODERATOR: 2,
  USER: 3,
});

const Users: React.FC<UsersProps> = ({ title }) => {
  const usersData = useAppSelector((state) => state.users.usersdata);
  const dispatch = useAppDispatch();
  const { addUser } = useAdd();
  const { fetchUsersList, loading } = useFetch();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [addUserDetail, setAddUserDetail] = useState<UserValues>({
    username: "",
    fullname: "",
    email: "",
    password: "",
    phoneno: "",
  });

  const handleAdduser = (
    e: React.MouseEvent<HTMLButtonElement>,
    data: {
      fullname: string;
      email: string;
      password: string;
      phoneno: string;
      role: number;
      gps_id: string;
    }
  ) => {
    e.preventDefault();
    const url = "user/signup";
    addUser({ ...data, role: 3 }, url, (data) => data).then((res) => {
      setOpenAddModal(false);
      fetchData();
    });
  };
  const fetchData = async () => {
    try {
      const result = await fetchUsersList();
      dispatch(storeUsers(result));
    } catch (error) {}
  };
  useEffect(() => {
    fetchData(); // Call the async function when the component mounts
  }, []);
  useEffect(() => {
    console.log(addUserDetail);
  }, [addUserDetail]);
  return (
    <>
      {loading ? (
        <div className="container">
          <CircularLoader />
        </div>
      ) : (
        <>
          <div className="table-header">
            <h1>Schools Information</h1>
            <button
              className="btn-primary"
              onClick={() => setOpenAddModal(true)}
            >
              Add Users
            </button>
          </div>
          <div className="overflow-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((ele: UserInterface, idx: number) => {
                  const role =
                    ele.role === 1 ? (
                      <div className="label success-label">ADMIN</div>
                    ) : ele.role === 2 ? (
                      <div className="label info-label">MODERATOR</div>
                    ) : (
                      <div className="label secondary-label">USER</div>
                    );
                  const statusLabel =
                    ele.status === 1 ? (
                      <div className="label success-label">Active</div>
                    ) : (
                      <div className="label danger-label">InActive</div>
                    );
                  return (
                    <tr key={(idx + Math.random()).toString()}>
                      <td>{idx + 1}</td>
                      <td>{ele.fullname}</td>
                      <td>{ele.email}</td>
                      <td>{ele.phone}</td>
                      <td>{role}</td>
                      <td>{statusLabel}</td>
                      <td>
                        <button className="success-button">
                          <FontAwesomeIcon icon={faBook} />
                          &nbsp;Details
                        </button>
                        <button className="info-button">
                          <FontAwesomeIcon icon={faEnvelope} />
                          &nbsp;Update
                        </button>
                        <button className="danger-button">
                          <FontAwesomeIcon icon={faDeleteLeft} />
                          &nbsp;Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {openAddModal ? (
            <AddCustomerForm
              open={openAddModal}
              handleCancel={() => setOpenAddModal(false)}
              handleSubmit={handleAdduser}
              handleOk={() => setOpenAddModal(false)}
            />
          ) : null}
        </>
      )}
    </>
  );
};
export default Users;

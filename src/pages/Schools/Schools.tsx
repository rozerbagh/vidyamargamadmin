import React, { useEffect, useState } from "react";
import { SchoolObject } from "../../Interfaces/PagesInterfaces";
import useFetch from "../../hooks/useFetch";
import AddSchoolForm from "../../Layout/Modals/AddSchoolForm";
import CircularLoader from "../../components/Loader/CircularLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faDeleteLeft,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
type SchoolsProps = {
  title: string;
};
const SchoolsListing: React.FC<SchoolsProps> = ({ title }) => {
  const { loading, fetchSchoolsList } = useFetch();
  const [openAddModal, setOpenAdModal] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const [schools, setSchools] = useState<SchoolObject[]>([]);
  useEffect(() => {
    async function fetchSchools() {
      const data = await fetchSchoolsList();
      setSchools(data.response.data);
    }
    fetchSchools();
  }, []);

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
              onClick={() => setOpenAdModal(true)}
            >
              Add Schools
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
                  <th>Address</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((ele, idx) => (
                  <tr key={(idx + Math.random()).toString()}>
                    <td>{idx + 1}</td>
                    <td>{ele.name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.phoneno}</td>
                    <td>
                      {ele.address.street},&nbsp;{ele.address.landmark},&nbsp;
                      {ele.address.district},&nbsp;{ele.address.pincode},&nbsp;
                      {ele.address.state}
                    </td>
                    <td>
                      {ele.status === 1 ? (
                        <div className="label success-label">Active</div>
                      ) : (
                        <div className="label danger-label">InActive</div>
                      )}
                    </td>
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
                ))}
              </tbody>
            </table>
          </div>
          {openAddModal ? (
            <AddSchoolForm
              open={openAddModal}
              handleCancel={() => setOpenAdModal(false)}
              handleOk={() => setOpenAdModal(false)}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default SchoolsListing;

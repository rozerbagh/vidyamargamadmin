import React, { useState, useEffect} from "react"
import useFetch from "../hooks/useFetch";
type BusesProps = {
  title: string,
}
const BusesListing: React.FC<BusesProps> = ({ title }) => {
  const { loading, fetchSchoolsList, fetchBusesList } = useFetch();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [schoolList, setSchoolList] = useState([]);
  const [schoolId, setSchoolId] = useState("");
  const [busType, setBusType] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [busCapacity, setBusCapacity] = useState("");
  const [busList, setBusList] = useState([]);
  useEffect(() => {
    async function fetchSchools() {
      const data = await fetchSchoolsList();
      setSchoolList(data.response.data);
    }
    fetchSchools();
  }, []);
  const handleSearchBuses = async () => {
    const data = await fetchBusesList(schoolId);
    setBusList(data);
  };
  return (
    <>
    <div className="table-header">
      <h1>Buses Information</h1>
      <select name="" id="schoolId" onChange={(e) => setSchoolId(e.target.value)}>
        {schoolList.map((ele: any, idx: number) => (
          <option value={ele._id} key={(idx + Math.random()).toString()}>{ele.name}</option>
        ))}
      </select>
      <button className="btn btn-success" onClick={handleSearchBuses}>Search Buses</button>&nbsp;&nbsp;
      <button
        className="btn btn-primary"
        onClick={() => setOpenAddModal(true)}
      >
        Add Buses
      </button>
    </div>
      <div className="overflow-table-wrapper">
        <table>
          <thead>
            <th>No.</th>
            <th>Bus Type</th>
            <th>Bus Number</th>
            <th>Bus Capacity</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {busList.map((ele: any, idx: number) => (
              <tr key={(idx + Math.random()).toString()}>
                <td>{idx + 1}</td>
                <td>{ele.busname}</td>
                <td>{ele.numberplate}</td>
                <td>{ele.capacity}</td>
                <td>
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default BusesListing
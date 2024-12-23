/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import useFetch from "../../hooks/useFetch";
import ModalLayout from "./ModalLayout";
type AddressProps = {
  Name: string;
  Description: null;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  Block: string;
  State: string;
  Country: string;
  Pincode: string;
};
const initialAddresses: AddressProps[] = [];
interface AddFormtypes {
  open?: boolean;
  handleCancel: () => void;
  handleOk: () => void;
}
const AddSchoolForm: React.FC<AddFormtypes> = ({
  open,
  handleCancel,
  handleOk,
}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      status: "",
      email: "",
      password: "",
      phoneno: "",
      users: "",
    },
    onSubmit: (values) => {
      console.log(values);
      handleOk();
    },
  });
  const [schoolName, setSchoolName] = useState("");
  const [pincode, setPincode] = useState("");
  const [addresses, setAddresses] = useState<AddressProps[]>(initialAddresses);
  const [selectedAddress, setSelectedAddress] = useState<AddressProps | null>(null);
  const { fetchData } = useFetch();
  useEffect(() => {
    if (pincode.length >= 6) {
      const url = `https://api.postalpincode.in/pincode/${pincode}`;
      fetchData(url, (data) =>{
        console.log(data);
        setAddresses(data[0]["PostOffice"]);
      });
    }
  }, [pincode]);
  useEffect(() => {
    if (addresses) {
      console.log(addresses);
    }
  }, [addresses]);
  const handleChangeAddress = (value: string) => {
    const _address: AddressProps = JSON.parse(value);
    setSelectedAddress(_address);
  }
  return (
    <ModalLayout
      title="Add School"
      handleCancel={() => {}}
      handleOk={() => {}}
      okText=""
    >
      <form>
        <div className="modal-body">
          <input
            id="school-name"
            type="text"
            placeholder="Enter School Name"
            onChange={(e) => setSchoolName(e.target.value)}
          />
          <input
            id="school-pincode"
            type="text"
            placeholder="Enter School pincode"
            onChange={(e) => setPincode(e.target.value)}
          />
          <input
            id="school-email"
            type="email"
            placeholder="Enter School email"
            onChange={(e) => setPincode(e.target.value)}
          />
          <input
            id="school-password"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPincode(e.target.value)}
          />
          <input
            id="school-phone"
            type="text"
            placeholder="Enter School phone no"
            onChange={(e) => setPincode(e.target.value)}
          />
          <select
            className="margin-top"
            style={{ width: "100%" }}
            defaultValue={selectedAddress?.Name}
            onChange={(e) => handleChangeAddress(e.target.value)}
          >
            <option value="" disabled>Select Address</option>
            {addresses.map((ele, idx) => (
              <option key={(idx + Math.random()).toString()} value={JSON.stringify(ele)}>{ele?.Name}</option>
            ))}
          </select>
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn-success">Submit</button>&nbsp;
          <button type="button" className="btn-danger" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};
export default AddSchoolForm;

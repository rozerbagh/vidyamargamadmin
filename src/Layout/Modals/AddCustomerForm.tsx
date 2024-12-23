/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import ModalLayout from "./ModalLayout";

type InputProps = {
  type: string;
  label: string;
  placeholder: string;
  valid: boolean;
  value: any | undefined;
};
type FormInputsProps = {
  [key: string]: InputProps;
};
const initialFormInputs: FormInputsProps = {
  username: {
    type: "text",
    label: "Username",
    placeholder: "Enter your username...",
    valid: false,
    value: "",
  },
  fullname: {
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name...",
    valid: false,
    value: "",
  },
  email: {
    type: "email",
    label: "Email",
    placeholder: "Enter your email...",
    valid: false,
    value: "",
  },
  password: {
    type: "password",
    label: "Password",
    placeholder: "Enter your password...",
    valid: false,
    value: "",
  },
  phoneno: {
    type: "text",
    label: "Phone Number",
    placeholder: "Enter your phone number...",
    valid: false,
    value: "",
  },
};

type AddCustomerFormProps = {
  // setValues: (key: string, value: any) => void;
  handleCancel: () => void;
  handleOk: () => void;
  open: boolean;
  handleSubmit: (
    e: React.MouseEvent<HTMLButtonElement>,
    data: {
      fullname: string;
      email: string;
      password: string;
      phoneno: string;
      role: number;
      gps_id: string;
    }
  ) => void; // Update this line
};
const AddCustomerForm: React.FC<AddCustomerFormProps> = ({
  // setValues,
  handleCancel,
  handleOk,
  open,
  handleSubmit,
}) => {
  const [formInputs, setFormInputs] =
    useState<FormInputsProps>(initialFormInputs);
  const handleUpdateInputValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputKey: string,
    newValue: any
  ) => {
    // setValues(inputKey, newValue);
    setFormInputs((prevFormInputs) => ({
      ...prevFormInputs,
      [inputKey]: {
        ...prevFormInputs[inputKey],
        value: newValue,
      },
    }));
  };
  return (
    <ModalLayout
      title="Add School"
      handleCancel={handleCancel}
      handleOk={handleOk}
      okText=""
    >
      <div className="modal-body">
        <form>
          {Object.keys(formInputs).map((key: any, index: number) => (
            <div
              key={(index + Math.random()).toString()}
              className="margin-top"
            >
              <input
                placeholder={formInputs[key].placeholder}
                type={formInputs[key].type}
                value={formInputs[key].value}
                onChange={(e) => handleUpdateInputValue(e, key, e.target.value)}
              />
            </div>
          ))}
        </form>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn-success"
          onClick={(e) =>
            handleSubmit(e, {
              fullname: formInputs.fullname.value,
              email: formInputs.email.value,
              password: formInputs.password.value,
              phoneno: formInputs.phoneno.value,
              role: 3,
              gps_id: "353201357112595",
            })
          }
        >
          Submit
        </button>
        &nbsp;
        <button type="button" className="btn-danger" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </ModalLayout>
  );
};

export default AddCustomerForm;

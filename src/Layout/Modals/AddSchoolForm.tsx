/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Select,
  Input,
  Button,
  Modal,
  Flex,
  Text,
  Box,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import {
  IconAt,
  IconMapPin,
  IconPhone,
  IconLock,
  IconSchool,
} from "@tabler/icons-react";
import useFetch from "../../hooks/useFetch";
import useAdd from "../../hooks/useAdd";
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
  open?: any;
  handleCancel: () => void;
  handleOk: () => void;
}

const AddSchoolForm: React.FC<AddFormtypes> = ({
  open,
  handleCancel,
  handleOk,
}) => {
  const { addSchools } = useAdd();
  const [schoolName, setSchoolName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [addresses, setAddresses] = useState<AddressProps[]>(initialAddresses);
  const [selectedAddress, setSelectedAddress] = useState<AddressProps | null>(
    null
  );
  const { fetchData } = useFetch();
  useEffect(() => {
    if (pincode.length >= 6) {
      const url = `https://api.postalpincode.in/pincode/${pincode}`;
      fetchData(url, (data) => {
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
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await addSchools(
      "app/school/add",
      {
        name: schoolName,
        address: {
          street: selectedAddress?.Name,
          landmark: selectedAddress?.Name,
          district: selectedAddress?.District,
          state: selectedAddress?.State,
          pincode: selectedAddress?.Pincode,
          country: selectedAddress?.Country,
        },
        email,
        password,
        phoneno: phone,
      },
      () => {}
    );
    if (result.statusCode === 200) {
      handleOk();
    }
  };
  return (
    <Modal
      opened={open}
      onClose={handleCancel}
      title="Add School"
      centered
      size="md"
    >
      <Box p={20}>
        <form onSubmit={handleSubmit}>
          <Text>School Name</Text>
          <TextInput
            id="school-name"
            type="text"
            placeholder="Enter School Name"
            onChange={(e) => setSchoolName(e.target.value)}
            mb={10}
            leftSection={<IconSchool size={16} />}
          />
          <Text>School Pincode</Text>
          <Input
            id="school-pincode"
            type="text"
            placeholder="Enter School pincode"
            onChange={(e) => setPincode(e.target.value)}
            mb={10}
            leftSection={<IconMapPin size={16} />}
          />
          <Text>School Email</Text>
          <Input
            id="school-email"
            type="email"
            placeholder="Enter School email"
            onChange={(e) => setEmail(e.target.value)}
            mb={10}
            leftSection={<IconAt size={16} />}
          />
          <Text>School Password</Text>
          <PasswordInput
            id="school-password"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            mb={10}
            leftSection={<IconLock size={16} />}
          />
          <Text>School Phone</Text>
          <Input
            id="school-phone"
            type="text"
            placeholder="Enter School phone no"
            onChange={(e) => setPhone(e.target.value)}
            mb={10}
            leftSection={<IconPhone size={16} />}
          />
          <Text>School Address</Text>
          <Select
            className="margin-top"
            style={{ width: "100%" }}
            defaultValue={selectedAddress?.Name}
            onChange={(_value, option) => handleChangeAddress(option.value)}
            data={addresses.map((ele, idx) => ({
              value: JSON.stringify(ele),
              label: ele?.Name,
            }))}
            mb={10}
          />
          <Flex justify="flex-end" gap="sm" mt={20}>
            <Button type="submit" color="green" ms={10}>
              Submit
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </Flex>
        </form>
      </Box>
    </Modal>
  );
};
export default AddSchoolForm;

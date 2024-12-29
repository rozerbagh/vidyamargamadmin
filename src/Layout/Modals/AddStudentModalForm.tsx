/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Modal, Button, TextInput, Select, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import useFetch from "../../hooks/useFetch";
import useAdd from "../../hooks/useAdd";
import { SchoolsWithBuses } from "../../Interfaces/DataInterface/data.interface";
interface AddStudentModalFormProps {
  opened: boolean;
  close: () => void;
  userId: string;
}
interface Bus {
  id: string;
  busname: string;
  schoolId: string;
  // Add other fields based on your bus structure
}
const AddStudentModalForm: React.FC<AddStudentModalFormProps> = ({
  opened,
  close,
  userId,
}) => {
  const { fetchSchoolsIdsAndNames } = useFetch();
  const { addStudent } = useAdd()
  const [schoolList, setSchoolList] = useState<SchoolsWithBuses[]>([]);
  const [busList, setBusList] = useState<Bus[]>([]);
  const form = useForm({
    initialValues: {
      fullname: "",
      class: "",
      schoolId: "",
      busId: "",
      userId: userId ?? "",
      description: "",
    },
    validate: {
      fullname: (value) =>
        value.length < 3 ? "Name must be at least 3 characters" : null,
      class: (value) =>
        value.length < 3 ? "Class must be at least 3 characters" : null,
      description: (value) =>
        value.length < 3 ? "Description must be at least 3 characters" : null,
      schoolId: (value) => (value === "" ? "School is required" : null),
      busId: (value) => (value === "" ? "Bus is required" : null),
      userId: (value) => (value === "" ? "User is required" : null),
    },
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const response = await addStudent(form.values, `app/students/create`);
    if (response.status === 200) {
      close();
      setLoading(false);
    } else {
      console.log(response.data);
      alert(response.data.message);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const schoolList: SchoolsWithBuses[] = await fetchSchoolsIdsAndNames();
      setSchoolList(schoolList);
    };
    if (opened) fetchData();
  }, [opened]);

  useEffect(() => {
    if (form.values.schoolId) {
      const buses = schoolList.find(
        (school: any) => school._id === form.values.schoolId
      )?.buses;
      if (buses) {
        form.setFieldValue("busId", "");
        setBusList(buses);
        form.setFieldValue("busId", buses[0]._id);
      }
    }
  }, [form.values.schoolId]);

  return (
    <Modal opened={opened} onClose={close} title="Add Student">
      <TextInput
        error={form.errors.name}
        label="Name"
        placeholder="Enter student name"
        value={form.values.fullname}
        onChange={(e) => form.setFieldValue("fullname", e.target.value)}
      />
      <TextInput
        error={form.errors.class}
        label="Class"
        placeholder="Enter Class"
        value={form.values.class}
        onChange={(e) => form.setFieldValue("class", e.target.value)}
      />
      <TextInput
        error={form.errors.description}
        label="Description"
        placeholder="Enter Description"
        value={form.values.description}
        onChange={(e) => form.setFieldValue("description", e.target.value)}
      />
      <Select
        error={form.errors.schoolId}
        label="Select School"
        placeholder="Select school"
        data={schoolList.map((school: any) => ({
          value: school._id,
          label: school.name,
        }))}
        onChange={(value) => form.setFieldValue("schoolId", value ?? "")}
      />
      <Select
        error={form.errors.busId}
        label="Select Bus"
        placeholder="Select bus"
        data={busList?.map((bus: any) => ({
          value: bus._id,
          label: bus.busname,
        }))}
        onChange={(value) => form.setFieldValue("busId", value ?? "")}
      />

      <Flex justify="flex-end" gap="sm" mt={20}>
        <Button type="submit" disabled={loading} color="green" ms={10} onClick={handleSubmit}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
        <Button type="button" disabled={loading} variant="outline" color="red" onClick={close}>
          {loading ? "Can't cancel submission in progress" : "Cancel"}
        </Button>
      </Flex>
    </Modal>
  );
};

export default AddStudentModalForm;

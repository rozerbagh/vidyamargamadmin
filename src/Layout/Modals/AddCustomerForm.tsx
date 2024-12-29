/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Select, Input, Button, Modal, Flex, Box, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconAt,
  IconPhone,
  IconLock,
  IconSchool,
} from "@tabler/icons-react";

type AddCustomerFormProps = {
  // setValues: (key: string, value: any) => void;
  handleCancel: () => void;
  handleOk?: () => void;
  opened: any;
  handleSubmit: (
    e: React.MouseEvent<HTMLButtonElement>,
    data: {
      username: string;
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
  opened,
  handleSubmit,
}) => {
  const form = useForm({
    initialValues: {
      username: "",
      fullname: "",
      email: "",
      password: "",
      phoneno: "",
      role: "",
      gps_id: "353201357112595",
    },
    validate: {
      fullname: (value) =>
        value.length < 3 ? "Name must be at least 3 characters" : null,
      email: (value) =>
        value.length < 3 ? "Email must be at least 3 characters" : null,
      password: (value) =>
        value.length < 3 ? "Password must be at least 3 characters" : null,
      phoneno: (value) =>
        value.length < 3 ? "Phone number must be at least 3 characters" : null,
    },
  });
  return (
    <Modal
      opened={opened}
      onClose={handleCancel}
      title="Add School"
      centered
      size="md"
    >
      <Box p={20}>
        <form>
          <Input
            mb={10}
            leftSection={<IconSchool size={16} />}
            placeholder="Enter your username..."
            value={form.values.fullname}
            type="text"
            onChange={(e) => form.setFieldValue("fullname", e.target.value)}
          />
          <Input
            mb={10}
            leftSection={<IconAt size={16} />}
            placeholder="Enter your email..."
            value={form.values.email}
            type="email"
            onChange={(e) => form.setFieldValue("email", e.target.value)}
          />
          <PasswordInput
            mb={10}
            leftSection={<IconLock size={16} />}
            placeholder="Enter your password..."
            value={form.values.password}
            type="password"
            onChange={(e) => form.setFieldValue("password", e.target.value)}
          />
          <Input
            mb={10}
            leftSection={<IconPhone size={16} />}
            placeholder="Enter your phone number..."
            value={form.values.phoneno}
            type="tel"
            onChange={(e) => form.setFieldValue("phoneno", e.target.value)}
          />
          <Select
            mb={10}
            data={[
              { value: "1", label: "Admin" },
              { value: "2", label: "School" },
              { value: "3", label: "Parent" },
              { value: "4", label: "Driver" },
            ]}
            placeholder="Select your role..."
            value={form.values.role.toString()}
            onChange={(value) => form.setFieldValue("role", (value ?? "3"))}
          />
          <Flex justify="flex-end" gap="sm" mt={20}>
            <Button type="button" onClick={(e) => handleSubmit(e, {
              username: form.values.username,
              fullname: form.values.fullname,
              email: form.values.email,
              password: form.values.password,
              phoneno: form.values.phoneno,
              role: parseInt(form.values.role),
              gps_id: "353201357112595",
            })}>
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

export default AddCustomerForm;

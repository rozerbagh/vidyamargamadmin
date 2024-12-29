import React from "react";
import { Input, Button, Modal, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconSpace,
  IconMapPin,
  IconNumber,
  IconBus,
} from "@tabler/icons-react";
import useAdd from "../../hooks/useAdd";
interface AddBusFormProps {
  opened: boolean;
  close: () => void;
  schoolId?: string;
}

const AddBusForm: React.FC<AddBusFormProps> = ({ opened, close, schoolId }) => {
  const { addBus } = useAdd();
  const form = useForm({
    initialValues: {
      busname: "",
      numberplate: "",
      capacity: "",
      gps_id: "",
      schoolId: schoolId,
    },
  });
  const handleSubmit = async (values: any) => {
    if (schoolId) {
      const result = await addBus(`app/bus/add`, values);
      if (result.status === 200) {
        close();
        window.location.reload();
      }
    }
  };
  return (
    <Modal opened={opened} onClose={close} title="Add Bus">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column" gap="md" p={20}>
          <Input
            placeholder="Bus Name"
            leftSection={<IconBus size={16} />}
            {...form.getInputProps("busname")}
            onChange={(e) => form.setFieldValue("busname", e.target.value)}
          />
          <Input
            placeholder="Bus Number Plate"
            leftSection={<IconNumber size={16} />}
            {...form.getInputProps("numberplate")}
            onChange={(e) => form.setFieldValue("numberplate", e.target.value)}
          />
          <Input
            placeholder="Bus Capacity"
            leftSection={<IconSpace size={16} />}
            {...form.getInputProps("capacity")}
            onChange={(e) => form.setFieldValue("capacity", e.target.value)}
          />
          <Input
            placeholder="Bus GPS ID"
            type="text"
            leftSection={<IconMapPin size={16} />}
            {...form.getInputProps("gps_id")}
            onChange={(e) => form.setFieldValue("gps_id", e.target.value)}
          />
        </Flex>
        <Flex justify="flex-end" gap="sm" mt={20} ps={20} pe={20}>
          <Button type="submit" color="green" ms={10}>
            Submit
          </Button>
          <Button type="button" variant="outline" onClick={close}>
            Cancel
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddBusForm;

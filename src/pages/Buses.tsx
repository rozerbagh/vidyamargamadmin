/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Title,
  Table,
  Button,
  // Checkbox,
  ActionIcon,
  Popover,
  Flex,
  Badge,
  // Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AddBusForm from "../Layout/Modals/AddBusModalForm";
import useFetch from "../hooks/useFetch";
import {
  IconEdit,
  IconUpload,
  IconTrash,
  IconAdjustments,
  IconBus,
  IconNumber,
  IconSpace,
} from "@tabler/icons-react";
type BusesProps = {
  title: string;
};
const BusesListing: React.FC<BusesProps> = ({ title }) => {
  const { schoolId } = useParams();
  const { fetchBusesList } = useFetch();
  const [opened, { open, close }] = useDisclosure(false);
  const [busList, setBusList] = useState([]);
  useEffect(() => {
    async function fetchBuses() {
      const data = await fetchBusesList(schoolId);
      setBusList(data);
    }
    fetchBuses();
  }, []);
  return (
    <>
      <Flex direction="column" gap="md" p={20}>
        <Flex justify="space-between" align="center" mt={20}>
          <Title order={2}>Buses Information</Title>
          <Button
            className="btn-primary"
            onClick={open}
          >
            Add Buses
          </Button>
        </Flex>
        <Table withColumnBorders withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>No.</Table.Th>
              <Table.Th>Bus Type</Table.Th>
              <Table.Th>Bus Number</Table.Th>
              <Table.Th>Bus Capacity</Table.Th>
              <Table.Th>GPS ID</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {busList.map((ele: any, idx: number) => (
              <Table.Tr key={(idx + Math.random()).toString()}>
                <Table.Td>{idx + 1}</Table.Td>
                <Table.Td><ActionIcon variant="light"><IconBus size={16} /></ActionIcon> &nbsp;{ele.busname}</Table.Td>
                <Table.Td><ActionIcon variant="light"><IconNumber size={16} /></ActionIcon> &nbsp;{ele.numberplate}</Table.Td>
                <Table.Td><ActionIcon variant="light"><IconSpace size={16} /></ActionIcon> &nbsp;{ele.capacity}</Table.Td>
                <Table.Td>
                  <Badge variant="light" size="lg" color="teal">{ele.gps_id}</Badge>
                </Table.Td>
                <Table.Td>
                  <Popover position="bottom" withArrow shadow="md">
                    <Popover.Target>
                      <ActionIcon variant="light">
                        <IconAdjustments size={24} />
                      </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <ActionIcon className="success-button">
                        <IconEdit size={18} />
                      </ActionIcon>
                      &nbsp;
                      <ActionIcon className="info-button">
                        <IconUpload size={18} />
                      </ActionIcon>
                      &nbsp;
                      <ActionIcon className="danger-button">
                        <IconTrash size={18} />
                      </ActionIcon>
                    </Popover.Dropdown>
                  </Popover>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Flex>
      
      
      {opened && (
        <AddBusForm
          schoolId={schoolId}
          opened={opened}
          close={close}
        />
      )}
    </>
  );
};

export default BusesListing;

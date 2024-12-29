/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Title,
  Table,
  Button,
  Checkbox,
  ActionIcon,
  Popover,
  Flex,
  Badge,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SchoolObject } from "../../Interfaces/PagesInterfaces";
import useFetch from "../../hooks/useFetch";
import AddSchoolForm from "../../Layout/Modals/AddSchoolForm";
import CircularLoader from "../../components/Loader/CircularLoader";
import {
  IconEdit,
  IconUpload,
  IconTrash,
  IconAdjustments,
  IconBus,
} from "@tabler/icons-react";
type SchoolsProps = {
  title: string;
};
const SchoolsListing: React.FC<SchoolsProps> = ({ title }) => {
  console.log("render");
  const { loading, fetchSchoolsList } = useFetch();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const [schools, setSchools] = useState<SchoolObject[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
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
        <Flex direction="column" gap="md" p={20}>
          <Flex justify="space-between" align="center" mt={20}>
            <Title order={2}>Schools Information</Title>
            <Button
              className="btn-primary"
                onClick={open}
            >
              Add Schools
            </Button>
          </Flex>
          <Table withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th />
                <Table.Th>Name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Phone No.</Table.Th>
                <Table.Th>Address</Table.Th>
                <Table.Th>Buses</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {schools.map((element, idx) => (
                <Table.Tr
                  key={element.name}
                  bg={
                    selectedRows.includes(idx)
                      ? "var(--mantine-color-blue-light)"
                      : undefined
                  }
                >
                  <Table.Td>
                    <Checkbox
                      aria-label="Select row"
                      checked={selectedRows.includes(idx)}
                      onChange={(event) =>
                        setSelectedRows(
                          event.currentTarget.checked
                            ? [...selectedRows, idx]
                            : selectedRows.filter(
                                (position) => position !== idx
                              )
                        )
                      }
                    />
                  </Table.Td>
                  <Table.Td>{element.name}</Table.Td>
                  <Table.Td>{element.email}</Table.Td>
                  <Table.Td>{element.phoneno}</Table.Td>
                  <Table.Td>
                    <Tooltip
                      position="top-start"
                      label={`${element.address.street},${element.address.landmark},${element.address.district},${element.address.pincode},${element.address.state}`}
                    >
                      <p>
                        {element.address.street},&nbsp;
                        {element.address.landmark}
                      </p>
                    </Tooltip>
                  </Table.Td>
                  <Table.Td>
                    <Tooltip label="View Buses">
                      <ActionIcon
                        onClick={() => navigate(`/buses/${element._id}`)}
                      >
                        <IconBus size={24} />
                      </ActionIcon>
                    </Tooltip>
                  </Table.Td>
                  <Table.Td>
                    {element.status === 1 ? (
                      <Badge color="blue">Active</Badge>
                    ) : (
                      <Badge color="red">InActive</Badge>
                    )}
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
          {opened ? (
            <AddSchoolForm
              open={opened}
              handleCancel={close}
              handleOk={close}
            />
          ) : null}
        </Flex>
      )}
    </>
  );
};

export default SchoolsListing;

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
  // Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import AddCustomerForm from "../../Layout/Modals/AddCustomerForm";
import CircularLoader from "../../components/Loader/CircularLoader";
import useAdd from "../../hooks/useAdd";
import useFetch from "../../hooks/useFetch";
import { UserInterface } from "../../Interfaces/ReduxInterface/ReduxInterface";
import { storeUsers } from "../../redux/userSlice";
import {
  IconEdit,
  IconUpload,
  IconTrash,
  IconAdjustments,
  IconUsersPlus,
} from "@tabler/icons-react";

type UsersProps = {
  title: string;
};
// type ResponseProps = {
//   data: object | undefined;
//   error: object | undefined;
// };
// type UserValues = {
//   username: string;
//   fullname: string;
//   email: string;
//   password: string;
//   phoneno: string;
// };

// const UserRoleEnum = Object.freeze({
//   ADMIN: 1,
//   MODERATOR: 2,
//   USER: 3,
// });

const Users: React.FC<UsersProps> = ({ title }) => {
  const navigate = useNavigate();
  const usersData = useAppSelector((state) => state.users.usersdata);
  const dispatch = useAppDispatch();
  const { addUser } = useAdd();
  const { fetchUsersList, loading } = useFetch();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleAdduser = (
    e: React.MouseEvent<HTMLButtonElement>,
    data: {
      fullname: string;
      email: string;
      password: string;
      phoneno: string;
      role: number;
      gps_id: string;
    }
  ) => {
    e.preventDefault();
    const url = "user/signup";
    addUser({ ...data, role: 3 }, url, (data) => data).then((res) => {
      fetchData();
      close()
    });
  };
  const fetchData = async () => {
    try {
      const result = await fetchUsersList();
      dispatch(storeUsers(result.response.data));
      console.log(result.response.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData(); // Call the async function when the component mounts
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
            <Title order={2}>Users List</Title>
            <Button className="btn-primary" onClick={open}>
              Add User
            </Button>
          </Flex>
          <Table withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th />
                <Table.Th>Name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Phone No</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Students</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {usersData.map((element: UserInterface, idx) => {
                const getUserRoleBadge = (role: number) => { 
                  switch (role) {
                    case 1:
                      return <Badge variant="light" color="blue">ADMIN</Badge>;
                    case 2:
                      return <Badge variant="light" color="green">MODERATOR</Badge>;
                    case 3:
                      return <Badge variant="light" color="red">PARENT</Badge>;
                    case 4:
                      return <Badge variant="light" color="teal">DRIVER</Badge>;
                    default:
                      return <Badge variant="light" color="red">USER</Badge>;
                  }
                };
                return (
                  <Table.Tr
                    key={element.fullname}
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
                    <Table.Td>{element.fullname}</Table.Td>
                    <Table.Td>{element.email}</Table.Td>
                    <Table.Td>{element.phone}</Table.Td>
                    <Table.Td>
                      {element.status === 1 ? (
                        <Badge color="blue">Active</Badge>
                      ) : (
                        <Badge color="red">InActive</Badge>
                      )}
                    </Table.Td>
                    <Table.Td>{getUserRoleBadge(element.role)}</Table.Td>
                    <Table.Td>
                      <ActionIcon variant="outline" color="blue" onClick={() => navigate(`/students/${element.fullname}/${element._id}`)}>
                        <IconUsersPlus size={24} />
                      </ActionIcon>
                    </Table.Td>
                    <Table.Td>
                      <Popover position="bottom" withArrow shadow="md">
                        <Popover.Target>
                          <ActionIcon variant="light">
                            <IconAdjustments size={24} />
                          </ActionIcon>
                        </Popover.Target>
                        <Popover.Dropdown>
                          <ActionIcon onClick={() => navigate(`/users/${element._id}`)}>
                            <IconEdit size={18} />
                          </ActionIcon>
                          &nbsp;
                          <ActionIcon>
                            <IconUpload size={18} />
                          </ActionIcon>
                          &nbsp;
                          <ActionIcon>
                            <IconTrash size={18} />
                          </ActionIcon>
                        </Popover.Dropdown>
                      </Popover>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
          {opened ? (
                <AddCustomerForm
                  opened={opened}
                  handleCancel={close}
                  handleOk={close}
                  handleSubmit={handleAdduser}
                />
              ) : null}
        </Flex>
      )}
    </>
  );
};
export default Users;

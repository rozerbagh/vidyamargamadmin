/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
import AddStudentForm from "../Layout/Modals/AddStudentModalForm";
import useFetch from "../hooks/useFetch";
import {
  IconEdit,
  IconUpload,
  IconTrash,
  IconAdjustments,
  IconBus,
  IconSchool,
} from "@tabler/icons-react";
type StudnetsProps = {
  title: string;
};
const StudentListing: React.FC<StudnetsProps> = ({ title }) => {
  const { parentId, fullname } = useParams();
  const {fetchStudentsList } = useFetch();
  const [opened, { open, close }] = useDisclosure(false);
  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    async function fetchStudents(parentId: string | undefined) {
      const data = await fetchStudentsList(parentId);
      setStudentList(data);
    }
    if (parentId) {
      fetchStudents(parentId);
    }
  }, [parentId]);
  return (
    <>
      <Flex direction="column" gap="md" p={20}>
        <Flex justify="space-between" align="center" mt={20}>
          <Title order={2}>
            {fullname} / {title}
          </Title>
          <Button className="btn-primary" onClick={open}>
            Add Students
          </Button>
        </Flex>
        <Table withColumnBorders withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>No.</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Class</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>
                <Flex align="center" gap="xs">
                  <p>School{" "}</p>
                  <IconSchool size={24} stroke={1.5} />
                </Flex>
              </Table.Th>
              <Table.Th>
                <Flex align="center" gap="xs">
                  <p>Bus{" "}</p>
                  <IconBus size={24} stroke={1.5} />
                </Flex>
              </Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {studentList.map((student: any, index: number) => (
              <Table.Tr key={(index + Math.random()).toString()}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{student.fullname}</Table.Td>
                <Table.Td>{student.class}</Table.Td>
                <Table.Td>{student.description}</Table.Td>
                <Table.Td>
                  <Badge color="blue">
                    <Link to={`/schools/${student.schoolId._id}`}>
                      {student.schoolId.name}
                    </Link>
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Link to={`/buses/${student.busId._id}`}>
                    {student.busId.busname} - {student.busId.numberplate}
                  </Link>
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
        <AddStudentForm opened={opened} close={close} userId={parentId ?? ""}/>
      )}
    </>
  );
};

export default StudentListing;

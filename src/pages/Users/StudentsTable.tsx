/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Group,
  Flex,
  Table,
  Text,
  Button,
  Title,
  MultiSelect,
  Badge,
} from "@mantine/core";
import { ParentStudentsTableProps } from "../../Interfaces/ComponentInterface";
import useUpdate from "../../hooks/useUpdate";
import useFetch from "../../hooks/useFetch";

const ParentStudentsTable: React.FC<{
  students: ParentStudentsTableProps[] | null;
  id?: string;
}> = ({ students, id }) => {
  const { updateUserDetails } = useUpdate();
  const {fetchStudentsList} = useFetch()
  const [opened, setOpened] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[] | null>(null);
  const [studentsData, setStudentsData] = useState<any[] | null>(null);
  const schoolsRef = useRef<any[] | null>(null);
  const busesRef = useRef<any[] | null>(null);
  useEffect(() => {
    const fetchStudents = async () => {
      const studentsList = await fetchStudentsList(id);
      const _selecStudents = studentsList?.map((ele: any) => ({
        value: ele._id,
        label: ele.fullname,
      }))
      setStudentsData(_selecStudents);
    }
    if (students) {
      fetchStudents();
    }
  }, [students]);

  const handleAddStudent = async () => {
    if (selectedStudents && id) {
      schoolsRef.current = students?.map((student: any) => student.schoolDetails._id) || [];
      busesRef.current = students?.map((student: any) => student.busDetails._id) || [];
      const updateResult = await updateUserDetails(`user/update/${id}`, {
        students: selectedStudents,
        schools: schoolsRef.current,
        buses: busesRef.current,
      });
      if (updateResult) {
        setOpened(false);
      }
    }
  };
  const rows = students?.map((item) => (
    <Table.Tr key={item.fullname}>
      <Table.Td>
        <Group gap="sm">
          <Avatar
            size={40}
            src={
              "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
            }
            radius={40}
          />
          <div>
            <Text fz="sm" fw={500}>
              {item.fullname}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.class}
            </Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        <Text>{item.schoolDetails?.name}</Text>
      </Table.Td>
      <Table.Td>{item.busDetails?.busname}</Table.Td>
      <Table.Td>
        <Badge>{item.class}</Badge>
      </Table.Td>
      <Table.Td>{item.description}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Flex direction="column" gap="md">
      <Flex direction="row" gap="md" justify="space-between">
        <Title order={2}>Students</Title>
        <Button color="blue" onClick={() => setOpened(true)} disabled>
          {students && students?.length === 0
            ? "Add Students"
            : "Update Students"}
        </Button>
      </Flex>
      {opened ? (
        <Flex direction="row" gap="md">
          <MultiSelect
          multiple
            w="100%"
            data={studentsData ?? []}
            placeholder="Select a student"
            onChange={(value) => {
              console.log(value);
              setSelectedStudents(value)
            }}
          />
          <Button color="teal" onClick={handleAddStudent}>
            Add
          </Button>
        </Flex>
      ) : null}
      <Table>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Student</Table.Th>
              <Table.Th>School</Table.Th>
              <Table.Th>Bus</Table.Th>
              <Table.Th>Class</Table.Th>
              <Table.Th>Description</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table>
    </Flex>
  );
};
export default ParentStudentsTable;

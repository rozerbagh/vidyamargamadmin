/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IconAt, IconPhoneCall } from "@tabler/icons-react";
import { Avatar, Flex, Group, Text, Loader, Title } from "@mantine/core";
import classes from "./UserInfoIcons.module.css";
import useDetailsFetch from "../../hooks/useDetailsFetch";
import {
  UserDetailsInterface,
} from "../../Interfaces/ComponentInterface";
import ParentStudentsTable from "./StudentsTable";
const RoleLabel: React.FC<{ role: number }> = ({ role }) => {
  const roleLabel =
    role === 1
      ? "Admin"
      : role === 2
      ? "School"
      : role === 3
      ? "Parent"
      : "Driver";

  return (
    <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
      {roleLabel}
    </Text>
  );
};
const UsersDetails = () => {
  const { id } = useParams();
  const { loading, fetchUserDetails } = useDetailsFetch();
  const [user, setUser] = useState<UserDetailsInterface | null>(null);
  const [students, setStudents] = useState<any[] | null>(null);
  useEffect(() => {
    if (id) {
      fetchUserDetails(`user/get/${id}`, setUser);
    }
  }, [id]);

  useEffect(() => {
    if (user && user?.role === 3) {
      const students = user?.students.map((student: any) => ({
        ...student,
        schoolDetails: user?.schools.find(
          (school: any) => school._id === student.schoolId
        ),
        busDetails: user?.buses.find((bus: any) => bus._id === student.busId),
      }));
      setStudents(students);
    }
  }, [user]);

  return loading ? (
    <Flex justify="center" align="center" h="100%">
      <Loader />
    </Flex>
  ) : (
    <Flex m={20} direction="column" gap="md">
      <Title order={1} c="darkblue" variant="outline">
        {user?.fullname}
      </Title>
      <Group wrap="nowrap">
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          size={94}
          radius="md"
        />
        <div>
          <RoleLabel role={user?.role ?? 0} />

          <Text fz="lg" fw={500} className={classes.name}>
            {user?.fullname}
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size={16} className={classes.icon} color="blue"/>
              {user?.email ? <a href={`mailto:${user?.email}`}>
                <Text fz="sm" c="blue">
                  {user?.email}
                </Text>
            </a> : <Text fz="xs" c="blue">
              N/A
            </Text>}
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconPhoneCall stroke={1.5} size={16} className={classes.icon} color="blue"/>
            {user?.phoneno ? <a href={`tel:${user?.phoneno}`}>
              <Text fz="sm" c="blue">
                {user?.phoneno}
              </Text>
            </a> : <Text fz="xs" c="blue">
              N/A
            </Text>}
          </Group>
        </div>
      </Group>
      <Flex direction="column" gap="md">
        {students ? (
          <ParentStudentsTable students={students} id={id} />
        ) : (
          <Flex justify="center" align="center" h="100%">
            <Title order={2} c="dimmed">
              No students found
            </Title>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default UsersDetails;

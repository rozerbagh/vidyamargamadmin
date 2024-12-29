import { useState } from "react";
import { Title } from "@mantine/core";
import useUpdate from "../../hooks/useUpdate";
const UpdateUser: React.FC = () => {
  const { updateUserDetails } = useUpdate();
  return (
    <div>
      <Title>Update User</Title>
    </div>
  );
};

export default UpdateUser;

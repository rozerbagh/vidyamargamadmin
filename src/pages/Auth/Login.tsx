import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import useStorage from "../../hooks/useStorage";
import useAuthenticate from "../../hooks/useAuthenticate";

const LoginPage: React.FC = () => {
  const { setCookie } = useStorage();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuthenticate();
  const handleSubmit = async () => {
    const responseData = await handleLogin(
      emailRef.current?.value ?? "",
      passwordRef.current?.value ?? ""
    );
    console.log(responseData);
    setCookie("token", responseData.response.data?.token);
    setCookie("user", responseData.response.data);
    navigate("/");
  };
  return (
    <Container size={420} mt={80}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required ref={emailRef} />
        <PasswordInput
          ref={passwordRef}
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button type="submit" fullWidth mt="xl" onClick={handleSubmit} disabled={loading}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;

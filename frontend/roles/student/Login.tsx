import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  IconButton,
  Icon,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { user_login } from "@/api/user/user-login.api";

interface LoginProps {
  onLogin: (role: string, accessToken: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validCredentials = {
    admin: { email: "winaye@email.com", password: "Win123!!" },
    teacher: { email: "zarchi@email.com", password: "Zar123!!" },
    student: { email: "ykl@email.com", password: "Ykl123!!" },
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    const loginData = {
      email: email,
      password: password,
    };
    console.log(loginData);
    user_login<{ accessToken: string; role: string }>(loginData)
      .then((response) => {
        if (response) {
          console.log("Login successful:", response);

          if (response.role == "admin") {
            onLogin("admin", response.accessToken);
          } else if (response.role == "teacher") {
            onLogin("teacher", response.accessToken);
          } else if (response.role == "student") {
            onLogin("student", response.accessToken);
          }
        } else {
          console.log("Login failed.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const checkPasswordStrength = (password: string) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const weakPasswordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (strongPasswordRegex.test(password)) {
      setPasswordStrength("Strong");
    } else if (weakPasswordRegex.test(password)) {
      setPasswordStrength("Weak");
    } else {
      setPasswordStrength("Very Weak");
    }
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
    // checkPasswordStrength(password);
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center" p={5}>
      <Text
        fontSize="4xl"
        fontWeight="bold"
        mb={2}
        mt={-6}
        color="primary.500"
        style={{
          textShadowColor: "rgba(0, 0, 0, 0.2)",
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 4,
        }}
      >
        Login
      </Text>

      <VStack space={3} width="100%" maxW="300px">
        <Text fontSize="lg">Email</Text>
        <Input
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          size="lg"
        />

        <Text fontSize="lg">Password</Text>
        <Input
          placeholder="Enter your password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!showPassword}
          size="lg"
          InputRightElement={
            <IconButton
              icon={
                <AntDesign
                  name={showPassword ? "eye" : "eyeo"}
                  size={20}
                  color="gray.500"
                />
              }
              onPress={() => setShowPassword(!showPassword)}
              _icon={{ color: "gray.500" }}
              _pressed={{ bg: "transparent" }}
            />
          }
        />

        <Text
          fontSize="md"
          color={
            passwordStrength === "Strong"
              ? "green.500"
              : passwordStrength === "Weak"
              ? "yellow.500"
              : "red.500"
          }
        ></Text>

        {errorMessage && <Text color="red.500">{errorMessage}</Text>}

        <Button onPress={handleLogin} mt={4} size="lg">
          Login
        </Button>

        <Button
          variant="outline"
          colorScheme="coolGray"
          onPress={() => onLogin("guest", "")}
          mt={2}
          size="lg"
        >
          View as Guest
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;

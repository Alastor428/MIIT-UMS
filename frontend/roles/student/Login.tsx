import React, { useState } from "react";
import { Box, Button, Input, Text, VStack, IconButton } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { user_login } from "@/api/user/user-login.api";

// Define the props type once
interface LoginProps {
  onLogin: (role: string) => void; // Passing role after successful login
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

    user_login(loginData)
      .then((response) => {
        if (response) {
          console.log("Login successful:", response);
          onLogin(response.role); // 👈 this updates the role in App.tsx!
        } else {
          console.log("Login failed.");
          setErrorMessage("Incorrect email or password.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Login error. Try again.");
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
        MIIT UMS
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

        {errorMessage && <Text color="red.500">{errorMessage}</Text>}

        <Button onPress={handleLogin} mt={4} size="lg">
          Login
        </Button>

        <Button
          variant="outline"
          colorScheme="coolGray"
          onPress={() => onLogin("guest")}
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

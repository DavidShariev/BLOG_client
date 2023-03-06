import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { Navigate } from "react-router-dom";
import { fetchRegistration } from "../../redux/slices/userSlice/userSlice";

export default function Registration() {
    const [showPassword, setShowPassword] = useState(false);
    const user = useAppSelector((state) => state.user.data);
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const signUpClickHandler = () => {
        dispatch(
            fetchRegistration({
                username,
                password,
                email,
            })
        );
    };

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            {user ? <Navigate to="/"></Navigate> : null}
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Зарегестрируйтесь
                    </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        и используйте весь функционал ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="username" isRequired>
                            <FormLabel>Имя</FormLabel>
                            <Input
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                type="string"
                            />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Почтовый адрес</FormLabel>
                            <Input
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                type="email"
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Пароль</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"ghost"}
                                        onClick={() =>
                                            setShowPassword(
                                                (showPassword) => !showPassword
                                            )
                                        }
                                    >
                                        {showPassword ? (
                                            <ViewIcon />
                                        ) : (
                                            <ViewOffIcon />
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                                onClick={signUpClickHandler}
                            >
                                Зарегестироваться
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={"center"}>
                                Уже есть аккаунт?{" "}
                                <Link href="/login" color={"blue.400"}>
                                    Войти
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

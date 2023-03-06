import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchLogin } from "../../redux/slices/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export default function Login() {
    const user = useAppSelector((state) => state.user.data);
    const dispatch = useAppDispatch();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const loginClickHandler = async () => {
        const res = await dispatch(
            fetchLogin({
                email,
                password,
            })
        );
        console.log(res);
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
                    <Heading fontSize={"4xl"}>Авторизуйтесь</Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        и используйте весь{" "}
                        <Link color={"blue.400"}>функционал</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Почтовый адрес</FormLabel>
                            <Input
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                type="email"
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Пароль</FormLabel>
                            <Input
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                type="password"
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: "column", sm: "row" }}
                                align={"start"}
                                justify={"space-between"}
                            >
                                <Checkbox>Запомнить меня</Checkbox>
                                <Link color={"blue.400"}>Забыли пароль?</Link>
                            </Stack>
                            <Button
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                                onClick={loginClickHandler}
                            >
                                Войти
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

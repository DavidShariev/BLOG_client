import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { SmallCloseIcon, ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { useAppSelector } from "../../redux/store";
import { useEffect, useRef, useState } from "react";
import { axiosMain } from "../../axios";
import { Link } from "react-router-dom";

export default function Profile(): JSX.Element {
    const [showPassword, setShowPassword] = useState(false);
    const user = useAppSelector((state) => state.user.data);
    const [avatarURL, setAvatarURL] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setUsername(user?.username as string);
        setEmail(user?.email as string);
        setAvatarURL(user?.avatarURL as string);
    }, [user]);

    const changeImageHandler = async (event: any) => {
        try {
            const formData = new FormData();
            const file = event?.target.files[0];
            formData.append("image", file);

            const { data } = await axiosMain("/upload", {
                method: "POST",
                data: formData,
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            setAvatarURL("http://localhost:4444" + data.url);
        } catch (error: any) {
            console.log(error.message);
            alert("Ошибка загрузки файла!");
        }
    };

    const submitHandler = async () => {
        const { data } = await axiosMain("/user/update", {
            method: "POST",
            data: {
                password: password ? password : "",
                email,
                username,
                avatarURL,
            },
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });

        console.log(data);
    };

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.100", "gray.800")}
        >
            <Stack
                spacing={4}
                w={"full"}
                maxW={"md"}
                bg={useColorModeValue("white", "gray.700")}
                rounded={"xl"}
                boxShadow={"lg"}
                p={6}
                my={12}
            >
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                    Настройки профиля
                </Heading>
                <FormControl id="userName">
                    <FormLabel>Иконка профиля</FormLabel>
                    <Stack direction={["column", "row"]} spacing={6}>
                        <Center>
                            <Avatar
                                size="xl"
                                src={
                                    avatarURL
                                        ? avatarURL
                                        : "https://bit.ly/sage-adebayo"
                                }
                            >
                                <AvatarBadge
                                    as={IconButton}
                                    size="sm"
                                    rounded="full"
                                    top="-10px"
                                    colorScheme="red"
                                    aria-label="remove Image"
                                    onClick={() => {
                                        setAvatarURL("");
                                    }}
                                    icon={<SmallCloseIcon />}
                                />
                            </Avatar>
                        </Center>
                        <Center w="full">
                            <Button
                                onClick={() => {
                                    inputRef.current?.click();
                                }}
                                w="full"
                            >
                                Поменять иконку
                            </Button>
                        </Center>

                        <input
                            ref={inputRef}
                            type="file"
                            onChange={changeImageHandler}
                            hidden
                        />
                    </Stack>
                </FormControl>
                <FormControl id="userName" isRequired>
                    <FormLabel>Имя</FormLabel>
                    <Input
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        _placeholder={{ color: "gray.500" }}
                        type="text"
                    />
                </FormControl>
                <FormControl id="email" isRequired>
                    <FormLabel>Почта</FormLabel>
                    <Input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        _placeholder={{ color: "gray.500" }}
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
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Stack spacing={6} direction={["column", "row"]}>
                    <Link to="/">
                        <Button
                            bg={"red.400"}
                            color={"white"}
                            w="full"
                            _hover={{
                                bg: "red.500",
                            }}
                        >
                            Закрыть
                        </Button>
                    </Link>
                    <Button
                        bg={"blue.400"}
                        color={"white"}
                        w="full"
                        _hover={{
                            bg: "blue.500",
                        }}
                        onClick={submitHandler}
                    >
                        Отправить
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}

import { ReactNode, useState } from "react";
import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    Input,
    HStack,
    Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HiOutlineSearch } from "react-icons/hi";
import { removeUserData } from "../../redux/slices/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Link } from "react-router-dom";

const NavLink = ({ children }: { children: ReactNode }) => (
    <Text
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
            textDecoration: "none",
            bg: useColorModeValue("gray.200", "gray.700"),
        }}
    ></Text>
);

export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [searchValue, setSearchValue] = useState("");

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    return (
        <>
            <Box
                position="fixed"
                top="0"
                left="0"
                right="0"
                zIndex={100}
                bg={useColorModeValue("gray.100", "gray.900")}
                px={4}
            >
                <Flex
                    h={16}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    paddingLeft={"60"}
                >
                    <Flex>
                        <Input
                            value={searchValue}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                            placeholder="Найти"
                        ></Input>
                        <Link to={`/users/${searchValue}`}>
                            <Button ml={"1rem"}>
                                <HiOutlineSearch />
                            </Button>
                        </Link>
                    </Flex>

                    <Flex
                        alignItems={"center"}
                        position="relative"
                        zIndex={999}
                    >
                        <Stack direction={"row"} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === "light" ? (
                                    <MoonIcon />
                                ) : (
                                    <SunIcon />
                                )}
                            </Button>

                            {user.data ? (
                                <>
                                    <Menu>
                                        <MenuButton
                                            as={Button}
                                            rounded={"full"}
                                            variant={"link"}
                                            cursor={"pointer"}
                                            minW={0}
                                        >
                                            <Avatar
                                                size={"sm"}
                                                src={user.data?.avatarURL}
                                            />
                                        </MenuButton>
                                        <MenuList alignItems={"center"}>
                                            <br />
                                            <Center>
                                                <Avatar
                                                    size={"2xl"}
                                                    src={user.data?.avatarURL}
                                                />
                                            </Center>
                                            <br />
                                            <Center>
                                                <p></p>
                                            </Center>
                                            <br />
                                            <MenuDivider />
                                            <Link to="/profile">
                                                <MenuItem>Профиль</MenuItem>
                                            </Link>
                                            <MenuItem
                                                onClick={() => {
                                                    dispatch(removeUserData());
                                                    localStorage.removeItem(
                                                        "token"
                                                    );
                                                }}
                                            >
                                                Выйти
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <HStack>
                                        <Link
                                            style={{ textDecoration: "none" }}
                                            to="/login"
                                        >
                                            <Button colorScheme={"blue"}>
                                                Войти
                                            </Button>
                                        </Link>

                                        <Link
                                            style={{ textDecoration: "none" }}
                                            to="/registration"
                                        >
                                            <Button colorScheme={"blue"}>
                                                Зарегестрироваться
                                            </Button>
                                        </Link>
                                    </HStack>
                                </>
                            )}
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}

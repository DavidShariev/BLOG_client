import React, { ReactNode } from "react";
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Button,
    useColorMode,
    Link,
} from "@chakra-ui/react";
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
    FiMessageCircle,
} from "react-icons/fi";

import { IconType } from "react-icons";
import { ReactText } from "react";
import { Outlet, matchRoutes, useLocation } from "react-router-dom";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { removeUserData } from "../../redux/slices/userSlice/userSlice";

interface LinkItemProps {
    name: string;
    icon: IconType;
    url: string;
}
const LinkItems: Array<LinkItemProps> = [
    { name: "Home", icon: FiHome, url: "/" },
    { name: "Messages", icon: FiMessageCircle, url: "/messages" },
    { name: "Posts", icon: FiCompass, url: "/posts" },
    { name: "Друзья", icon: FiStar, url: "/friends" },
    { name: "Settings", icon: FiSettings, url: "/settings" },
];

interface SidebarProps extends BoxProps {
    onClose: () => void;
}
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    MyBlog
                </Text>
                <CloseButton
                    display={{ base: "flex", md: "none" }}
                    onClick={onClose}
                />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem url={link.url} key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

const Main = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.800")}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: "none", md: "block" }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                <Outlet />
            </Box>
        </Box>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.data);
    const location = useLocation();
    const routes = [{ path: "/posts/:id" }, { path: "/posts/" }];
    const route = matchRoutes(routes, location)?.[0].route.path;

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent={{ base: "space-between", md: "flex-end" }}
            {...rest}
            position="relative"
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: "flex", md: "none" }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
            >
                Logo
            </Text>

            {route === "/posts/:id" ? (
                <Link href="/posts/">
                    <Button
                        alignSelf={"center"}
                        position="absolute"
                        left="20px"
                        bottom="20px"
                    >
                        Назад
                    </Button>
                </Link>
            ) : null}

            <HStack spacing={{ base: "0", md: "6" }}>
                <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
                <IconButton
                    size="md"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiBell />}
                />
                <Flex alignItems={"center"}>
                    {user ? (
                        <Menu>
                            <MenuButton
                                py={2}
                                transition="all 0.3s"
                                _focus={{ boxShadow: "none" }}
                            >
                                <HStack>
                                    <Avatar size={"sm"} src={user?.avatarURL} />
                                    <VStack
                                        display={{ base: "none", md: "flex" }}
                                        alignItems="flex-start"
                                        spacing="1px"
                                        ml="2"
                                    >
                                        <Text fontSize="sm">
                                            {user?.username}
                                        </Text>
                                        <Text fontSize="xs" color="gray.600">
                                            Admin
                                        </Text>
                                    </VStack>
                                    <Box
                                        display={{ base: "none", md: "flex" }}
                                        p={1}
                                    >
                                        <FiChevronDown />
                                    </Box>
                                </HStack>
                            </MenuButton>
                            {
                                <MenuList>
                                    <Link display={"block"} href="/profile">
                                        <MenuItem>Профиль</MenuItem>
                                    </Link>

                                    <MenuItem>Настройки</MenuItem>
                                    <MenuDivider />
                                    <MenuItem
                                        onClick={() => {
                                            dispatch(removeUserData());
                                        }}
                                    >
                                        Выйти
                                    </MenuItem>
                                </MenuList>
                            }
                        </Menu>
                    ) : (
                        <HStack
                            flex={{ base: 1, md: 0 }}
                            justify={"flex-end"}
                            direction={"row"}
                            spacing={6}
                        >
                            <Button
                                as={"a"}
                                fontSize={"sm"}
                                fontWeight={400}
                                variant={"link"}
                                href={"/login"}
                            >
                                Sign In
                            </Button>
                            <Button
                                as={"a"}
                                display={{ base: "none", md: "inline-flex" }}
                                fontSize={"sm"}
                                fontWeight={600}
                                color={"white"}
                                bg={"pink.400"}
                                href={"/registration"}
                                _hover={{
                                    bg: "pink.300",
                                }}
                            >
                                Sign Up
                            </Button>
                        </HStack>
                    )}
                </Flex>
            </HStack>
        </Flex>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    url?: string;
    children: ReactText;
}
const NavItem = ({ icon, children, url, ...rest }: NavItemProps) => {
    return (
        <Link href={url ? url : ""} style={{ textDecoration: "none" }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: "cyan.400",
                    color: "white",
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: "white",
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

export default Main;

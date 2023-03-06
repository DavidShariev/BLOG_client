import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

const MainLayout = () => {
    return (
        <Box>
            <Sidebar />
            <Header />
            <Box ml={{ base: 0, md: 60 }} p="5" pt="80px">
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;

import { Box, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosMain } from "../../axios";
import { IUserData } from "../../redux/slices/userSlice/types";
import User from "./User/User";

const Users = () => {
    const [users, setUsers] = useState([]);
    const location = useLocation();
    const searchValue = location.pathname.split("/").slice(-1).toString();
    console.log(searchValue);

    useEffect(() => {
        axiosMain(`/users/${searchValue}`, {
            headers: {
                Authorization: localStorage.token,
            },
        }).then((res: any) => {
            setUsers(res.data.data);
        });
    }, [searchValue]);

    return (
        <Box>
            <SimpleGrid
                mx={"auto"}
                minChildWidth="330px"
                spacing="20px"
                spacingY={"0px"}
            >
                {users.map((data: IUserData) => {
                    return <User data={data} key={data._id} />;
                })}
            </SimpleGrid>
        </Box>
    );
};

export default Users;

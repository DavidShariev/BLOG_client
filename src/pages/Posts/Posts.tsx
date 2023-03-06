import {
    SimpleGrid,
    HStack,
    useColorModeValue,
    Box,
    Heading,
    Text,
    Button,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Post from "../../components/Post/Post";
import {
    fetchPosts,
    fetchPostsByTag,
} from "../../redux/slices/postSlice/postsSlice";
import { IPost } from "../../redux/slices/postSlice/types";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useState } from "react";
import { axiosMain } from "../../axios";

const Posts = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector((state) => state.posts.pull);
    const tags = useAppSelector((state) => state.posts.tags);
    const user = useAppSelector((state) => state.user.data);
    const [activeTag, setActiveTag] = useState("all");

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    return (
        <>
            <Box
                p={"10px 20px 20px"}
                borderRadius="8px"
                bg={useColorModeValue("white", "gray.900")}
                mb="1rem"
            >
                <Heading>Posts</Heading>

                <HStack
                    overflow={"hidden"}
                    maxW={"100%"}
                    my={"1rem"}
                    spacing={"20px"}
                >
                    {tags?.map((tag: string, i: number) => {
                        return (
                            <Button
                                onClick={() => {
                                    setActiveTag(tag);
                                    dispatch(fetchPostsByTag(tag));
                                }}
                                key={i}
                                fontWeight={activeTag === tag ? 600 : 400}
                                variant={"ghost"}
                                colorScheme={
                                    activeTag === tag ? "blue" : undefined
                                }
                            >
                                {tag}
                            </Button>
                        );
                    })}
                </HStack>

                {user ? (
                    <HStack>
                        <Link to="/posts/add">
                            <Button
                                /* flex={1} */
                                px={4}
                                fontSize={"sm"}
                                rounded={"full"}
                                bg={"blue.400"}
                                color={"white"}
                                boxShadow={
                                    "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                                }
                                _hover={{
                                    bg: "blue.500",
                                }}
                                _focus={{
                                    bg: "blue.500",
                                }}
                            >
                                Написать статью
                            </Button>
                        </Link>
                    </HStack>
                ) : null}
            </Box>
            <SimpleGrid
                mx={"auto"}
                minChildWidth="330px"
                spacing="40px"
                spacingY={"0px"}
            >
                {posts?.map((post: IPost, i: number) => {
                    return <Post mode="small" data={post} key={post._id} />;
                })}
            </SimpleGrid>
        </>
    );
};

export default Posts;

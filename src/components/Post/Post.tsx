import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    Image,
    SpaceProps,
    Tag,
    HStack,
    Button,
    Link,
} from "@chakra-ui/react";
import { IPost } from "../../redux/slices/postSlice/types";
import { useEffect, useState } from "react";
import { axiosMain } from "../../axios";
import { useParams } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useAppSelector } from "../../redux/store";

interface IBlogTags {
    tags?: Array<string>;
    marginTop?: SpaceProps["marginTop"];
}
const BlogTags: React.FC<IBlogTags> = (props) => {
    return (
        <HStack spacing={2} marginTop={props.marginTop}>
            {props?.tags?.map((tag) => {
                return (
                    <Tag
                        size={"md"}
                        variant="solid"
                        colorScheme="orange"
                        key={tag}
                    >
                        {tag}
                    </Tag>
                );
            })}
        </HStack>
    );
};

interface IPostProps {
    data?: IPost;
    mode: "full" | "small";
}
export default function Post({ data, mode }: IPostProps) {
    const { id } = useParams();
    const [postData, setPostData] = useState(data);
    const createAt = new Date(
        postData?.createdAt as string
    ).toLocaleDateString();
    console.log(data);
    const user = useAppSelector((state) => state.user.data);

    useEffect(() => {
        if (!data) {
            axiosMain(`/posts/${id}`).then((res) => {
                console.log(res);
                setPostData(res.data.postData);
            });
        }
    }, []);

    return (
        <Center
            id={`post_${postData?._id}`}
            mb={5}
            fontSize={mode === "full" ? "1.5em" : "1em"}
        >
            <Box
                w={"full"}
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                rounded={"md"}
                p={6}
                overflow={"hidden"}
            >
                <Box
                    maxH="80vh"
                    bg={"gray.100"}
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos={"relative"}
                    overflow={"hidden"}
                >
                    {user?._id === postData?.author._id && (
                        <Button
                            onClick={(e) => {
                                e?.stopPropagation();
                                axiosMain(`/posts/delete/${postData?._id}`, {
                                    method: "DELETE",
                                    headers: {
                                        Authorization:
                                            localStorage.getItem("token"),
                                    },
                                }).then((res) => {
                                    if (res.data.status === 200) {
                                        const post = document.getElementById(
                                            `post_${postData?._id}`
                                        );
                                        post && (post.style.display = "none");
                                    }
                                });
                            }}
                            top="10px"
                            right="10px"
                            position={"absolute"}
                            colorScheme={"red"}
                        >
                            Удалить пост
                        </Button>
                    )}

                    <Image
                        width={"100%"}
                        bgPosition="center bottom"
                        objectFit="cover"
                        src={postData?.imageURL}
                    />
                </Box>
                <Stack position={"relative"}>
                    <BlogTags tags={postData?.tags} />
                    <Link href={`/posts/${postData?._id}`}>
                        <Heading
                            color={useColorModeValue("gray.700", "white")}
                            fontSize={"2em"}
                            fontFamily={"body"}
                        >
                            {postData?.title}
                        </Heading>
                    </Link>

                    {mode === "full" ? (
                        <Box
                            h={mode === "full" ? "auto" : 100}
                            display="block"
                            p={"1em"}
                            overflow="hidden"
                            color={"gray.500"}
                        >
                            <ReactMarkdown
                                children={postData?.text as string}
                            ></ReactMarkdown>
                        </Box>
                    ) : null}
                </Stack>
                <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
                    <Avatar
                        src={
                            postData?.author.avatarURL
                                ? postData?.author.avatarURL
                                : "https://tanzolymp.com/images/default-non-user-no-photo-1.jpg"
                        }
                    />
                    <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                        <Text fontWeight={600}>
                            {postData?.author.username}
                        </Text>
                        <Text color={"gray.500"}>{createAt}</Text>
                        <Text fontSize={12} color={"gray.500"}>
                            Просмотров: {postData?.viewsCount}
                        </Text>
                    </Stack>
                </Stack>
            </Box>
        </Center>
    );
}

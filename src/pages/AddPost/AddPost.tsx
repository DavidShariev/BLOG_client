import React, { useRef, useState } from "react";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, FormLabel, Input } from "@chakra-ui/react";
import { axiosMain } from "../../axios";

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [body, setBody] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

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
            setImageURL("http://localhost:4444" + data.url);
        } catch (error: any) {
            console.log(error.message);
            alert("Ошибка загрузки файла!");
        }
    };

    const onSubmit = async () => {
        try {
            setIsLoading(true);

            const { data } = await axiosMain("/posts/create", {
                method: "POST",
                data: {
                    title,
                    text: body,
                    tags: tags.split(" "),
                    imageURL,
                },
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            }).then((res) => {
                console.log(res.data);
                if (res.data.status === 200) {
                    alert("Пост создан");
                }
                return res;
            });
        } catch (error: any) {
            alert("Не удалось создать пост.");
            console.log(error.message);
        }
    };

    return (
        <div>
            {imageURL && (
                <>
                    <Button
                        colorScheme={"red"}
                        mb={"20px"}
                        onClick={() => {
                            setImageURL("");
                            setIsLoading(true);
                        }}
                    >
                        Удалить
                    </Button>
                    <img src={imageURL} alt="uploaded"></img>
                </>
            )}
            <input
                ref={inputRef}
                type="file"
                onChange={changeImageHandler}
                hidden
            />

            {!imageURL && (
                <Button
                    my={"20px"}
                    colorScheme={"blue"}
                    onClick={() => {
                        inputRef.current?.click();
                    }}
                >
                    Загрузить картинку
                </Button>
            )}

            <FormLabel my={"20px"}>Заголовок</FormLabel>
            <Input
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                placeholder={"Заголовок статьи"}
                type="email"
            />
            <FormLabel mt={"10px"} mb={"20px"}>
                Теги
            </FormLabel>
            <Input
                mb={"20px"}
                value={tags.split(" ")}
                onChange={(e) => {
                    setTags(e.target.value);
                }}
                placeholder={"теги"}
                type="email"
            />
            <SimpleMdeReact
                value={body}
                onChange={(value) => {
                    setBody(value);
                }}
                placeholder="текст статьи"
            ></SimpleMdeReact>
            <Button onClick={onSubmit} colorScheme={"green"}>
                Отправить
            </Button>
        </div>
    );
};

export default AddPost;

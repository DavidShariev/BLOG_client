import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Post from "./components/Post/Post";
import NoPage from "./pages/404/NoPage";
import AddPost from "./pages/AddPost/AddPost";
import MainLayout from "./pages/Layout/MainLayout";
import Login from "./pages/Login/Login";
import Messages from "./pages/Messages/Messages";
import Posts from "./pages/Posts/Posts";
import Profile from "./pages/Profile/Profile";
import Registration from "./pages/Registration/Registration";
import Users from "./pages/Users/Users";
import { fetchAuth, fetchLogin } from "./redux/slices/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "./redux/store";

const App = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.user);

    console.log(state);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(fetchAuth());
        }
    }, []);

    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="/" element={<></>}></Route>
                    <Route path="/posts" element={<Posts />}></Route>
                    <Route
                        path="/posts/:id"
                        element={<Post mode="full" />}
                    ></Route>
                    <Route path="/profile/" element={<Profile />}></Route>
                    <Route path="/posts/add" element={<AddPost />}></Route>
                    <Route path="/messages" element={<Messages />}></Route>
                    <Route path="/users/*" element={<Users />}></Route>
                </Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/registration" element={<Registration />}></Route>
                <Route path="*" element={<NoPage />}></Route>
            </Routes>
        </>
    );
};

export default App;

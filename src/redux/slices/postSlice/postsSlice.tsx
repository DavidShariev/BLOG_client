import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosMain } from "../../../axios";
import { IState } from "./types";

const initialState: IState = {
    status: "null",
    tags: null,
    pull: null,
    error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const data = axiosMain("/posts", {
        method: "GET",
    })
        .then((res) => {
            return {
                posts: res.data.posts,
                tags: ["all", "new", "popular"].concat(res.data.tags),
            };
        })
        .catch((err) => {
            throw new Error(err.message);
        });
    return data;
});

export const fetchPostsByTag = createAsyncThunk(
    "posts/fetchPostsByTag",
    async (tag: string) => {
        let data;

        if (tag === "all") {
            data = await axiosMain("/posts", {
                method: "GET",
            })
                .then((res) => {
                    return {
                        posts: res.data.posts,
                        tags: ["all", "new", "popular"].concat(res.data.tags),
                    };
                })
                .catch((err) => {
                    throw new Error(err.message);
                });
        } else {
            data = axiosMain(`/posts/tag/${tag}`, {
                method: "GET",
            })
                .then((res) => {
                    return {
                        posts: res.data.posts,
                        tags: ["all", "new", "popular"].concat(res.data.tags),
                    };
                })
                .catch((err) => {
                    throw new Error(err.message);
                });
        }

        return data;
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // fetchPosts
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.pull = action.payload.posts;
                console.log(action.payload.tags);
                state.tags = action.payload.tags;
                state.status = "fulfilled";
            })
            .addCase(fetchPosts.pending, (state, action) => {
                state.pull = null;
                state.status = "pending";
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "error";
            })
            // fetchPostsByTag
            .addCase(fetchPostsByTag.fulfilled, (state, action) => {
                state.pull = action.payload.posts;
                state.status = "fulfilled";
            })
            .addCase(fetchPostsByTag.pending, (state, action) => {
                state.pull = null;
                state.status = "pending";
            })
            .addCase(fetchPostsByTag.rejected, (state, action) => {
                state.status = "error";
            });
    },
});

export default postsSlice.reducer;

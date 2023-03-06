import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux/es/exports";
import postReducer from "./slices/postSlice/postsSlice";
import userReducer from "./slices/userSlice/userSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        posts: postReducer
    }
});

type TState = ReturnType<typeof store.getState>
type TDispatch = typeof store.dispatch;

export const useAppDispatch: () => TDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<TState> = useSelector;
export default store;
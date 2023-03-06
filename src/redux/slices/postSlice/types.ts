import { IUserData } from './../userSlice/types';

export interface IState{
    status: string;
    pull: IPost[] | null;
    tags: any;
    error: string | null;
}

export interface IPost{
    _id: string,
    title: string,
    text: string,
    tags: string[],
    viewsCount: number,
    author: IUserData,
    createdAt: string,
    updatedAt: string,
    imageURL?: string,
    __v: string
}
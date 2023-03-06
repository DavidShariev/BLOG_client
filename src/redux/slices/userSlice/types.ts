
export interface IState{    
    status: string;
    data: IUserData | null;
    error: string | null
}

export interface IUserData{
    _id: string,
    username: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string,
    avatarURL: string,
    __v: string,
}

export interface IFetchLoginParams{
    email: string;
    password: string
}
export interface IFetchRegistrationParams{
    username: string,
    email: string,
    password: string,
    avatarURL?: string
}
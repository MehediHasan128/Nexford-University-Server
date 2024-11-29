export type TUserLogin = {
    id: string;
    password: string;
};


export type TChangePassword = {
    oldPassword: string;
    newPassword: string;
}


export type TUserToken = {
    userId: string;
    role: string
}
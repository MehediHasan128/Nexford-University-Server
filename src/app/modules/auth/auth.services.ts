import { TUserLogin } from "./auth.interface"

const loginUser = async(payload: TUserLogin) => {
    console.log(payload);
}

export const AuthServices = {
    loginUser
}
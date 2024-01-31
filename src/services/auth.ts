import intansce from "./intansce"
import IUser from './../types/user';

export const Signup = (data: IUser) => {
    return intansce.post('/auth/signup', data)
}

export const Signin = (data: IUser) => {
    return intansce.post('/auth/signin', data)
}

export const ForgotPass = (data: IUser) => {
    return intansce.post('/auth/forgotpassword', data)
}
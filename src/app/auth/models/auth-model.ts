export interface AuthRequestLogin {
    email: string;
    password: string;
}
export interface AuthLoginResponse {
    jwt: string;
    user: UserType;
}
export interface UserType {
    id: number;
    name: string;
    email: string;
    role: string;
}
export interface AuthRequestSignup {
    name: string;
    email: string;
    password: string;
}

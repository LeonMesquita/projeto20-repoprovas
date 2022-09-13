

export interface AuthData{
    email: string,
    password: string,
    confirmPassword: string
}


export type UserData = Omit<AuthData, 'confirmPassword'>;
export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    statusCode: number
    status: string
    message: string
    data: {
        accessToken: string
        user: {
            _id: string
            email: string
            role: string
            createdAt: string
            updatedAt: string
            __v: number
        }
    }
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    userName: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    _id: string
    email: string
    role: string
    createdAt: string
    updatedAt: string
    __v: number
}

const initialState: UserState = {
    _id: '',
    email: '',
    role: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state._id = action.payload?._id
            state.email = action.payload?.email
            state.role = action.payload?.role
            state.createdAt = action.payload?.createdAt
            state.updatedAt = action.payload?.updatedAt
            state.__v = action.payload?.__v
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer

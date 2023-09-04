import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { TableQueries } from '@/@types/common'
import { apiGetAllRequests } from '@/services/contactUsList'

type contactUs = {
    _id: string
    fullName: string
    subject: string
    email: string
    message: string
    createdAt: string
    updatedAt: string
}

export type contactUsListState = {
    loading: boolean
    tableData: TableQueries
    contactUsList: contactUs[]
}

export const SLICE_NAME = 'contactUsListSlice'

export const getAllRequests = createAsyncThunk(
    SLICE_NAME + '/getAllRequests',
    async () => {
        const response = await apiGetAllRequests()
        return response.data.data
    }
)

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
}

const initialState: contactUsListState = {
    loading: false,
    contactUsList: [],
    tableData: initialTableData,
}

const contactUsListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllRequests.fulfilled, (state, action) => {
                state.contactUsList = action.payload
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getAllRequests.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setTableData } = contactUsListSlice.actions

export default contactUsListSlice.reducer

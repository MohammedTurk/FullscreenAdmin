import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { TableQueries } from '@/@types/common'
import { apiGetAllRequests } from '@/services/contactUsList'
import { apiDeleteHeader, apiGetAllHeaders } from '@/services/systemHeadersList'

type system = {
    _id: string
    image: string
    type: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
}

export type systemListState = {
    loading: boolean
    tableData: TableQueries
    deleteConfirmation: boolean
    headersList: system[]
    selectedHeader: string
}

export const SLICE_NAME = 'systemHeaderListSlice'

export const getAllHeaders = createAsyncThunk(
    SLICE_NAME + '/getAllHeaders',
    async () => {
        const response = await apiGetAllHeaders()
        return response.data.data
    }
)

export const deleteHeader = async (data: { _id: string | string[] }) => {
    const response = await apiDeleteHeader(data)
    return response.data
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 25,
}

const initialState: systemListState = {
    loading: false,
    headersList: [],
    tableData: initialTableData,
    deleteConfirmation: false,
    selectedHeader: '',
}

const contactUsListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedService: (state, action) => {
            state.selectedHeader = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllHeaders.fulfilled, (state, action) => {
                state.headersList = action.payload
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getAllHeaders.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setTableData, toggleDeleteConfirmation, setSelectedService } =
    contactUsListSlice.actions

export default contactUsListSlice.reducer

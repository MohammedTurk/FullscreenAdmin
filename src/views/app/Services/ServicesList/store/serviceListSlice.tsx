import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAllServices, apiDeleteService } from '@/services/ServicesList'
import type { TableQueries } from '@/@types/common'

type Service = {
    id: string
    name: string
    serviceNo: string
    image: string
    category: string
    description: string
}

export type servicesListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedService: string
    tableData: TableQueries
    servicesList: Service[]
}

export const SLICE_NAME = 'servicesList'

export const getAllServices = createAsyncThunk(
    SLICE_NAME + '/getAllServices',
    async () => {
        const response = await apiGetAllServices()
        return response.data.data
    }
)

export const deleteService = async (data: { _id: string | string[] }) => {
    const response = await apiDeleteService(data)
    return response.data
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
}

const initialState: servicesListState = {
    loading: false,
    deleteConfirmation: false,
    selectedService: '',
    servicesList: [],
    tableData: initialTableData,
}

const serviceListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProductList: (state, action) => {
            state.servicesList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },

        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedService: (state, action) => {
            state.selectedService = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllServices.fulfilled, (state, action) => {
                state.servicesList = action.payload
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getAllServices.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateProductList,
    setTableData,
    toggleDeleteConfirmation,
    setSelectedService,
} = serviceListSlice.actions

export default serviceListSlice.reducer

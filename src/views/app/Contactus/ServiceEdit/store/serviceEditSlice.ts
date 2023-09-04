import {
    apiDeleteService,
    apiGetService,
    apiUpdateService,
} from '@/services/ServicesList'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export type SalesProductEditState = {
    loading: boolean
    serviceData: any
    // editedService: any
}

export const SLICE_NAME = 'serviceEditSlice'

export const getService = createAsyncThunk(
    SLICE_NAME + '/getService',
    async (data: { _id: string }) => {
        const response = await apiGetService(data)

        return response.data
    }
)

export const updateService = async <T, U extends Record<string, unknown>>(
    data: U,
    id: string
) => {
    const response = await apiUpdateService(data, id)
    return response.data
}

export const deleteService = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteService(data)
    return response.data
}

const initialState: SalesProductEditState = {
    loading: true,
    serviceData: {},
}

const serviceEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getService.fulfilled, (state, action) => {
                state.serviceData = action.payload
                state.loading = false
            })
            .addCase(getService.pending, (state) => {
                state.loading = true
            })
    },
})

export default serviceEditSlice.reducer

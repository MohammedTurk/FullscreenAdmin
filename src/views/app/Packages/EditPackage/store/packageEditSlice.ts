import {
    apiDeletePackage,
    apiGetPackageData,
    apiGetPackageDetails,
    apiUpdatePackage,
} from '@/services/PackagesList'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export type packageEditState = {
    loading: boolean
    PackageData: any
}

export const SLICE_NAME = 'packageEditSlice'

export const getPackage = createAsyncThunk(
    SLICE_NAME + '/getPackage',
    async (data: { _id: string }) => {
        const response = await apiGetPackageData(data)
        return response.data
    }
)

export const updatePackage = async <T, U extends Record<string, unknown>>(
    data: U,
    id: string
) => {
    const response = await apiUpdatePackage(data, id)
    return response.data
}

export const deletePackage = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeletePackage(data)
    return response.data
}

const initialState: packageEditState = {
    loading: true,
    PackageData: {},
}

const packageEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPackage.fulfilled, (state, action) => {
                state.PackageData = action.payload
                state.loading = false
            })
            .addCase(getPackage.pending, (state) => {
                state.loading = true
            })
    },
})

export default packageEditSlice.reducer

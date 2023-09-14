import {
    apiDeleteAdvertisement,
    apiGetAdvertisementDetails,
    apiUpdateAdvertisement,
} from '@/services/AdvertisementList'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export type advertisementEditState = {
    loading: boolean
    advertisementData: any
}

export const SLICE_NAME = 'advertisementEditSlice'

export const getAdvertisement = createAsyncThunk(
    SLICE_NAME + '/getAdvertisement',
    async (data: { _id: string }) => {
        const response = await apiGetAdvertisementDetails(data)
        return response.data
    }
)

export const updateAdvertisement = async <T, U extends Record<string, unknown>>(
    data: U,
    id: string
) => {
    const response = await apiUpdateAdvertisement(data, id)
    return response.data
}

export const deleteAdvertisement = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteAdvertisement(data)
    return response.data
}

const initialState: advertisementEditState = {
    loading: true,
    advertisementData: {},
}

const advertisementEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAdvertisement.fulfilled, (state, action) => {
                state.advertisementData = action.payload
                state.loading = false
            })
            .addCase(getAdvertisement.pending, (state) => {
                state.loading = true
            })
    },
})

export default advertisementEditSlice.reducer

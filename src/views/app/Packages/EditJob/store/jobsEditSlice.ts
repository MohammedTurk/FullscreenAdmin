import {
    apiDeleteJob,
    apiGetJobDetails,
    apiUpdateJob,
} from '@/services/JobsList'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export type jobsEditState = {
    loading: boolean
    JobsData: any
}

export const SLICE_NAME = 'jobsEditSlice'

export const getJob = createAsyncThunk(
    SLICE_NAME + '/getJob',
    async (data: { _id: string }) => {
        const response = await apiGetJobDetails(data)
        return response.data
    }
)

export const updateJob = async <T, U extends Record<string, unknown>>(
    data: U,
    id: string
) => {
    const response = await apiUpdateJob(data, id)
    return response.data
}

export const deleteJob = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteJob(data)
    return response.data
}

const initialState: jobsEditState = {
    loading: true,
    JobsData: {},
}

const jobsEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getJob.fulfilled, (state, action) => {
                state.JobsData = action.payload
                state.loading = false
            })
            .addCase(getJob.pending, (state) => {
                state.loading = true
            })
    },
})

export default jobsEditSlice.reducer

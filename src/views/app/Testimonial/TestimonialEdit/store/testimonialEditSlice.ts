import {
    apiDeleteTestimonial,
    apiGetTestimonialDetails,
    apiUpdateTestimonial,
} from '@/services/TestimonialsList'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export type testimonialEditState = {
    loading: boolean
    TestimonialData: any
}

export const SLICE_NAME = 'testimonialEditSlice'

export const getTestimonial = createAsyncThunk(
    SLICE_NAME + '/getTestimonial',
    async (data: { _id: string }) => {
        const response = await apiGetTestimonialDetails(data)
        return response.data
    }
)

export const updateTestimonial = async <T, U extends Record<string, unknown>>(
    data: U,
    id: string
) => {
    const response = await apiUpdateTestimonial(data, id)
    return response.data
}

export const deleteTestimonial = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteTestimonial(data)
    return response.data
}

const initialState: testimonialEditState = {
    loading: true,
    TestimonialData: {},
}

const articleEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTestimonial.fulfilled, (state, action) => {
                state.TestimonialData = action.payload
                state.loading = false
            })
            .addCase(getTestimonial.pending, (state) => {
                state.loading = true
            })
    },
})

export default articleEditSlice.reducer

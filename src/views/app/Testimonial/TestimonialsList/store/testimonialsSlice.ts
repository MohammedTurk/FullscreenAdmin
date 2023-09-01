import {
    apiDeleteTestimonial,
    apiGetAllTestimonials,
} from '@/services/TestimonialsList'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export type Testimonial = {
    _id: string
    name: string
    content: string
    image: string
}

export type testimonialsState = {
    loading: boolean
    testimonialsData: any
    testimonialDeleteConfirmation: boolean
    selected: {
        _id: string
    }
}

export const SLICE_NAME = 'testimonialsSlice'

export const getAllTestimonials = createAsyncThunk(
    SLICE_NAME + '/getAllTestimonials',
    async () => {
        const response = await apiGetAllTestimonials()
        return response.data
    }
)

export const deleteTestimonial = async (data: { _id: string | string[] }) => {
    const response = await apiDeleteTestimonial(data)
    return response.data
}

const initialState: testimonialsState = {
    loading: false,
    testimonialsData: [],
    testimonialDeleteConfirmation: false,
    selected: {
        _id: '',
    },
}

const manageArticlesSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        toggleTestimonialDeleteConfirmation: (state, action) => {
            state.testimonialDeleteConfirmation = action.payload
        },

        setSelected: (state, action) => {
            state.selected = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTestimonials.fulfilled, (state, action) => {
                state.loading = false
                state.testimonialsData = action.payload
            })
            .addCase(getAllTestimonials.pending, (state) => {
                state.loading = true
            })
    },
})

export const { toggleTestimonialDeleteConfirmation, setSelected } =
    manageArticlesSlice.actions

export default manageArticlesSlice.reducer

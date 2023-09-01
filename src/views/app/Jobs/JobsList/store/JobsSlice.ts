import { apiGetAllJobs } from '@/services/JobsList'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export type jobsState = {
    loading: boolean
    jobsData: any
    jobDeleteConfirmation: boolean
    selected: {
        _id: string
    }
}

export const SLICE_NAME = 'JobsSlice'

export const getAllJobs = createAsyncThunk(
    SLICE_NAME + '/getAllJobs',
    async () => {
        const response = await apiGetAllJobs()
        return response.data
    }
)

// export const deleteTestimonial = async (data: { _id: string | string[] }) => {
//     const response = await apiDeleteTestimonial(data)
//     return response.data
// }

const initialState: jobsState = {
    loading: false,
    jobsData: [],
    jobDeleteConfirmation: false,
    selected: {
        _id: '',
    },
}

const JobsSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        toggleJobsDeleteConfirmation: (state, action) => {
            state.jobDeleteConfirmation = action.payload
        },

        setSelected: (state, action) => {
            state.selected = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllJobs.fulfilled, (state, action) => {
                state.loading = false
                state.jobsData = action.payload
            })
            .addCase(getAllJobs.pending, (state) => {
                state.loading = true
            })
    },
})

export const { toggleJobsDeleteConfirmation, setSelected } = JobsSlice.actions

export default JobsSlice.reducer

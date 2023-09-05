import { apiUpdatePackage } from '@/services/PackagesList'
import {
    apiDeleteProject,
    apiGetProject,
    apiUpdateProject,
} from '@/services/ProjectsList'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export type projectEditState = {
    loading: boolean
    projectData: any
}

export const SLICE_NAME = 'projectEditSlice'

export const getProject = createAsyncThunk(
    SLICE_NAME + '/getProject',
    async (data: { _id: string }) => {
        const response = await apiGetProject(data)

        return response.data
    }
)

export const updateProject = async <T, U extends Record<string, unknown>>(
    data: U,
    id: string
) => {
    const response = await apiUpdateProject(data, id)
    return response.data
}

export const deleteProject = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteProject(data)
    return response.data
}

const initialState: projectEditState = {
    loading: true,
    projectData: {},
}

const projectEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProject.fulfilled, (state, action) => {
                state.projectData = action.payload
                state.loading = false
            })
            .addCase(getProject.pending, (state) => {
                state.loading = true
            })
    },
})

export default projectEditSlice.reducer

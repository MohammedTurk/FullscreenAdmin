import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAllServices, apiDeleteService } from '@/services/ServicesList'
import type { TableQueries } from '@/@types/common'
import { apiDeleteProject, apiGetAllProjects } from '@/services/ProjectsList'

type Project = {
    _id: string
    name: string
    file: string
    link: string
    category: string
    description: string
}

export type projectsListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedProject: string
    tableData: TableQueries
    projectsList: Project[]
}

export const SLICE_NAME = 'projectListSlice'

export const getAllProjects = createAsyncThunk(
    SLICE_NAME + '/getAllProjects',
    async () => {
        const response = await apiGetAllProjects()
        return response.data.data
    }
)

export const deleteProject = async (data: { _id: string | string[] }) => {
    const response = await apiDeleteProject(data)
    return response.data
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
}

const initialState: projectsListState = {
    loading: false,
    deleteConfirmation: false,
    selectedProject: '',
    projectsList: [],
    tableData: initialTableData,
}

const projectListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProjectsList: (state, action) => {
            state.projectsList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },

        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedProject: (state, action) => {
            state.selectedProject = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProjects.fulfilled, (state, action) => {
                state.projectsList = action.payload
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getAllProjects.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateProjectsList,
    setTableData,
    toggleDeleteConfirmation,
    setSelectedProject,
} = projectListSlice.actions

export default projectListSlice.reducer

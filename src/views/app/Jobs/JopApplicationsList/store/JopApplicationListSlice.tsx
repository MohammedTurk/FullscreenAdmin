import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { TableQueries } from '@/@types/common'
import {
    apiGetAllJobApplications,
    apiGetSingleJobApplicationList,
    apiGetSingleJopApplicationDetails,
} from '@/services/JobsList'

type JobApplication = {
    _id: string
    job: {
        _id: string
        title: string
    }
    firstName: string
    lastName: string
    email: string
    phone: string
    specialization: string
    cv: any
}

export type JopApplicationListState = {
    loading: boolean
    singleJobApplicationListLoading: boolean
    deleteConfirmation: boolean
    selectedJob: string
    tableData: TableQueries
    jobApplicationsList: JobApplication[]
    singleJobApplicationList: JobApplication[]
    singleJopApplicationDetailsLoading: boolean
    singleJopApplicationDetailsData: any
}

export const SLICE_NAME = 'JopApplicationListSlice'

export const getAllJopApplications = createAsyncThunk(
    SLICE_NAME + '/getAllJopApplications',
    async () => {
        const response = await apiGetAllJobApplications()
        return response.data.data
    }
)

export const getSingleJopApplicationList = createAsyncThunk(
    SLICE_NAME + '/getSingleJopApplicationList',
    async (rquestParam: any) => {
        const response = await apiGetSingleJobApplicationList(rquestParam)

        return response.data.data
    }
)

export const getSingleJopApplicationDetails = createAsyncThunk(
    SLICE_NAME + '/getSingleJopApplicationDetails',
    async (rquestParam: any) => {
        const response = await apiGetSingleJopApplicationDetails(rquestParam)

        return response.data.data
    }
)

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
}

const initialState: JopApplicationListState = {
    loading: false,
    singleJobApplicationListLoading: false,
    deleteConfirmation: false,
    selectedJob: '',
    jobApplicationsList: [],
    singleJobApplicationList: [],
    tableData: initialTableData,
    singleJopApplicationDetailsLoading: false,
    singleJopApplicationDetailsData: {},
}

const JopApplicationListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateArticlesList: (state, action) => {
            state.jobApplicationsList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },

        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedJobApplication: (state, action) => {
            state.selectedJob = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllJopApplications.fulfilled, (state, action) => {
                state.jobApplicationsList = action.payload
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getAllJopApplications.pending, (state) => {
                state.loading = true
            })

            .addCase(getSingleJopApplicationList.fulfilled, (state, action) => {
                state.singleJobApplicationList = action.payload
                state.singleJobApplicationListLoading = false
            })
            .addCase(getSingleJopApplicationList.pending, (state) => {
                state.singleJobApplicationListLoading = true
            })

            .addCase(
                getSingleJopApplicationDetails.fulfilled,
                (state, action) => {
                    state.singleJopApplicationDetailsData = action.payload
                    state.singleJopApplicationDetailsLoading = false
                }
            )
            .addCase(getSingleJopApplicationDetails.pending, (state) => {
                state.singleJopApplicationDetailsLoading = true
            })
    },
})

export const {
    updateArticlesList,
    setTableData,
    toggleDeleteConfirmation,
    setSelectedJobApplication,
} = JopApplicationListSlice.actions

export default JopApplicationListSlice.reducer

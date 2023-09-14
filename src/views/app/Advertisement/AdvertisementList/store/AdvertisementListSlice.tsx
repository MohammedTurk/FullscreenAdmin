import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { TableQueries } from '@/@types/common'
import {
    apiDeleteAdvertisement,
    apiGetAllAdvertisements,
} from '@/services/AdvertisementList'

type Advertisement = {
    _id: string
    type: string
    isClosed: string
    image: string
    createdAt: string
    updatedAt: string
    relatedId: string
}

export type AdvertisementListSlice = {
    loading: boolean
    deleteConfirmation: boolean
    selectedAdvertisement: string
    tableData: TableQueries
    advertisementList: Advertisement[]
}

export const SLICE_NAME = 'AdvertisementListSlice'

export const getAllAdvertisements = createAsyncThunk(
    SLICE_NAME + '/getAllAdvertisements',
    async () => {
        const response = await apiGetAllAdvertisements()
        return response.data.data
    }
)

export const deleteAdvertisement = async (data: { _id: string | string[] }) => {
    const response = await apiDeleteAdvertisement(data)
    return response.data
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
}

const initialState: AdvertisementListSlice = {
    loading: false,
    deleteConfirmation: false,
    selectedAdvertisement: '',
    advertisementList: [],
    tableData: initialTableData,
}

const advertisementListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateAdvertisementList: (state, action) => {
            state.advertisementList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },

        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedAdvertisement: (state, action) => {
            state.selectedAdvertisement = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllAdvertisements.fulfilled, (state, action) => {
                state.advertisementList = action.payload
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getAllAdvertisements.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateAdvertisementList,
    setTableData,
    toggleDeleteConfirmation,
    setSelectedAdvertisement,
} = advertisementListSlice.actions

export default advertisementListSlice.reducer

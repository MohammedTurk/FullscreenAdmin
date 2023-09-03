import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { TableQueries } from '@/@types/common'
import { apiGetAllPackages, apiGetPackageItems } from '@/services/PackagesList'

export type PackageItemsState = {
    loading: boolean
    selectedPackage: string
    tableData: TableQueries
    packageItemsData: any
}

export const SLICE_NAME = 'PackageSlice'

export const getPackageItems = createAsyncThunk(
    SLICE_NAME + '/getPackageItems',
    async (data: any) => {
        const response = await apiGetPackageItems(data)
        return response.data.data
    }
)

// export const getSingleJopApplicationList = createAsyncThunk(
//     SLICE_NAME + '/getSingleJopApplicationList',
//     async (rquestParam: any) => {
//         const response = await apiGetSingleJobApplicationList(rquestParam)

//         return response.data.data
//     }
// )

// export const getSingleJopApplicationDetails = createAsyncThunk(
//     SLICE_NAME + '/getSingleJopApplicationDetails',
//     async (rquestParam: any) => {
//         const response = await apiGetSingleJopApplicationDetails(rquestParam)

//         return response.data.data
//     }
// )

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
}

const initialState: PackageItemsState = {
    loading: false,
    selectedPackage: '',
    packageItemsData: [],
    tableData: initialTableData,
}

const PackageSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },

        setSelectedPackage: (state, action) => {
            state.selectedPackage = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPackageItems.fulfilled, (state, action) => {
                state.packageItemsData = action.payload
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getPackageItems.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setTableData, setSelectedPackage } = PackageSlice.actions

export default PackageSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { TableQueries } from '@/@types/common'
import {
    apiDeletePackage,
    apiGetAllPackages,
    apiGetPackageDetails,
    apiGetPackageItems,
} from '@/services/PackagesList'

export type PackageItemsState = {
    loading: boolean
    selectedPackage: {
        _id: string
    }
    tableData: TableQueries
    packageItemsData: any
    loadingPackageDetails: boolean
    packageDetailsData: any
    packageDeleteConfirmation: boolean
}

export const SLICE_NAME = 'PackageSlice'

export const getPackageItems = createAsyncThunk(
    SLICE_NAME + '/getPackageItems',
    async (data: any) => {
        const response = await apiGetPackageItems(data)
        return response.data.data
    }
)

export const getPackageDetails = createAsyncThunk(
    SLICE_NAME + '/getPackageDetails',
    async (rquestParam: any) => {
        const response = await apiGetPackageDetails(rquestParam)

        return response.data.data
    }
)

export const deletePackage = async (data: { _id: string | string[] }) => {
    const response = await apiDeletePackage(data)
    return response.data
}

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
    selectedPackage: { _id: '' },
    packageItemsData: [],
    tableData: initialTableData,
    loadingPackageDetails: false,
    packageDetailsData: [],
    packageDeleteConfirmation: false,
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
        togglePackageDeleteConfirmation: (state, action) => {
            state.packageDeleteConfirmation = action.payload
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

            .addCase(getPackageDetails.fulfilled, (state, action) => {
                state.packageDetailsData = action.payload
                state.loadingPackageDetails = false
            })
            .addCase(getPackageDetails.pending, (state) => {
                state.loadingPackageDetails = true
            })
    },
})

export const {
    setTableData,
    setSelectedPackage,
    togglePackageDeleteConfirmation,
} = PackageSlice.actions

export default PackageSlice.reducer

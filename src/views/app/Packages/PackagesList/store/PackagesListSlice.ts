import { apiDeletePackage, apiGetAllPackages } from '@/services/PackagesList'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export type PackagesState = {
    loading: boolean
    packagesData: any
    packageDeleteConfirmation: boolean
    selected: {
        _id: string
    }
}

export const SLICE_NAME = 'PackagesListSlice'

export const getAllPackages = createAsyncThunk(
    SLICE_NAME + '/getAllPackages',
    async () => {
        const response = await apiGetAllPackages()
        return response.data
    }
)

export const deletePackage = async (data: { _id: string | string[] }) => {
    const response = await apiDeletePackage(data)
    return response.data
}

const initialState: PackagesState = {
    loading: false,
    packagesData: [],
    packageDeleteConfirmation: false,
    selected: {
        _id: '',
    },
}

const PackagesListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        togglePackageDeleteConfirmation: (state, action) => {
            state.packageDeleteConfirmation = action.payload
        },

        setSelected: (state, action) => {
            state.selected = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPackages.fulfilled, (state, action) => {
                state.loading = false
                state.packagesData = action.payload
            })
            .addCase(getAllPackages.pending, (state) => {
                state.loading = true
            })
    },
})

export const { togglePackageDeleteConfirmation, setSelected } =
    PackagesListSlice.actions

export default PackagesListSlice.reducer

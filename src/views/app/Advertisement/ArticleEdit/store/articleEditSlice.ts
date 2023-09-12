import {
    apiDeleteArticle,
    apiGetArticleDetails,
    apiUpdateArticle,
} from '@/services/ArticlesList'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export type articleEditState = {
    loading: boolean
    articleData: any
}

export const SLICE_NAME = 'articleEditSlice'

export const getArticle = createAsyncThunk(
    SLICE_NAME + '/getArticle',
    async (data: { _id: string }) => {
        const response = await apiGetArticleDetails(data)
        return response.data
    }
)

export const updateArticle = async <T, U extends Record<string, unknown>>(
    data: U,
    id: string
) => {
    const response = await apiUpdateArticle(data, id)
    return response.data
}

export const deleteArticle = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteArticle(data)
    return response.data
}

const initialState: articleEditState = {
    loading: true,
    articleData: {},
}

const articleEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getArticle.fulfilled, (state, action) => {
                state.articleData = action.payload
                state.loading = false
            })
            .addCase(getArticle.pending, (state) => {
                state.loading = true
            })
    },
})

export default articleEditSlice.reducer

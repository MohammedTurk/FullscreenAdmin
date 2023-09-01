import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAllArticles, apiDeleteArticle } from '@/services/ArticlesList'
import type { TableQueries } from '@/@types/common'

type Article = {
    _id: string
    title: string
    content: string
    image: string
    createdAt: string
    updatedAt: string
    tags: string[]
}

type Articles = {
    articles: Article[]
}

export type articlesListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedArticle: string
    tableData: TableQueries
    articlesList: Articles
}

export const SLICE_NAME = 'articlesListSlice'

export const getAllArticles = createAsyncThunk(
    SLICE_NAME + '/getAllArticles',
    async () => {
        const response = await apiGetAllArticles()
        return response.data.data
    }
)

export const deleteService = async (data: { _id: string | string[] }) => {
    const response = await apiDeleteArticle(data)
    return response.data
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
}

const initialState: articlesListState = {
    loading: false,
    deleteConfirmation: false,
    selectedArticle: '',
    articlesList: [
        {
            _id: '',
            title: '',
            content: '',
            image: '',
            createdAt: '',
            updatedAt: '',
            tags: [],
        },
    ],
    tableData: initialTableData,
}

const articlesListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateArticlesList: (state, action) => {
            state.articlesList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },

        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedArticle: (state, action) => {
            state.selectedArticle = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllArticles.fulfilled, (state, action) => {
                state.articlesList = action.payload
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getAllArticles.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateArticlesList,
    setTableData,
    toggleDeleteConfirmation,
    setSelectedArticle,
} = articlesListSlice.actions

export default articlesListSlice.reducer

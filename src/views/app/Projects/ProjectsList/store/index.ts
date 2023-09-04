import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SLICE_NAME, projectsListState } from './projectListSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: projectsListState
        }
    }
> = useSelector

export * from './projectListSlice'
export { useAppDispatch } from '@/store'
export default reducer

import { useNavigate } from 'react-router-dom'
import JobApplicationDetailsForm from '../JobApplicationDetailsForm/JobApplicationDetailsForm'
// import { useAppDispatch } from './store'
import { injectReducer, useAppDispatch } from '@/store'
import reducer, {
    getSingleJopApplicationDetails,
    useAppSelector,
} from '../JopApplicationsList/store'
import { useEffect, useState } from 'react'
import { Loading } from '@/components/shared'
import isEmpty from 'lodash/isEmpty'

injectReducer('JopApplicationListSlice', reducer)

const JobApplicationDetails = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    const dispatch = useAppDispatch()

    const dataForm: any = useAppSelector(
        (state) =>
            state.JopApplicationListSlice.data.singleJopApplicationDetailsData
    )

    const loading = useAppSelector(
        (state) =>
            state.JopApplicationListSlice.data
                .singleJopApplicationDetailsLoading
    )

    const fetchData = () => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const rquestParam = { _id: path }
        dispatch(getSingleJopApplicationDetails(rquestParam))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const data: any = {}
    if (dataForm) {
        data.firstName = dataForm?.firstName
        data.lastName = dataForm?.lastName
        data.email = dataForm?.email
        data.phone = dataForm?.phone
        data.specialization = dataForm?.specialization
        data.cv = dataForm?.cv
        data.arabicTitle = dataForm?.job?.title?.ar
        data.englishTitle = dataForm?.job?.title?.en
        data.degree = dataForm?.degree
    }

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(dataForm) && (
                    <JobApplicationDetailsForm
                        onBack={handleBack}
                        initialData={data}
                    />
                )}
            </Loading>
        </>
    )
}

export default JobApplicationDetails

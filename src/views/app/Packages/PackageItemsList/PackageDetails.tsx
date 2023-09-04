import { useNavigate } from 'react-router-dom'
// import { useAppDispatch } from './store'
import { injectReducer, useAppDispatch } from '@/store'

import { useEffect, useState } from 'react'
import { Loading } from '@/components/shared'
import isEmpty from 'lodash/isEmpty'
import reducer, { getPackageDetails, useAppSelector } from './store'
import PackageDetailsForm from '../PackageDetailsForm/PackageDetailsForm'

injectReducer('PackageSlice', reducer)

const PackageDetails = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    const dispatch = useAppDispatch()

    const packageDetailsData: any = useAppSelector(
        (state) => state.PackageSlice.data.packageDetailsData
    )

    const loading = useAppSelector(
        (state) => state.PackageSlice.data.loadingPackageDetails
    )

    const fetchData = () => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const rquestParam = { _id: path }
        dispatch(getPackageDetails(rquestParam))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const data: any = {}
    if (packageDetailsData) {
        data.arabicName = packageDetailsData?.name?.ar
        data.englishName = packageDetailsData?.name?.en
        data.arabicType = packageDetailsData?.type?.ar
        data.englishType = packageDetailsData?.type?.en
        data.price = packageDetailsData?.price
        data.arabicDetails = packageDetailsData?.details?.ar
        data.englishDetails = packageDetailsData?.details?.en
        data.isDefault = packageDetailsData?.isDefault
        data.items = packageDetailsData?.items
        data.services = packageDetailsData?.services
    }

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(packageDetailsData) && (
                    <PackageDetailsForm
                        onBack={handleBack}
                        initialData={data}
                    />
                )}
            </Loading>
        </>
    )
}

export default PackageDetails

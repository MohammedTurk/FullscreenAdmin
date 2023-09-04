import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    useAppSelector,
    useAppDispatch,
    updatePackage,
    getPackage,
    deletePackage,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import PackageForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/app/Packages/PackageForm/PackageForm'
import isEmpty from 'lodash/isEmpty'
import PackageFormEdit from '../PackageForm/PackageFormEdit'

injectReducer('packageEditSlice', reducer)

export const EditPackage = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const PackageData = useAppSelector(
        (state) => state.packageEditSlice.data.PackageData.data
    )

    const data: any = []
    if (PackageData) {
        PackageData.map((item: any) =>
            data.push({
                name: item?.name,
                price: item?.price,
                details: item?.details,
                items: item?.items,
                services: item?.services,
                type: item?.type,
                isDefault: item?.isDefault,
            })
        )
    }

    const loading = useAppSelector(
        (state) => state.packageEditSlice.data.loading
    )

    const fetchData = (data: { _id: string }) => {
        dispatch(getPackage(data))
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)

        const success = await updatePackage(values, PackageData?.data?._id)
        setSubmitting(false)
        if (success) {
            popNotification('updated')
        }
    }

    const handleDiscard = () => {
        navigate('/allPackages')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deletePackage({
            _id: PackageData?.data?._id,
        })
        if (success) {
            popNotification('deleted')
        }
    }

    const popNotification = (keyword: string) => {
        toast.push(
            <Notification
                title={`Successfuly ${keyword}`}
                type="success"
                duration={2500}
            >
                Package successfuly {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/allPackages')
    }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )

        const rquestParam = { _id: path }
        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(PackageData) && (
                    <PackageFormEdit
                        initialData={data}
                        onFormSubmit={handleFormSubmit}
                        onDiscard={handleDiscard}
                        onDelete={handleDelete}
                    />
                )}
            </Loading>
            {!loading && isEmpty(PackageData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                    />
                    <h3 className="mt-8">No Package found!</h3>
                </div>
            )}
        </>
    )
}

export default EditPackage

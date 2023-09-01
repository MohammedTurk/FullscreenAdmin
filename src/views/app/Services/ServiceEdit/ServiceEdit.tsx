import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getService,
    useAppSelector,
    useAppDispatch,
    updateService,
    deleteService,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import ProductForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/app/Services/ServiceForm/ServiceForm'
import isEmpty from 'lodash/isEmpty'

injectReducer('serviceEditSlice', reducer)

const ServiceEdit = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const serviceData = useAppSelector(
        (state) => state.serviceEditSlice.data.serviceData
    )

    const data: any = {}
    if (serviceData) {
        data.arabicName = serviceData?.data?.name?.ar
        data.englishName = serviceData?.data?.name?.en
        data.category = serviceData?.data?.category?.en
        data.arabicDescription = serviceData?.data?.description?.ar
        data.englishDescription = serviceData?.data?.description?.en
        data.arabicDetails = serviceData?.data?.details?.ar
        data.englishDetails = serviceData?.data?.details?.en
        data.image = serviceData?.data?.image
        data.serviceNo = serviceData?.data?.serviceNo
    }

    const loading = useAppSelector(
        (state) => state.serviceEditSlice.data.loading
    )

    const fetchData = (data: { _id: string }) => {
        dispatch(getService(data))
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)

        const success = await updateService(values, serviceData?.data?._id)
        setSubmitting(false)
        if (success) {
            popNotification('updated')
        }
    }

    const handleDiscard = () => {
        navigate('/services')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        // const path = location.pathname.substring(
        //     location.pathname.lastIndexOf('/') + 1
        // )

        // const rquestParam = { _id: path }
        // console.log('serviceData._id ', serviceData._id)

        const success = await deleteService({ _id: serviceData?.data?._id })
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
                Service successfuly {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/services')
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
                {!isEmpty(serviceData) && (
                    <>
                        <ProductForm
                            type="edit"
                            initialData={data}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(serviceData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                    />
                    <h3 className="mt-8">No product found!</h3>
                </div>
            )}
        </>
    )
}

export default ServiceEdit

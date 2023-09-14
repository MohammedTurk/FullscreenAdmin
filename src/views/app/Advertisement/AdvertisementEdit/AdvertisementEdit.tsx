import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    useAppSelector,
    useAppDispatch,
    getAdvertisement,
    updateAdvertisement,
    deleteAdvertisement,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import AdvertisementForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/app/Advertisement/AdvertisementForm/AdvertisementForm'
import isEmpty from 'lodash/isEmpty'

injectReducer('advertisementEditSlice', reducer)

const AdvertisementEdit = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const advertisementData = useAppSelector(
        (state) => state.advertisementEditSlice.data.advertisementData
    )
    const data: any = {
        tags: [],
    }

    if (advertisementData) {
        data.image = advertisementData?.data?.image
        data.type = advertisementData?.data?.type
        data.active = !advertisementData?.data?.isClosed
        data.relatedId = advertisementData?.data?.relatedId
        data.arabicText = advertisementData?.data?.text?.ar
        data.englishText = advertisementData?.data?.text?.en
    }

    const loading = useAppSelector(
        (state) => state.advertisementEditSlice.data.loading
    )

    const fetchData = (data: { _id: string }) => {
        dispatch(getAdvertisement(data))
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)

        const success = await updateAdvertisement(
            values,
            advertisementData?.data?._id
        )
        setSubmitting(false)
        if (success) {
            popNotification('updated')
        }
    }

    const handleDiscard = () => {
        navigate('/allAdvertisements')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteAdvertisement({
            _id: advertisementData?.data?._id,
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
                Advertisements successfuly {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/allAdvertisements')
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
                {!isEmpty(advertisementData) && (
                    <>
                        <AdvertisementForm
                            type="edit"
                            initialData={data}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(advertisementData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                    />
                    <h3 className="mt-8">No Advertisement Found!</h3>
                </div>
            )}
        </>
    )
}

export default AdvertisementEdit

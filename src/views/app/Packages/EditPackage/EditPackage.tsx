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

injectReducer('packageEditSlice', reducer)

export const EditPackage = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const PackageData = useAppSelector(
        (state) => state.packageEditSlice.data.PackageData.data
    )

    const data: any = {}
    if (PackageData) {
        data.arabicName = PackageData?.name?.ar
        data.englishName = PackageData?.name?.en
        data.isDefault = PackageData?.isDefault
        data.arabicType = PackageData?.type?.ar
        data.englishType = PackageData?.type?.en
        const itemsAr: any = []
        const itemsEn: any = []
        PackageData?.items.forEach((item: any) => {
            itemsAr.push(item?.ar)
            itemsEn.push(item?.en)
        })
        data.arabicItems = itemsAr
        data.englishItems = itemsEn
        data.arabicDetails = PackageData?.details?.ar
        data.englishDetails = PackageData?.details?.en

        const ServicesNameAr: any = []
        const ServicesNameEn: any = []
        const ServicesImages: any = []
        PackageData?.services.forEach((item: any) => {
            ServicesNameAr.push(item?.name?.ar)
            ServicesNameEn.push(item?.name?.en)
            ServicesImages.push(item?.image)
        })
        data.arabicServiceNames = ServicesNameAr
        data.englishServiceNames = ServicesNameEn
        data.images = ServicesImages
        data.imgList = ServicesImages
        data.price = PackageData?.price
        data.parentImage = PackageData?.icon
        data.link = PackageData?.link
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

        const success = await updatePackage(values, PackageData?._id)
        setSubmitting(false)
        if (success) {
            popNotification('updated')
        }
    }

    const handleDiscard = () => {
        navigate(-1)
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deletePackage({
            _id: PackageData?._id,
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
        navigate(-1)
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
                    <PackageForm
                        type="edit"
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

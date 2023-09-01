import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    useAppSelector,
    useAppDispatch,
    updateTestimonial,
    deleteTestimonial,
    getTestimonial,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import TestimonialForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/app/Testimonial/TestimonialForm/TestimonialForm'
import isEmpty from 'lodash/isEmpty'

injectReducer('testimonialEditSlice', reducer)

const TestimonialEdit = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const testimonialData = useAppSelector(
        (state) => state.testimonialEditSlice.data.TestimonialData
    )
    const data: any = {
        tags: [],
    }
    if (testimonialData) {
        data.image = testimonialData?.data?.image
        data.arabicContent = testimonialData?.data?.content?.ar
        data.englishContent = testimonialData?.data?.content?.en
        data.name = testimonialData?.data?.name
    }

    const loading = useAppSelector(
        (state) => state.testimonialEditSlice.data.loading
    )

    const fetchData = (data: { _id: string }) => {
        dispatch(getTestimonial(data))
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)

        const success = await updateTestimonial(
            values,
            testimonialData?.data?._id
        )
        setSubmitting(false)
        if (success) {
            popNotification('updated')
        }
    }

    const handleDiscard = () => {
        navigate('/testimonials')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteTestimonial({
            _id: testimonialData?.data?._id,
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
                Testimonial successfuly {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/testimonials')
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
                {!isEmpty(testimonialData) && (
                    <>
                        <TestimonialForm
                            type="edit"
                            initialData={data}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(testimonialData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                    />
                    <h3 className="mt-8">No testimonial found!</h3>
                </div>
            )}
        </>
    )
}

export default TestimonialEdit

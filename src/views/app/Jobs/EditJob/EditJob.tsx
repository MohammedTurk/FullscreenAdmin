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

injectReducer('jobsEditSlice', reducer)

export const EditJob = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const JobsData = useAppSelector(
        (state) => state.jobsEditSlice.data.JobsData
    )
    const data: any = {
        tags: [],
    }
    if (JobsData) {
        data.image = JobsData?.data?.image
        data.arabicContent = JobsData?.data?.content?.ar
        data.englishContent = JobsData?.data?.content?.en
        data.name = JobsData?.data?.name


        data.arabicTitle = JobsData?.data?.content?.ar
        data.englishTitle = JobsData?.data?.content?.en

       

    const loading = useAppSelector((state) => state.jobsEditSlice.data.loading)

    const fetchData = (data: { _id: string }) => {
        dispatch(getTestimonial(data))
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)

        const success = await updateTestimonial(values, JobsData?.data?._id)
        setSubmitting(false)
        if (success) {
            popNotification('updated')
        }
    }

    const handleDiscard = () => {
        navigate('/jobs')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteTestimonial({
            _id: JobsData?.data?._id,
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
                Job successfuly {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/jobs')
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
                {!isEmpty(JobsData) && (
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
            {!loading && isEmpty(JobsData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                    />
                    <h3 className="mt-8">No Job found!</h3>
                </div>
            )}
        </>
    )
}

export default EditJob
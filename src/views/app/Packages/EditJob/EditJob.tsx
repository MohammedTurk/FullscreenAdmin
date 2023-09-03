import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    useAppSelector,
    useAppDispatch,
    updateJob,
    deleteJob,
    getJob,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import JobForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/app/Jobs/JobForm/JobForm'
import isEmpty from 'lodash/isEmpty'
import { apiGetJobDetails } from '@/services/JobsList'

injectReducer('jobsEditSlice', reducer)

export const EditJob = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const JobsData = useAppSelector(
        (state) => state.jobsEditSlice.data.JobsData
    )
    const data: any = {}
    if (JobsData) {
        data.arabicTitle = JobsData?.data?.title?.ar
        data.englishTitle = JobsData?.data?.title?.en
        data.arabicDescription = JobsData?.data?.description?.ar
        data.englishDescription = JobsData?.data?.description?.en
        data.arabicType = JobsData?.data?.type?.ar
        data.englishType = JobsData?.data?.type?.en
        data.arabicCategory = JobsData?.data?.category?.en
        data.englishCategory = JobsData?.data?.category?.en
        data.arabicRequirements = JobsData?.data?.requirements?.en
        data.englishRequirements = JobsData?.data?.requirements?.en
        data.location = JobsData?.category?.location
        data.file = JobsData?.data?.file
    }
    const loading = useAppSelector((state) => state.jobsEditSlice.data.loading)

    const fetchData = (data: { _id: string }) => {
        dispatch(getJob(data))
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)

        const success = await updateJob(values, JobsData?.data?._id)
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
        const success = await deleteJob({
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
                    <JobForm
                        type="edit"
                        initialData={data}
                        onFormSubmit={handleFormSubmit}
                        onDiscard={handleDiscard}
                        onDelete={handleDelete}
                    />
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

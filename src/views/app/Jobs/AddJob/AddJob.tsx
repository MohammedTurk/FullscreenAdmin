import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import JobForm, { FormModel, SetSubmitting } from '../JobForm/JobForm'
import { apiAddNewJob } from '@/services/JobsList'

const AddJob = () => {
    const navigate = useNavigate()

    const AddJob = async (data: FormModel) => {
        const response = await apiAddNewJob(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        try {
            const success = await AddJob(values)
            setSubmitting(false)
            if (success) {
                toast.push(
                    <Notification
                        title={'Successfuly added'}
                        type="success"
                        duration={2500}
                    >
                        Job successfuly added
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
                navigate('/jobs')
            }
        } catch (error) {
            toast.push(
                <Notification
                    title="The request was rejected please try again!"
                    type="danger"
                    duration={2500}
                />,
                {
                    placement: 'top-center',
                }
            )
            setSubmitting(false)
        }
    }

    const handleDiscard = () => {
        navigate('/jobs')
    }

    return (
        <>
            <JobForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default AddJob

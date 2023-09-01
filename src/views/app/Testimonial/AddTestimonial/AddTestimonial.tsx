import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import TestimonialForm, {
    FormModel,
    SetSubmitting,
} from '../TestimonialForm/TestimonialForm'
import { apiAddNewTestimonial } from '@/services/TestimonialsList'

const AddTestimonial = () => {
    const navigate = useNavigate()

    const AddTestimonial = async (data: FormModel) => {
        const response = await apiAddNewTestimonial(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        try {
            const success = await AddTestimonial(values)
            setSubmitting(false)
            if (success) {
                toast.push(
                    <Notification
                        title={'Successfuly added'}
                        type="success"
                        duration={2500}
                    >
                        Testimonial successfuly added
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
                navigate('/testimonials')
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
        navigate('/testimonials')
    }

    return (
        <>
            <TestimonialForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default AddTestimonial

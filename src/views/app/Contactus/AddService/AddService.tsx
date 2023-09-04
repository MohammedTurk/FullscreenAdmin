import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiAddNewService } from '@/services/ServicesList'
import ProductForm, {
    FormModel,
    SetSubmitting,
} from '../ServiceForm/ServiceForm'

const AddService = () => {
    const navigate = useNavigate()

    const addService = async (data: FormModel) => {
        const response = await apiAddNewService(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        try {
            const success = await addService(values)
            setSubmitting(false)
            if (success) {
                toast.push(
                    <Notification
                        title={'Successfuly added'}
                        type="success"
                        duration={2500}
                    >
                        Product successfuly added
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
                navigate('/services')
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
        navigate('/services')
    }

    return (
        <>
            <ProductForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default AddService

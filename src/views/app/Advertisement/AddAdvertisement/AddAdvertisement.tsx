import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import AdvertisementForm, {
    FormModel,
    SetSubmitting,
} from '../AdvertisementForm/AdvertisementForm'
import { apiAddNewAdvertisement } from '@/services/Advertisement'

const AddAdvertisement = () => {
    const navigate = useNavigate()

    const AddArticle = async (data: FormModel) => {
        const response = await apiAddNewAdvertisement(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        try {
            const success = await AddArticle(values)
            setSubmitting(false)
            if (success) {
                toast.push(
                    <Notification
                        title={'Successfuly added'}
                        type="success"
                        duration={2500}
                    >
                        Advertisement successfuly added
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
                navigate('/allAdvertisements')
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
        navigate('/allAdvertisements')
    }

    return (
        <>
            <AdvertisementForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default AddAdvertisement

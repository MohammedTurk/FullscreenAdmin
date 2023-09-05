import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'

import { apiAddHeader } from '@/services/systemHeadersList'
import SystemHeaderForm, {
    FormModel,
    SetSubmitting,
} from '../SystemHeaderForm/SystemHeaderForm'

const AddHeader = () => {
    const navigate = useNavigate()

    const addHeader = async (data: FormModel) => {
        const response = await apiAddHeader(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        try {
            const success = await addHeader(values)
            setSubmitting(false)
            if (success) {
                toast.push(
                    <Notification
                        title={'Successfuly added'}
                        type="success"
                        duration={2500}
                    >
                        Header successfuly added
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
                navigate('/allHeaders')
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
        navigate('/allHeaders')
    }

    return (
        <>
            <SystemHeaderForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default AddHeader

import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import ProductForm, {
    FormModel,
    SetSubmitting,
} from '../ArticleForm/ArticleForm'
import { apiAddNewArticle } from '@/services/ArticlesList'

const AddArticle = () => {
    const navigate = useNavigate()

    const AddArticle = async (data: FormModel) => {
        const response = await apiAddNewArticle(data)
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
                        Article successfuly added
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
        navigate('/articles')
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

export default AddArticle

import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import PackageForm, {
    FormModel,
    SetSubmitting,
} from '../PackageForm/PackageForm'
import { apiAddNewPackage } from '@/services/PackagesList'
import ParentPackageForm from '../PackageForm/ParentPackageForm'

const AddPackage = () => {
    const navigate = useNavigate()

    const AddPackage = async (data: FormModel) => {
        const response = await apiAddNewPackage(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        try {
            const success = await AddPackage(values)
            setSubmitting(false)
            if (success) {
                toast.push(
                    <Notification
                        title={'Successfuly added'}
                        type="success"
                        duration={2500}
                    >
                        Package successfuly added
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
                navigate('/allPackages')
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
        navigate('/allPackages')
    }

    return (
        <>
            <ParentPackageForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default AddPackage

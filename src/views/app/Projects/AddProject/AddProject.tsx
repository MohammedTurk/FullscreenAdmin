import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiAddNewService } from '@/services/ServicesList'

import { apiAddNewProject } from '@/services/ProjectsList'
import ProjectForm, {
    FormModel,
    SetSubmitting,
} from '../ProjectForm/ProjectForm'

const AddProject = () => {
    const navigate = useNavigate()

    const addProject = async (data: FormModel) => {
        const response = await apiAddNewProject(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        try {
            const success = await addProject(values)
            setSubmitting(false)
            if (success) {
                toast.push(
                    <Notification
                        title={'Successfuly added'}
                        type="success"
                        duration={2500}
                    >
                        Project successfuly added
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
                navigate('/allProjects')
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
        navigate('/allProjects')
    }

    return (
        <>
            <ProjectForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default AddProject

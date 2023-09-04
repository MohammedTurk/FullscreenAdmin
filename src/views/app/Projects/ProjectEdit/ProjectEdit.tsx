import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    useAppSelector,
    useAppDispatch,
    getProject,
    deleteProject,
    updateProject,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import ProjectForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/app/Projects/ProjectForm/ProjectForm'
import isEmpty from 'lodash/isEmpty'

injectReducer('projectEditSlice', reducer)

const ProjectEdit = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const projectData = useAppSelector(
        (state) => state?.projectEditSlice?.data?.projectData
    )
    console.log(useAppSelector((state) => state?.projectEditSlice))

    const data: any = {}
    if (projectData) {
        data.name = projectData?.data?.name
        data.category = projectData?.data?.category
        data.arabicDescription = projectData?.data?.description?.ar
        data.englishDescription = projectData?.data?.description?.en
        data.image = projectData?.data?.file
    }

    const loading = useAppSelector(
        (state) => state?.projectEditSlice?.data?.loading
    )

    const fetchData = (data: { _id: string }) => {
        dispatch(getProject(data))
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)

        const success = await updateProject(values, projectData?.data?._id)
        setSubmitting(false)
        if (success) {
            popNotification('updated')
        }
    }

    const handleDiscard = () => {
        navigate('/allProjects')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)

        const success = await deleteProject({ _id: projectData?.data?._id })
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
                Project successfuly {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/allProjects')
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
                {!isEmpty(projectData) && (
                    <>
                        <ProjectForm
                            type="edit"
                            initialData={data}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(projectData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                    />
                    <h3 className="mt-8">No project found!</h3>
                </div>
            )}
        </>
    )
}

export default ProjectEdit

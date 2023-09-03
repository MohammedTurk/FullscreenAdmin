import { forwardRef, useState } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import StickyFooter from '@/components/shared/StickyFooter'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Form, Formik, FormikProps } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import JobFields from './JobFields'
import JobFile from './JobFile'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type InitialData = {
    arabicTitle?: string
    englishTitle?: string
    arabicDescription?: string
    englishDescription?: string
    arabicCategory?: string
    englishCategory?: string
    arabicType?: string
    englishType?: string
    arabicRequirements?: string
    englishRequirements?: string
    location?: string
    file?: any
    fileList?: {
        id: string
        name: string
        img: string
    }[]
}

export type FormModel = Omit<InitialData, 'tags'> & {
    tags: { label: string; value: string }[] | string[]
}

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type JobForm = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: any, setSubmitting: SetSubmitting) => void
}

const validationSchema = Yup.object().shape({
    arabicTitle: Yup.string().required('Arabic Job Title is Required'),
    englishTitle: Yup.string().required('English Job Title is Required'),
    arabicDescription: Yup.string().required(
        'Arabic Description Content is Required'
    ),
    englishDescription: Yup.string().required(
        'English Description Content is Required'
    ),
    arabicCategory: Yup.string().required('Arabic Category is Required'),
    englishCategory: Yup.string().required('English Category is Required'),
    arabicType: Yup.string().required('Arabic Type is Required'),
    englishType: Yup.string().required('English Type is Required'),
    arabicRequirements: Yup.string().required(
        'Arabic Requirements is Required'
    ),
    englishRequirements: Yup.string().required(
        'English Requirements is Required'
    ),
    location: Yup.string().required('Location is Required'),
    file: Yup.mixed().required('File is Required'),
})

const DeleteServiceButton = ({ onDelete }: { onDelete: OnDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                Delete
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="Delete Job"
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>Are you sure you want to delete this job?</p>
            </ConfirmDialog>
        </>
    )
}

const JobForm = forwardRef<FormikRef, JobForm>((props, ref) => {
    const {
        type,
        initialData = {
            arabicTitle: '',
            englishTitle: '',
            arabicDescription: '',
            englishDescription: '',
            arabicCategory: '',
            englishCategory: '',
            arabicType: '',
            englishType: '',
            arabicRequirements: '',
            englishRequirements: '',
            location: '',
            fileList: [],
            file: '',
        },
        onFormSubmit,
        onDiscard,
        onDelete,
    } = props

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const data = cloneDeep(values)
                    const formData = new FormData()
                    formData.append('title[ar]', data.arabicTitle)
                    formData.append('title[en]', data.englishTitle)
                    formData.append('description[ar]', data.arabicDescription)
                    formData.append('description[en]', data.englishDescription)
                    formData.append('category[ar]', data.arabicCategory)
                    formData.append('category[en]', data.englishCategory)
                    formData.append('type[ar]', data.arabicType)
                    formData.append('type[en]', data.englishType)
                    formData.append('requirements[ar]', data.arabicRequirements)
                    formData.append(
                        'requirements[en]',
                        data.englishRequirements
                    )
                    formData.append('file', data.file)
                    formData.append('location', data.location)

                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <JobFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                </div>
                                <div className="lg:col-span-1">
                                    <JobFile
                                        values={values}
                                        errors={errors}
                                        touched={touched}
                                    />
                                </div>
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div>
                                    {type === 'edit' && (
                                        <DeleteServiceButton
                                            onDelete={onDelete as OnDelete}
                                        />
                                    )}
                                </div>
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        onClick={() => onDiscard?.()}
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

JobForm.displayName = 'JobForm'

export default JobForm

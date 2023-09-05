import { forwardRef, useState } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import hooks from '@/components/ui/hooks'
import StickyFooter from '@/components/shared/StickyFooter'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Form, Formik, FormikProps } from 'formik'
import SystemHeaderImages from './SystemHeaderImages'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import SystemHeaderFields from './SystemHeaderFields'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type InitialData = {
    type: string
    arabicTitle: string
    englishTitle: string
    arabicContent: string
    englishContent: string
    imageList?: {
        id: string
        name: string
        img: string
    }[]
    image?: string
}

export type FormModel = Omit<InitialData, 'tags'> & {
    tags: { label: string; value: string }[] | string[]
}

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type SystemHeaderForm = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: any, setSubmitting: SetSubmitting) => void
}

const validationSchema = Yup.object().shape({
    arabicTitle: Yup.string().required('Arabic Title Is Required'),
    englishTitle: Yup.string().required('English Title Is Required'),
    arabicContent: Yup.string().required('Arabic Content is Required'),
    englishContent: Yup.string().required('English Content is Required'),
    type: Yup.string().required('Type Is Required'),
    image: Yup.mixed().required('Image is Required'),
})

const DeleteProductButton = ({ onDelete }: { onDelete: OnDelete }) => {
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
                title="Delete header"
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>Are you sure you want to delete this header?</p>
            </ConfirmDialog>
        </>
    )
}

const SystemHeaderForm = forwardRef<FormikRef, SystemHeaderForm>(
    (props, ref) => {
        const {
            type,
            initialData = {
                type: '',
                arabicTitle: '',
                englishTitle: '',
                arabicContent: '',
                englishContent: '',
                imageList: [],
                image: '',
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
                        if (typeof data.image !== 'string') {
                            formData.append('image', data.image)
                        }
                        formData.append('content[en]', data.arabicContent)
                        formData.append('content[ar]', data.englishContent)
                        formData.append('title[en]', data.englishTitle)
                        formData.append('title[ar]', data.arabicTitle)
                        formData.append('type', data.type)

                        onFormSubmit?.(formData, setSubmitting)
                    }}
                >
                    {({ values, touched, errors, isSubmitting }) => (
                        <Form>
                            <FormContainer>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    <div className="lg:col-span-2">
                                        <SystemHeaderFields
                                            touched={touched}
                                            errors={errors}
                                            values={values}
                                        />
                                    </div>
                                    <div className="lg:col-span-1">
                                        <SystemHeaderImages
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
                                            <DeleteProductButton
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
    }
)

SystemHeaderForm.displayName = 'SystemHeaderForm'

export default SystemHeaderForm

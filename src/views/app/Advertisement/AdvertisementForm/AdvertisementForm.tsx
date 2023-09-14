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
import AdvertisementFields from './AdvertisemenFields'
import AdvertisementImage from './AdvertisementImage'
import { injectReducer } from '@/store'
import articlesReducer from '../../Articles/ArticlesList/store'
import packagesReducer from '../../Packages/PackagesList/store'

injectReducer('articlesListSlice', articlesReducer)
injectReducer('PackagesListSlice', packagesReducer)

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type InitialData = {
    type?: string
    relatedId?: string
    image?: string
    active?: boolean
    arabicText?: string
    englishText?: string
    imgList?: {
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

type AdvertisementForm = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: any, setSubmitting: SetSubmitting) => void
}

const validationSchema = Yup.object().shape({
    relatedId: Yup.string().required('This field is required'),
    type: Yup.string().required('Type is Required'),
    image: Yup.mixed().required('Image is Required'),
    englishText: Yup.string().required('English Text is Required'),
    arabicText: Yup.string().required('Arabic Text is Required'),
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
                title="Delete Advertisement "
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>Are you sure you want to delete this advertisement?</p>
            </ConfirmDialog>
        </>
    )
}

const AdvertisementForm = forwardRef<FormikRef, AdvertisementForm>(
    (props, ref) => {
        const {
            type,
            initialData = {
                relatedId: '',
                type: '',
                active: false,
                imgList: [],
                image: '',
                englishText: '',
                arabicText: '',
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

                        formData.append('relatedId', data.relatedId)

                        formData.append('type', data.type)

                        formData.append('text[en]', data.englishText)
                        formData.append('text[ar]', data.arabicText)

                        formData.append('isClosed', !data.active)
                        onFormSubmit?.(formData, setSubmitting)
                    }}
                >
                    {({ values, touched, errors, isSubmitting }) => (
                        <Form>
                            <FormContainer>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    <div className="lg:col-span-2">
                                        <AdvertisementFields
                                            touched={touched}
                                            errors={errors}
                                            values={values}
                                            formType={type}
                                        />
                                    </div>
                                    <div className="lg:col-span-1">
                                        <AdvertisementImage
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
    }
)

AdvertisementForm.displayName = 'AdvertisementForm'

export default AdvertisementForm

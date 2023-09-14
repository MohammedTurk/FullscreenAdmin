import { forwardRef, useState } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import hooks from '@/components/ui/hooks'
import StickyFooter from '@/components/shared/StickyFooter'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Form, Formik, FormikProps } from 'formik'
import ServiceFields from './ServiceFields'
import MainServiceImages from './MainServiceImages'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import SubServiceImages from './SubServiceImages'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type InitialData = {
    arabicName?: string
    englishName?: string
    imageListMain?: {
        id: string
        name: string
        img: string
    }[]
    subImageList?: {
        id: string
        name: string
        img: string
    }[]
    category?: string
    arabicDescription?: string
    englishDescription?: string
    // arabicDetails?: string
    arabicDetails?: string[]
    englishDetails?: string[]
    imageMain?: string
    subImages?: []
}

export type FormModel = Omit<InitialData, 'tags'> & {
    tags: { label: string; value: string }[] | string[]
}

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type ProductForm = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: any, setSubmitting: SetSubmitting) => void
}

const validationSchema = Yup.object().shape({
    arabicName: Yup.string().required('Arabic Service Name Required'),
    englishName: Yup.string().required('English Service Name Required'),
    arabicDescription: Yup.string().required('Arabic Description is Required'),
    englishDescription: Yup.string().required(
        'English Description is Required'
    ),
    category: Yup.string().required('Category Required'),
    arabicDetails: Yup.array().of(
        Yup.string().required('This field is Required')
    ),
    englishDetails: Yup.array().of(
        Yup.string().required('This field is Required')
    ),

    imageMain: Yup.mixed().required('Main Image is Required'),

    subImageList: Yup.array().min(1, 'At least one image is required'),
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
                title="Delete service"
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>Are you sure you want to delete this service?</p>
            </ConfirmDialog>
        </>
    )
}

const ServiceForm = forwardRef<FormikRef, ProductForm>((props, ref) => {
    const {
        type,
        initialData = {
            arabicName: '',
            englishName: '',
            category: '',
            arabicDescription: '',
            englishDescription: '',
            arabicDetails: [''],
            englishDetails: [''],
            imageListMain: [],
            imageMain: '',
            subImageList: [],
            subImages: [],
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
                        formData.append('mainImage', data.imageMain)
                    }

                    data?.subImages?.forEach((item: any[], index: number) => {
                        if (typeof item === 'string') {
                            return
                        } else {
                            formData.append(`images`, ...item)
                        }
                    })

                    formData.append('description[en]', data.englishDescription)
                    formData.append('description[ar]', data.arabicDescription)

                    data?.englishDetails?.forEach(
                        (item: any, index: number) => {
                            formData.append(`details[${index}][en]`, item)
                        }
                    )

                    data?.arabicDetails?.forEach((item: any, index: number) => {
                        formData.append(`details[${index}][ar]`, item)
                    })

                    formData.append('name[en]', data.englishName)
                    formData.append('name[ar]', data.arabicName)
                    formData.append('category[en]', data.category)

                    let arabicCategory = ''
                    if (data.category == 'programming') {
                        arabicCategory = 'برمجة'
                    } else if (data.category == 'marketing') {
                        arabicCategory = 'التسويق'
                    } else if (data.category == 'content creation') {
                        arabicCategory = 'صناعة المحتوى'
                    } else {
                        arabicCategory = 'الهويات التجارية'
                    }

                    formData.append('category[ar]', arabicCategory)

                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                <div className="lg:col-span-2">
                                    <ServiceFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                </div>
                                <div className="lg:col-span-1">
                                    <MainServiceImages
                                        values={values}
                                        errors={errors}
                                        touched={touched}
                                    />
                                    <SubServiceImages
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
})

ServiceForm.displayName = 'ServiceForm'

export default ServiceForm

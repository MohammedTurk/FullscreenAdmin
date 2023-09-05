import { forwardRef, useState } from 'react'
import { FormContainer, FormItem } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import StickyFooter from '@/components/shared/StickyFooter'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Field, Form, Formik, FormikProps } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import PackageFields from './PackageFields'
import JobFile from './JobFile'
import PackageImages from './PackageImages'
import ParentPackageImages from './ParentPackageImages'
import PackageImagesTest from './PackageImagesTest'
import { useAppSelector } from '../PackageItemsList/store'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type InitialData = {
    arabicName?: string
    englishName?: string
    price?: string
    arabicType?: string
    englishType?: string
    arabicServiceNames?: string[]
    englishServiceNames?: string[]
    arabicItems?: string[]
    englishItems?: string[]
    arabicDetails?: string
    englishDetails?: string
    isDefault?: boolean
    img?: []
    imgList?: {
        id: string
        name: string
        img: string
    }[]
    images?: []
    // parentImgList?: []
    // parentImage: string
}

export type FormModel = Omit<InitialData, 'tags'> & {
    tags: { label: string; value: string }[] | string[]
}

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type PackageForm = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: any, setSubmitting: SetSubmitting) => void
}

const validationSchema = Yup.object().shape({
    arabicName: Yup.string().required('Arabic Name is Required'),
    englishName: Yup.string().required('English Name is Required'),
    arabicType: Yup.string().required('Arabic Type is Required'),
    englishType: Yup.string().required('English Type is Required'),

    arabicDetails: Yup.string().required('Arabic Details is Required'),
    englishDetails: Yup.string().required('English Details is Required'),
    price: Yup.number().required('Price is Required'),
    imgList: Yup.array().min(1, 'At least one image is required'),
    arabicServiceNames: Yup.array().of(
        Yup.string().required('Arabic Service Name is Required')
    ),
    englishServiceNames: Yup.array().of(
        Yup.string().required('English Service Name is Required')
    ),
    arabicItems: Yup.array().of(
        Yup.string().required('Arabic Item Name is Required')
    ),
    englishItems: Yup.array().of(
        Yup.string().required('English Item Name is Required')
    ),
    // parentImage: Yup.mixed().required('Image is Required'),
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
                title="Delete Package"
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>Are you sure you want to delete this Package?</p>
            </ConfirmDialog>
        </>
    )
}

const PackageForm = forwardRef<FormikRef, PackageForm>((props, ref) => {
    const {
        type,
        initialData = {
            arabicName: '',
            englishName: '',
            price: '',
            arabicType: '',
            englishType: '',
            arabicServiceNames: [''],
            englishServiceNames: [''],
            arabicItems: [''],
            englishItems: [''],
            arabicDetails: '',
            englishDetails: '',
            isDefault: false,
            img: '',
            imgList: [],
            images: [],
            // parentImgList: [],
            // parentImage: '',
        },
        onFormSubmit,
        onDiscard,
        onDelete,
    } = props
    const selectedPackage = useAppSelector(
        (state) => state.PackageSlice?.data?.selectedPackage
    )

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
                    const path = location.pathname.substring(
                        location.pathname.lastIndexOf('/') + 1
                    )

                    const formData = new FormData()
                    formData.append('parentId', selectedPackage._id || path)
                    formData.append('name[ar]', data.arabicName)
                    formData.append('name[en]', data.englishName)
                    formData.append('price', data.price)
                    formData.append('type[ar]', data.arabicType)
                    formData.append('type[en]', data.englishType)
                    data.arabicServiceNames.forEach(
                        (service: any, index: number) => {
                            formData.append(
                                `serviceNames[${index}][ar]`,
                                service
                            )
                        }
                    )
                    data.englishServiceNames.forEach(
                        (service: any, index: number) => {
                            formData.append(
                                `serviceNames[${index}][en]`,
                                service
                            )
                        }
                    )

                    data.arabicItems.forEach((item: any, index: number) => {
                        formData.append(`items[${index}][ar]`, item)
                    })
                    data.englishItems.forEach((item: any, index: number) => {
                        formData.append(`items[${index}][en]`, item)
                    })

                    formData.append('details[ar]', data.arabicDetails)
                    formData.append('details[en]', data.englishDetails)
                    console.log('data.imglist', data.imgList)

                    // data.images.forEach((image: any, index: number) => {
                    //     formData.append(`images`, ...image)
                    // })

                    data.images.forEach((item: any[], index: number) => {
                        if (typeof item === 'string') {
                            return
                        } else {
                            formData.append(`images`, ...item)
                        }
                    })

                    formData.append('isDefault', data.isDefault)

                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <PackageFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                </div>
                                <div className="lg:col-span-1">
                                    <PackageImages values={values} />
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

PackageForm.displayName = 'PackageForm'

export default PackageForm

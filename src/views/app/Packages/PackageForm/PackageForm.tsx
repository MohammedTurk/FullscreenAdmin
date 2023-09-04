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
    function createFileList(data) {
        const fileList = []

        // Iterate through the data array
        for (let i = 0; i < data.length; i++) {
            const fileArray = data[i]

            // Check if the element is an array and has at least one item
            if (Array.isArray(fileArray) && fileArray.length > 0) {
                const file = fileArray[0]

                // Check if the item is a File object
                if (file instanceof File) {
                    fileList.push(file)
                }
            }
        }

        // Create a DataTransfer object and set its files property
        const dataTransfer = new DataTransfer()
        fileList.forEach((file) => {
            dataTransfer.items.add(file)
        })

        return dataTransfer.files
    }
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
                    // formData.append('icon', data.parentImage)
                    formData.append('parentId', path)
                    formData.append('name[ar]', data.arabicName)
                    formData.append('name[en]', data.englishName)
                    formData.append('price', data.price)
                    formData.append('type[ar]', data.arabicType)
                    formData.append('type[en]', data.englishType)
                    formData.append('serviceNames[ar]', data.arabicServiceNames)
                    formData.append(
                        'serviceNames[en]',
                        data.englishServiceNames
                    )
                    formData.append('items[ar]', data.arabicItems)
                    formData.append('items[en]', data.englishItems)
                    formData.append('details[ar]', data.arabicDetails)
                    formData.append('details[en]', data.englishDetails)
                    data.images.forEach((image: any, index) => {
                        formData.append(`images`, ...image)
                    })
                    // const fileList = createFileList(data.images)

                    // formData.append('images', fileList)
                    // console.log(fileList)

                    formData.append('isDefault', data.isDefault)
                    // formData.append('isDefault', data.isDefault)

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
                                    {/* <div className="mb-5">
                                        <ParentPackageImages
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                        />
                                    </div> */}
                                    <PackageImages values={values} />
                                    {/* <PackageImagesTest values={values} /> */}
                                    {/* <div>
                                        <label htmlFor="file">
                                            Upload File:
                                        </label>
                                        <FormItem>
                                            <Field name="images">
                                                {({ field, form }) => (
                                                    <input
                                                        multiple
                                                        type="file"
                                                        id="file"
                                                        name="file"
                                                        onChange={(event) => {
                                                            form.setFieldValue(
                                                                'images',
                                                                event
                                                                    .currentTarget
                                                                    .files
                                                            )
                                                        }}
                                                        accept=".jpg, .jpeg, .png, .pdf" // Define the accepted file types
                                                    />
                                                )}
                                            </Field>
                                        </FormItem>
                                    </div> */}
                                    {/* <div>
                                        <h4>Selected File:</h4>
                                        {values.file ? (
                                            <p>{values.file.name}</p>
                                        ) : (
                                            <p>No file selected</p>
                                        )}
                                    </div> */}
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

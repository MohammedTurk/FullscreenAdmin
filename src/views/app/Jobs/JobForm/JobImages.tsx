import { useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import { FormItem } from '@/components/ui/Form'
import Dialog from '@/components/ui/Dialog'
import Upload from '@/components/ui/Upload'
import { HiEye, HiTrash } from 'react-icons/hi'
import cloneDeep from 'lodash/cloneDeep'
import {
    Field,
    FieldProps,
    FieldInputProps,
    FormikProps,
    FormikTouched,
    FormikErrors,
} from 'formik'

type Image = {
    id: string
    name: string
    img: string
}

type FormFieldsName = {
    imgList: []
    image: string
}

type FormModel = {
    image: string
    [key: string]: any
    imgList: any
}

type ImageListProps = {
    image: string
    onImageDelete: (image: string) => void
    imgList: [
        {
            img: string
        }
    ]
}

type ServiceImagesProps = {
    values: FormModel
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

const ImageList = (props: ImageListProps) => {
    const { image, onImageDelete, imgList } = props

    const [selectedImg, setSelectedImg] = useState<string>('')
    const [viewOpen, setViewOpen] = useState(false)
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const onViewOpen = (image: string) => {
        setSelectedImg(image)
        setViewOpen(true)
    }

    const onDialogClose = () => {
        setViewOpen(false)
        setTimeout(() => {
            setSelectedImg('')
        }, 300)
    }

    const onDeleteConfirmation = (image: string) => {
        setSelectedImg(image)
        setDeleteConfirmationOpen(true)
    }

    const onDeleteConfirmationClose = () => {
        setSelectedImg('')
        setDeleteConfirmationOpen(false)
    }

    const onDelete = () => {
        onImageDelete?.(selectedImg)
        setDeleteConfirmationOpen(false)
    }
    let imageData = ''
    if (imgList !== undefined) {
        imageData = imgList[0]?.img
    }

    return (
        <>
            <div className="group relative rounded border p-2 flex">
                <img
                    className="rounded max-h-[140px] max-w-full"
                    src={imageData || image}
                    alt="image"
                />
                <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                    <span
                        className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                        onClick={() => onViewOpen(image)}
                    >
                        <HiEye />
                    </span>
                    <span
                        className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                        onClick={() => onDeleteConfirmation(image)}
                    >
                        <HiTrash />
                    </span>
                </div>
            </div>

            <Dialog
                isOpen={viewOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <img className="w-full" src={selectedImg} alt="image" />
            </Dialog>
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Remove image"
                confirmButtonColor="red-600"
                onClose={onDeleteConfirmationClose}
                onRequestClose={onDeleteConfirmationClose}
                onCancel={onDeleteConfirmationClose}
                onConfirm={onDelete}
            >
                <p> Are you sure you want to remove this image? </p>
            </ConfirmDialog>
        </>
    )
}

const JobImages = (props: ServiceImagesProps) => {
    const { touched, errors, values } = props

    const beforeUpload = (file: FileList | null) => {
        let valid: boolean | string = true

        const allowedFileType = ['image/jpeg', 'image/png', 'image/svg']
        const maxFileSize = 5000000

        if (file) {
            for (const f of file) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }

                if (f.size >= maxFileSize) {
                    valid = 'Upload image cannot more then 5000kb!'
                }
            }
        }

        return valid
    }

    const onUpload = (
        form: FormikProps<FormModel>,
        field: FieldInputProps<FormModel>,
        files: File[]
    ) => {
        const imageId = '1-img-0'

        const latestUpload = files.length - 1

        const image = {
            id: imageId,
            name: files[latestUpload].name,
            img: URL.createObjectURL(files[latestUpload]),
        }

        const imgList = [image]

        form.setFieldValue('imgList', imgList)
        form.setFieldValue('image', files[0])
    }

    const handleImageDelete = (
        form: FormikProps<FormModel>,
        field: FieldInputProps<FormModel>
    ) => {
        console.log('field.name', field.name)

        form.setFieldValue('imgList', [])
        form.setFieldValue('image', '')
    }

    return (
        <AdaptableCard className="mb-4">
            <h5>Job Image</h5>
            <p className="mb-6">Add or change image for the job</p>
            <FormItem
                invalid={(errors.image && touched.image) as boolean}
                errorMessage={errors.image}
            >
                <Field name="image">
                    {({ field, form }: FieldProps) => {
                        if (values.imgList?.length > 0 || values.image) {
                            return (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                    <ImageList
                                        image={values.image}
                                        onImageDelete={(image: string) =>
                                            handleImageDelete(form, field)
                                        }
                                        imgList={values.imgList}
                                    />
                                    <Upload
                                        draggable
                                        className="min-h-fit"
                                        beforeUpload={beforeUpload}
                                        showList={false}
                                        onChange={(files) =>
                                            onUpload(form, field, files)
                                        }
                                    >
                                        <div className="max-w-full flex flex-col px-4 py-2 justify-center items-center">
                                            <DoubleSidedImage
                                                src="/img/others/upload.png"
                                                darkModeSrc="/img/others/upload-dark.png"
                                            />
                                            <p className="font-semibold text-center text-gray-800 dark:text-white">
                                                Upload
                                            </p>
                                        </div>
                                    </Upload>
                                </div>
                            )
                        }

                        return (
                            <Upload
                                draggable
                                beforeUpload={beforeUpload}
                                showList={false}
                                onChange={(files) =>
                                    onUpload(form, field, files)
                                }
                            >
                                <div className="my-16 text-center">
                                    <DoubleSidedImage
                                        className="mx-auto"
                                        src="/img/others/upload.png"
                                        darkModeSrc="/img/others/upload-dark.png"
                                    />
                                    <p className="font-semibold">
                                        <span className="text-gray-800 dark:text-white">
                                            Drop your image here, or{' '}
                                        </span>
                                        <span className="text-blue-500">
                                            browse
                                        </span>
                                    </p>
                                    <p className="mt-1 opacity-60 dark:text-white">
                                        Support: jpeg, png
                                    </p>
                                </div>
                            </Upload>
                        )
                    }}
                </Field>
            </FormItem>
        </AdaptableCard>
    )
}

export default JobImages

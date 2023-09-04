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
    parentImgList: []
    parentImage: string
}

type FormModel = {
    parentImage: string
    [key: string]: any
    parentImgList: any
}

type ImageListProps = {
    parentImage: string
    onImageDelete: (image: string) => void
    parentImgList: [
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
    const { parentImage, onImageDelete, parentImgList } = props

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
    if (parentImgList !== undefined) {
        imageData = parentImgList[0]?.img
    }

    return (
        <>
            <div className="group relative rounded border p-2 flex">
                <img
                    className="rounded max-h-[140px] max-w-full"
                    src={imageData || parentImage}
                    alt="image"
                />
                <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                    <span
                        className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                        onClick={() => onViewOpen(parentImage)}
                    >
                        <HiEye />
                    </span>
                    <span
                        className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                        onClick={() => onDeleteConfirmation(parentImage)}
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

const ParentPackageImages = (props: ServiceImagesProps) => {
    const { touched, errors, values } = props

    const beforeUpload = (file: FileList | null) => {
        let valid: boolean | string = true

        const allowedFileType = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/svg',
            'image/jpg',
        ]
        const maxFileSize = 5000000

        if (file) {
            for (const f of file) {
                if (!allowedFileType.includes(f.type)) {
                    valid =
                        'Please upload a .jpeg or .png  or gif or svg or jpg!'
                }

                if (f.size >= maxFileSize) {
                    valid = 'Upload image cannot more then 50000kb!'
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

        const parentImgList = [image]

        form.setFieldValue('parentImgList', parentImgList)
        form.setFieldValue('parentImage', files[0])
    }

    const handleImageDelete = (
        form: FormikProps<FormModel>,
        field: FieldInputProps<FormModel>
    ) => {
        form.setFieldValue('parentImgList', [])
        form.setFieldValue('parentImage', '')
    }

    return (
        <AdaptableCard className="mb-4">
            <h5>Parent Package Image</h5>
            <p className="mb-6">Add or change image for the parent Package</p>
            <FormItem
                invalid={(errors.parentImage && touched.parentImage) as boolean}
                errorMessage={errors.parentImage}
            >
                <Field name="image">
                    {({ field, form }: FieldProps) => {
                        if (
                            values.parentImgList?.length > 0 ||
                            values.parentImage
                        ) {
                            return (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                    <ImageList
                                        parentImage={values.image}
                                        onImageDelete={(image: string) =>
                                            handleImageDelete(form, field)
                                        }
                                        parentImgList={values.parentImgList}
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
                                </div>
                            </Upload>
                        )
                    }}
                </Field>
            </FormItem>
        </AdaptableCard>
    )
}

export default ParentPackageImages

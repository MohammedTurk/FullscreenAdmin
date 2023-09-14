import { useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import { FormItem } from '@/components/ui/Form'
import Dialog from '@/components/ui/Dialog'
import Upload from '@/components/ui/Upload'
import { HiEye, HiTrash } from 'react-icons/hi'
import cloneDeep from 'lodash/cloneDeep'
import { Field, FieldProps, FieldInputProps, FormikProps } from 'formik'
import { Notification, toast } from '@/components/ui'

type Image = {
    id: string
    name: string
    img: string
}

type FormModel = {
    subImageList: Image[]
    subImages: []
    [key: string]: unknown
}

type ImageListProps = {
    subImageList: Image[]
    onImageDelete: (img: Image) => void
}

type ProductImagesProps = {
    values: FormModel
}

const ImageList = (props: ImageListProps) => {
    const { subImageList, onImageDelete } = props

    const [selectedImg, setSelectedImg] = useState<Image>({} as Image)
    const [viewOpen, setViewOpen] = useState(false)
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const onViewOpen = (img: Image) => {
        setSelectedImg(img)
        setViewOpen(true)
    }

    const onDialogClose = () => {
        setViewOpen(false)
        setTimeout(() => {
            setSelectedImg({} as Image)
        }, 300)
    }

    const onDeleteConfirmation = (img: Image) => {
        setSelectedImg(img)
        setDeleteConfirmationOpen(true)
    }

    const onDeleteConfirmationClose = () => {
        setSelectedImg({} as Image)
        setDeleteConfirmationOpen(false)
    }

    const onDelete = () => {
        onImageDelete?.(selectedImg)
        setDeleteConfirmationOpen(false)
    }

    return (
        <>
            {subImageList.map((img) => (
                <div
                    key={img?.id}
                    className="group relative rounded border p-2 flex"
                >
                    <img
                        className="rounded max-h-[140px] max-w-full"
                        src={img?.img || img}
                        alt={img?.name || 'image'}
                    />
                    <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                        <span
                            className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                            onClick={() => onViewOpen(img)}
                        >
                            <HiEye />
                        </span>
                        <span
                            className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                            onClick={() => onDeleteConfirmation(img)}
                        >
                            <HiTrash />
                        </span>
                    </div>
                </div>
            ))}
            <Dialog
                isOpen={viewOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">{selectedImg?.name}</h5>
                <img
                    className="w-full"
                    src={selectedImg?.img || selectedImg}
                    alt={selectedImg?.name}
                />
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

const SubServiceImages = (props: ProductImagesProps) => {
    const { values } = props

    const beforeUpload = (file: FileList | null) => {
        let valid: boolean | string = true

        const allowedFileType = [
            'image/jpeg',
            'image/png',
            'image/svg',
            'image/jpg',
            'image/gif',
        ]
        const maxFileSize = 3000000

        if (file) {
            for (const f of file) {
                if (!allowedFileType.includes(f.type)) {
                    valid =
                        'Please upload a .jpeg or .png  or gif or svg or jpg!'
                }

                if (f.size >= maxFileSize) {
                    valid = 'Upload image cannot more then 3MB!'
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
        const MAX_IMAGE_LIMIT = 50

        let imageId = '1-img-0'

        const latestUpload = files.length - 1

        if (values.subImageList.length >= MAX_IMAGE_LIMIT) {
            toast.push(
                <Notification title={'Error'} type="danger" duration={2500}>
                    Maximum image limit reached
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            return
        }

        if (values.subImageList.length > 0) {
            const lastImage =
                values.subImageList[values.subImageList.length - 1]
            if (lastImage && lastImage.id) {
                const prevImgId = lastImage.id
                const splitImgId = prevImgId.split('-')
                const newIdNumber =
                    parseInt(splitImgId[splitImgId.length - 1]) + 1
                splitImgId.pop()
                const newIdArr = [...splitImgId, ...[newIdNumber]]
                imageId = newIdArr.join('-')
            }
        }

        const image = {
            id: imageId,
            name: files[latestUpload].name,
            img: URL.createObjectURL(files[latestUpload]),
        }

        const imageList = [...values.subImageList, ...[image]]

        form.setFieldValue(field.name, imageList)
        form.setFieldValue('subImages', [...values.subImages, files])
        console.log('subImages', [...values.subImages, files])
    }

    const handleImageDelete = (
        form: FormikProps<FormModel>,
        field: FieldInputProps<FormModel>,
        deletedImg: Image
    ) => {
        let subImageList = cloneDeep(values.subImageList)
        subImageList = subImageList.filter((img) => img?.id !== deletedImg?.id)

        const deletedImageIndex = values.subImageList.findIndex(
            (img) => img?.id === deletedImg?.id
        )
        console.log('subImages', values.subImages)

        if (deletedImageIndex !== -1) {
            // Remove the deleted image file from the images array
            const updatedImages = [...values.subImages]
            updatedImages.splice(deletedImageIndex, 1)
            form.setFieldValue(field.name, subImageList)
            form.setFieldValue('subImages', updatedImages)
        }

        form.setFieldValue(field.name, subImageList)
    }

    return (
        <AdaptableCard className="mb-4">
            <h5> Service Images</h5>
            <p className="mb-6">Add or change images for the service</p>
            <FormItem>
                <Field name="subImageList">
                    {({ field, form }: FieldProps) => {
                        if (values?.subImageList?.length > 0) {
                            return (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                    <ImageList
                                        subImageList={values.subImageList}
                                        onImageDelete={(img: Image) =>
                                            handleImageDelete(form, field, img)
                                        }
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
                            <>
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
                                {form.errors.subImageList &&
                                    form.touched.subImageList && (
                                        <div className="text-red-500">
                                            {form.errors.subImageList}
                                        </div>
                                    )}
                            </>
                        )
                    }}
                </Field>
            </FormItem>
        </AdaptableCard>
    )
}

export default SubServiceImages

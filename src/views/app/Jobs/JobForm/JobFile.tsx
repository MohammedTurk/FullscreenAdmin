import { useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { FormItem } from '@/components/ui/Form'
import Dialog from '@/components/ui/Dialog'
import Upload from '@/components/ui/Upload'
import { HiTrash } from 'react-icons/hi'

import {
    Field,
    FieldProps,
    FieldInputProps,
    FormikProps,
    FormikTouched,
    FormikErrors,
} from 'formik'

type FormFieldsName = {
    imgList: []
    file: string
}

type FormModel = {
    file: string
    [key: string]: any
    imgList: any
}

type ImageListProps = {
    file: any
    onImageDelete: (file: string) => void
    fileList: [
        {
            img: string
            id: string
            name: string
        }
    ]
}

type ServiceImagesProps = {
    values: FormModel
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

const FileList = (props: ImageListProps) => {
    const { file, onImageDelete, fileList } = props

    const [selectedImg, setSelectedImg] = useState<string>('')
    const [viewOpen, setViewOpen] = useState(false)
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const onViewOpen = (file: string) => {
        setSelectedImg(file)
        setViewOpen(true)
    }

    const onDialogClose = () => {
        setViewOpen(false)
        setTimeout(() => {
            setSelectedImg('')
        }, 300)
    }

    const onDeleteConfirmation = (file: string) => {
        setSelectedImg(file)
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
    let fileData = ''
    if (fileList !== undefined) {
        fileData = fileList[0]?.img
    }

    return (
        <>
            <div className="group relative rounded border p-2 flex">
                <p>{file?.name}</p>
                <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                    <span
                        className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                        onClick={() => onDeleteConfirmation(file)}
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
                <img className="w-full" src={selectedImg} alt="file" />
            </Dialog>
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Remove File"
                confirmButtonColor="red-600"
                onClose={onDeleteConfirmationClose}
                onRequestClose={onDeleteConfirmationClose}
                onCancel={onDeleteConfirmationClose}
                onConfirm={onDelete}
            >
                <p> Are you sure you want to remove this File? </p>
            </ConfirmDialog>
        </>
    )
}

const JobFile = (props: ServiceImagesProps) => {
    const { touched, errors, values } = props

    const beforeUpload = (file: FileList | null) => {
        let valid: boolean | string = true

        const allowedFileType = [
            'image/jpeg',
            'image/png',
            'image/svg',
            'image/jpg',
            'image/gif',
            'image/webp',
            'application/pdf',
        ]
        const maxFileSize = 5000000

        if (file) {
            for (const f of file) {
                if (!allowedFileType.includes(f.type)) {
                    valid =
                        'Please upload a .jpeg or .png or svg or jpg or webp or pdf file!'
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
        files: any[]
    ) => {
        const fileId = '1-img-0'

        const latestUpload = files.length - 1

        const file = {
            id: fileId,
            name: files[latestUpload].name,
            img: URL.createObjectURL(files[latestUpload]),
        }

        const fileList = [file]

        form.setFieldValue('fileList', fileList)
        form.setFieldValue('file', files[0])
    }

    const handleImageDelete = (
        form: FormikProps<FormModel>,
        field: FieldInputProps<FormModel>
    ) => {
        form.setFieldValue('fileList', [])
        form.setFieldValue('file', '')
    }

    return (
        <AdaptableCard className="mb-4">
            <h5>Job File</h5>
            <p className="mb-6">Add or change File for the job</p>
            <FormItem
                invalid={(errors.file && touched.file) as boolean}
                errorMessage={errors.file}
            >
                <Field name="file">
                    {({ field, form }: FieldProps) => {
                        if (values.fileList?.length > 0 || values.file) {
                            return (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-1 gap-4">
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
                                            {/* <DoubleSidedImage
                                                    src="/img/others/upload.png"
                                                    darkModeSrc="/img/others/upload-dark.png"
                                                /> */}
                                            <p className="font-semibold text-center text-gray-800 dark:text-white">
                                                Upload
                                            </p>
                                        </div>
                                    </Upload>
                                    <FileList
                                        file={values.file}
                                        onImageDelete={(file: string) =>
                                            handleImageDelete(form, field)
                                        }
                                        fileList={values.fileList}
                                    />
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
                                    <p className="font-semibold">
                                        <span className="text-gray-800 dark:text-white">
                                            Drop your file here, or{' '}
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

export default JobFile

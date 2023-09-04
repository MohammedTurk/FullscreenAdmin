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
import PackageFields from './PackageFields'
import JobFile from './JobFile'
import PackageImages from './PackageImages'
import ParentPackageImages from './ParentPackageImages'
import PackageEditFields from './PackageEditFields'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type InitialData = {
    name: string
    price: number
    details: string
    items: string[]
    services: { image: string; name: string }[]
    type: string
    isDefault: string
}[]

export type FormModel = Omit<InitialData, 'tags'> & {
    tags: { label: string; value: string }[] | string[]
}

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type PackageForm = {
    initialData?: InitialData
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: any, setSubmitting: SetSubmitting) => void
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is Required'),
    price: Yup.number().required('Price is Required'),
    details: Yup.string().required('Details is Required'),
    services: Yup.array().of(Yup.string().required('Service Name is Required')),
    items: Yup.array().of(Yup.string().required('Item Name is Required')),
    type: Yup.string().required('Type is Required'),
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

const PackageFormEdit = forwardRef<FormikRef, PackageForm>((props, ref) => {
    const {
        initialData = [
            {
                name: '',
                price: 0,
                details: '',
                items: [''],
                services: [],
                type: '',
                isDefault: '',
            },
        ],
        onFormSubmit,
        onDiscard,
        onDelete,
    } = props

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData[0],
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const data = cloneDeep(values)

                    const formData = new FormData()
                    // formData.append('icon', data.parentImage)
                    // formData.append('name[ar]', data.arabicName)
                    // formData.append('name[en]', data.englishName)
                    // formData.append('price', data.price)
                    // formData.append('type[ar]', data.arabicType)
                    // formData.append('type[en]', data.englishType)
                    // formData.append('serviceNames[ar]', data.arabicServiceNames)
                    // formData.append(
                    //     'serviceNames[en]',
                    //     data.englishServiceNames
                    // )
                    // formData.append('items[ar]', data.arabicItems)
                    // formData.append('items[en]', data.englishItems)
                    // formData.append('details[ar]', data.arabicDetails)
                    // formData.append('details[en]', data.englishDetails)
                    // formData.append('images', data.images)
                    // formData.append('isDefault', data.isDefault)

                    // onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <PackageEditFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                </div>
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div>
                                    <DeleteServiceButton
                                        onDelete={onDelete as OnDelete}
                                    />
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

PackageFormEdit.displayName = 'PackageFormEdit'

export default PackageFormEdit

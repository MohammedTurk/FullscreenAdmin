import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import {
    Field,
    FormikErrors,
    FormikTouched,
    FieldProps,
    FieldArray,
} from 'formik'
import Button from '@/components/ui/Button'

import {
    HiHashtag,
    HiMinusSm,
    HiOutlineViewGridAdd,
    HiOutlineWifi,
    HiPlus,
    HiViewGridAdd,
} from 'react-icons/hi'

type FormFieldsName = {
    title: string
    content: string
}

type AdvertisementFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: any
}

const AdvertisementFields = (props: AdvertisementFields) => {
    const { values, touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Advertisement Information</h5>
            <p className="mb-6">
                Section to config basic advertisement information
            </p>
            <FormItem
                label="Advertisement Title"
                invalid={(errors.title && touched.title) as boolean}
                errorMessage={errors.title}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="title"
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>

            <FormItem
                label="Content"
                labelClass="!justify-start"
                invalid={(errors.content && touched.content) as boolean}
                errorMessage={errors.content}
            >
                <Field name="content">
                    {({ field, form }: FieldProps) => (
                        <RichTextEditor
                            value={field.value}
                            onChange={(val) =>
                                form.setFieldValue(field.name, val)
                            }
                        />
                    )}
                </Field>
            </FormItem>
        </AdaptableCard>
    )
}

export default AdvertisementFields

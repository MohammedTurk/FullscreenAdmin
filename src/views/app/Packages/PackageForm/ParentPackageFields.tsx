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
import { Button, Checkbox, Select } from '@/components/ui'
import { HiMinusSm, HiPlus } from 'react-icons/hi'

type FormFieldsName = {
    arabicName?: string
    englishName?: string
}

type PackageFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: any
}

const ParentPackageFields = (props: PackageFields) => {
    const { values, touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Parent Package Information</h5>
            <p className="mb-6">
                Section to config basic parent package information
            </p>
            <FormItem
                label="Arabic Name  "
                invalid={(errors.arabicName && touched.arabicName) as boolean}
                errorMessage={errors.arabicName}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="arabicName"
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="English Name  "
                invalid={(errors.englishName && touched.englishName) as boolean}
                errorMessage={errors.englishName}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="englishName"
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>
        </AdaptableCard>
    )
}

export default ParentPackageFields

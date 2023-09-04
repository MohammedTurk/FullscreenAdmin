import AdaptableCard from '@/components/shared/AdaptableCard'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'

type FormFieldsName = {
    firstName: string
    lastName: string
    email: string
    phone: string
    specialization: string
    cv: string
    arabicTitle: string
    englishTitle: string
    degree: string
}

type JobFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: any
}

const JobApplicationFields = (props: JobFields) => {
    const { values, touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5 className="mb-6">Job Application Details</h5>
            <FormItem label="Arabic Job Title">
                <Field
                    type="text"
                    autoComplete="off"
                    name="arabicTitle"
                    component={Input}
                    disabled
                />
            </FormItem>
            <FormItem label="English Job Title">
                <Field
                    type="text"
                    autoComplete="off"
                    name="englishTitle"
                    disabled
                    component={Input}
                />
            </FormItem>
            <FormItem label="First Name">
                <Field
                    type="text"
                    autoComplete="off"
                    disabled
                    name="firstName"
                    component={Input}
                />
            </FormItem>
            <FormItem label="Last Name">
                <Field
                    disabled
                    type="text"
                    autoComplete="off"
                    name="lastName"
                    component={Input}
                />
            </FormItem>
            <FormItem label="Email">
                <Field
                    disabled
                    type="text"
                    autoComplete="off"
                    name="email"
                    component={Input}
                />
            </FormItem>
            <FormItem label="Phone">
                <Field
                    type="text"
                    disabled
                    autoComplete="off"
                    name="phone"
                    component={Input}
                />
            </FormItem>
            <FormItem label="Specialization">
                <Field
                    type="text"
                    disabled
                    autoComplete="off"
                    name="specialization"
                    component={Input}
                />
            </FormItem>
            <FormItem label="Degree">
                <Field
                    type="text"
                    disabled
                    autoComplete="off"
                    name="degree"
                    component={Input}
                />
            </FormItem>
        </AdaptableCard>
    )
}

export default JobApplicationFields

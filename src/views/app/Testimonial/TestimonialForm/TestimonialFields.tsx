import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'

type FormFieldsName = {
    name: string
    arabicContent: string
    englishContent: string
}

type TestimonialFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: any
}

const TestimonialFields = (props: TestimonialFields) => {
    const { values, touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Testimonial Information</h5>
            <p className="mb-6">
                Section to config basic testimonial information
            </p>
            <FormItem
                label="Testimonial Title"
                invalid={(errors.name && touched.name) as boolean}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>

            <FormItem
                label="Arabic Content"
                labelClass="!justify-start"
                invalid={
                    (errors.arabicContent && touched.arabicContent) as boolean
                }
                errorMessage={errors.arabicContent}
            >
                <Field name="arabicContent">
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

            <FormItem
                label="English Content"
                labelClass="!justify-start"
                invalid={
                    (errors.englishContent && touched.englishContent) as boolean
                }
                errorMessage={errors.englishContent}
            >
                <Field name="englishContent">
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

export default TestimonialFields

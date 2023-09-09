import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { Select } from '@/components/ui'

type FormFieldsName = {
    type: string
    arabicTitle: string
    englishTitle: string
    arabicContent: string
    englishContent: string
}

type SystemHeaderFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        type: string
    }
}

const SystemHeaderFields = (props: SystemHeaderFields) => {
    const { values, touched, errors } = props

    const types = [
        { label: 'Main', value: 'main' },
        { label: 'Package', value: 'package' },
        { label: 'Service', value: 'service' },
        { label: 'Job', value: 'job' },
    ]

    return (
        <AdaptableCard divider className="mb-4">
            <h5>System Header Information</h5>
            <p className="mb-6">
                Section to config basic system header information
            </p>
            <FormItem
                label="Arabic Title"
                invalid={(errors.arabicTitle && touched.arabicTitle) as boolean}
                errorMessage={errors.arabicTitle}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="arabicTitle"
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>

            <FormItem
                label="English Title"
                invalid={
                    (errors.englishTitle && touched.englishTitle) as boolean
                }
                errorMessage={errors.englishTitle}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="englishTitle"
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>

            <FormItem
                label="Type"
                invalid={(errors.type && touched.type) as boolean}
                errorMessage={errors.type}
            >
                <Field name="type">
                    {({ field, form }: FieldProps) => (
                        <Select
                            field={field}
                            form={form}
                            options={types}
                            value={types.filter(
                                (type) => type.value === values.type
                            )}
                            onChange={(option) => {
                                form.setFieldValue(field.name, option?.value)
                            }}
                        />
                    )}
                </Field>
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

export default SystemHeaderFields

import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { Select } from '@/components/ui'

type FormFieldsName = {
    arabicName: string
    englishName: string
    arabicDescription: string
    englishDescription: string
    category: string
    arabicDetails: string
    englishDetails: string
}

type ServiceFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        category: string
    }
}

const ServiceFields = (props: ServiceFields) => {
    const categories = [
        { label: 'Programming', value: 'programming' },
        { label: 'Content Creation', value: 'content creation' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Branding', value: 'branding' },
    ]

    const { values, touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Service Information</h5>
            <p className="mb-6">Section to config basic service information</p>
            <FormItem
                label="Arabic Service Name"
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
                label="English Service Name"
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

            <FormItem
                label="Category"
                invalid={(errors.category && touched.category) as boolean}
                errorMessage={errors.category}
            >
                <Field name="category">
                    {({ field, form }: FieldProps) => (
                        <Select
                            field={field}
                            form={form}
                            options={categories}
                            value={categories.filter(
                                (category) => category.value === values.category
                            )}
                            onChange={(option) => {
                                form.setFieldValue(field.name, option?.value)
                            }}
                        />
                    )}
                </Field>
            </FormItem>
            <FormItem
                label="Arabic Description"
                labelClass="!justify-start"
                invalid={
                    (errors.arabicDescription &&
                        touched.arabicDescription) as boolean
                }
                errorMessage={errors.arabicDescription}
            >
                <Field name="arabicDescription">
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
                label="English Description"
                labelClass="!justify-start"
                invalid={
                    (errors.englishDescription &&
                        touched.englishDescription) as boolean
                }
                errorMessage={errors.englishDescription}
            >
                <Field name="englishDescription">
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
                label="Arabic Details"
                labelClass="!justify-start"
                invalid={
                    (errors.arabicDetails && touched.arabicDetails) as boolean
                }
                errorMessage={errors.arabicDetails}
            >
                <Field name="arabicDetails">
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
                label="English Details"
                labelClass="!justify-start"
                invalid={
                    (errors.englishDetails && touched.englishDetails) as boolean
                }
                errorMessage={errors.englishDetails}
            >
                <Field name="englishDetails">
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

export default ServiceFields

import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { Select } from '@/components/ui'

type FormFieldsName = {
    arabicTitle?: string
    englishTitle?: string
    arabicDescription?: string
    englishDescription?: string
    arabicCategory?: string
    englishCategory?: string
    arabicType?: string
    englishType?: string
    arabicRequirements?: string
    englishRequirements?: string
    location?: string
}

type JobFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: any
}

const JobFields = (props: JobFields) => {
    const { values, touched, errors } = props
    const englishTypes = [
        { label: 'Full Time', value: 'full time' },
        { label: 'Part Time', value: 'part time' },
        { label: 'Freelance', value: 'freelance' },
        { label: 'Internship', value: 'internship' },
    ]
    const arabicTypes = [
        { label: 'دوام كامل', value: 'دوام كامل' },
        { label: 'دوام جزئي', value: 'دوام جزئي' },
        { label: 'عمل حر', value: 'عمل حر' },
        { label: 'تدريب', value: 'تدريب' },
    ]

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Job Information</h5>
            <p className="mb-6">Section to config basic job information</p>
            <FormItem
                label="Arabic Job Title"
                invalid={(errors.arabicTitle && touched.arabicTitle) as boolean}
                errorMessage={errors.arabicTitle}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="arabicTitle"
                    placeholder="Job Title"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="English Job Title"
                invalid={
                    (errors.englishTitle && touched.englishTitle) as boolean
                }
                errorMessage={errors.englishTitle}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="englishTitle"
                    placeholder="Job Title"
                    component={Input}
                />
            </FormItem>

            <FormItem
                label="Location"
                invalid={(errors.location && touched.location) as boolean}
                errorMessage={errors.location}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="location"
                    placeholder="Job Title"
                    component={Input}
                />
            </FormItem>

            <FormItem
                label="Arabic Category"
                invalid={
                    (errors.arabicCategory && touched.arabicCategory) as boolean
                }
                errorMessage={errors.arabicCategory}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="arabicCategory"
                    placeholder="Category"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="English Category"
                invalid={
                    (errors.englishCategory &&
                        touched.englishCategory) as boolean
                }
                errorMessage={errors.englishCategory}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="englishCategory"
                    placeholder="Category"
                    component={Input}
                />
            </FormItem>

            <FormItem
                label="Arabic Type"
                invalid={(errors.arabicType && touched.arabicType) as boolean}
                errorMessage={errors.arabicType}
            >
                <Field name="arabicType">
                    {({ field, form }: FieldProps) => (
                        <Select
                            field={field}
                            form={form}
                            options={arabicTypes}
                            value={arabicTypes.filter(
                                (type) => type.value === values.arabicType
                            )}
                            onChange={(option) => {
                                form.setFieldValue(field.name, option?.value)
                            }}
                        />
                    )}
                </Field>
            </FormItem>

            <FormItem
                label="English Type"
                invalid={(errors.englishType && touched.englishType) as boolean}
                errorMessage={errors.englishType}
            >
                <Field name="englishType">
                    {({ field, form }: FieldProps) => (
                        <Select
                            field={field}
                            form={form}
                            options={englishTypes}
                            value={englishTypes.filter(
                                (type) => type.value === values.englishType
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
                label="Arabic Requirements"
                labelClass="!justify-start"
                invalid={
                    (errors.arabicRequirements &&
                        touched.arabicRequirements) as boolean
                }
                errorMessage={errors.arabicRequirements}
            >
                <Field name="arabicRequirements">
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
                label="English Requirements"
                labelClass="!justify-start"
                invalid={
                    (errors.englishRequirements &&
                        touched.englishRequirements) as boolean
                }
                errorMessage={errors.englishRequirements}
            >
                <Field name="englishRequirements">
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

export default JobFields

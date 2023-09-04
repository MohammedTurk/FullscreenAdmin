import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { Select } from '@/components/ui'

type FormFieldsName = {
    name: string
    arabicDescription: string
    englishDescription: string
    category: string
}

type ProjectFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        category: string
    }
}

const ProjectFields = (props: ProjectFields) => {
    const categories = [
        { label: 'Web', value: 'web' },
        { label: 'Content Creation', value: 'content_creation' },
        { label: 'Mobile', value: 'mobile' },
    ]

    const { values, touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Project Information</h5>
            <p className="mb-6">Section to config basic project information</p>
            <FormItem
                label="Arabic Service Name"
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
        </AdaptableCard>
    )
}

export default ProjectFields

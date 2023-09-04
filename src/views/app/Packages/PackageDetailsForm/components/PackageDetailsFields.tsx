import AdaptableCard from '@/components/shared/AdaptableCard'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { RichTextEditor } from '@/components/shared'

type FormFieldsName = {
    arabicName: string
    englishName: string
    price: string
    arabicType: string
    englishType: string
    services: [
        {
            name: {
                en: string
                ar: string
            }
            image: string
        }
    ]
    items: [
        {
            en: string
            ar: string
        }
    ]
    arabicDetails: string
    englishDetails: string
    isDefault: boolean
}

type PackageFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: any
}

const PackageDetailsFields = (props: PackageFields) => {
    const { values, touched, errors } = props
    console.log('values', values.items)

    return (
        <AdaptableCard divider className="mb-4">
            <h5 className="mb-6">Job Application Details</h5>
            <FormItem label="Arabic Name">
                <Field
                    type="text"
                    autoComplete="off"
                    name="arabicName"
                    component={Input}
                    disabled
                />
            </FormItem>
            <FormItem label="English Name">
                <Field
                    type="text"
                    autoComplete="off"
                    name="englishName"
                    disabled
                    component={Input}
                />
            </FormItem>
            <FormItem label="Price">
                <Field
                    type="text"
                    autoComplete="off"
                    disabled
                    name="price"
                    component={Input}
                />
            </FormItem>
            <FormItem label="Arabic Type">
                <Field
                    disabled
                    type="text"
                    autoComplete="off"
                    name="arabicType"
                    component={Input}
                />
            </FormItem>
            <FormItem label="English Type">
                <Field
                    disabled
                    type="text"
                    autoComplete="off"
                    name="englishType"
                    component={Input}
                />
            </FormItem>
            <FormItem label="Arabic Details">
                <Field name="arabicDetails" disabled>
                    {({ field, form }: FieldProps) => (
                        <RichTextEditor
                            value={field.value}
                            onChange={(val) =>
                                form.setFieldValue(field.name, val)
                            }
                            style={{
                                pointerEvents: 'none',
                                backgroundColor: '#f2f2f2',
                            }}
                        />
                    )}
                </Field>
            </FormItem>
            <FormItem label="English Details">
                <Field name="englishDetails" disabled>
                    {({ field, form }: FieldProps) => (
                        <RichTextEditor
                            value={field.value}
                            onChange={(val) =>
                                form.setFieldValue(field.name, val)
                            }
                            style={{
                                pointerEvents: 'none',
                                backgroundColor: '#f2f2f2',
                            }}
                        />
                    )}
                </Field>
            </FormItem>
            {values?.items?.map((item: any, index: number) => {
                return (
                    <>
                        <FormItem label={`Arabic Item ${index + 1}`}>
                            <Field
                                type="text"
                                autoComplete="off"
                                component={Input}
                                initialValue={item.ar}
                                name={`items[${index}].ar`}
                                disabled
                            />
                        </FormItem>
                        <FormItem label={`English Item ${index + 1}`}>
                            <Field
                                type="text"
                                autoComplete="off"
                                component={Input}
                                name={`items[${index}].en`}
                                initialValue={item.en}
                                disabled
                            />
                        </FormItem>
                    </>
                )
            })}

            {values?.services?.map((service: any, index: number) => {
                return (
                    <>
                        <FormItem label={`Arabic Service ${index + 1}`}>
                            <Field
                                type="text"
                                autoComplete="off"
                                component={Input}
                                initialValue={service.ar}
                                name={`services[${index}].name.ar`}
                                disabled
                            />
                        </FormItem>
                        <FormItem label={`English Service ${index + 1}`}>
                            <Field
                                type="text"
                                autoComplete="off"
                                component={Input}
                                name={`services[${index}].name.en`}
                                initialValue={service.en}
                                disabled
                            />
                        </FormItem>
                    </>
                )
            })}
            <FormItem label="Is Default">
                <Field
                    type="text"
                    autoComplete="off"
                    name="isDefault"
                    component={Input}
                    disabled
                />
            </FormItem>
        </AdaptableCard>
    )
}

export default PackageDetailsFields

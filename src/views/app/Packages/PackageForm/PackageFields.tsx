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
    price?: string
    arabicType?: string
    englishType?: string
    arabicServiceNames?: string[]
    englishServiceNames?: string[]
    arabicItems?: string[]
    englishItems?: string[]
    arabicDetails?: string
    englishDetails?: string
    isDefault?: boolean
}

type PackageFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: any
}

const PackageFields = (props: PackageFields) => {
    const { values, touched, errors } = props
    const englishTypes = [
        { label: '3 Month', value: '3 month' },
        { label: '6 Month', value: '6 month' },
        { label: '9 Month', value: '9 month' },
    ]
    const arabicTypes = [
        { label: '3 شهور', value: '3 شهور' },
        { label: '6 شهور', value: '6 شهور' },
        { label: '9 شهور', value: '9 شهور' },
    ]

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Package Information</h5>
            <p className="mb-6">Section to config basic package information</p>
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
            <FormItem label="Choose is default or not">
                <Checkbox name="isDefault">isDefault</Checkbox>
            </FormItem>
            <FormItem
                label="Price"
                invalid={(errors.price && touched.price) as boolean}
                errorMessage={errors.price}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="price"
                    placeholder="Job Title"
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

            <FieldArray
                name="arabicServiceNames"
                render={(arrayHelpers) => (
                    <div className="mb-5">
                        {values?.arabicServiceNames?.map(
                            (service: string, index: number) => (
                                <div
                                    key={index}
                                    className="flex gap-3 items-center"
                                >
                                    <FormItem
                                        label={`Arabic Service ${
                                            index + 1
                                        } Name`}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name={`arabicServiceNames.${index}`}
                                            placeholder="Service Name"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <Button
                                        type="button"
                                        variant="twoTone"
                                        color="red-600"
                                        size="sm"
                                        icon={<HiMinusSm />}
                                        onClick={() =>
                                            arrayHelpers.remove(index)
                                        } // remove a product from the list
                                    >
                                        Remove
                                    </Button>
                                </div>
                            )
                        )}
                        <Button
                            size="md"
                            icon={<HiPlus />}
                            type="button"
                            variant="twoTone"
                            onClick={() => arrayHelpers.push('')}
                        >
                            Add a new arabic service
                        </Button>
                    </div>
                )}
            />

            <FieldArray
                name="englishServiceNames"
                render={(arrayHelpers) => (
                    <div className="mb-5">
                        {values?.englishServiceNames?.map(
                            (service: string, index: number) => (
                                <div
                                    key={index}
                                    className="flex gap-3 items-center"
                                >
                                    <FormItem
                                        label={`English Service ${
                                            index + 1
                                        } Name`}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name={`englishServiceNames.${index}`}
                                            placeholder="Service Name"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <Button
                                        type="button"
                                        variant="twoTone"
                                        color="red-600"
                                        size="sm"
                                        icon={<HiMinusSm />}
                                        onClick={() =>
                                            arrayHelpers.remove(index)
                                        } // remove a product from the list
                                    >
                                        Remove
                                    </Button>
                                </div>
                            )
                        )}
                        <Button
                            size="md"
                            icon={<HiPlus />}
                            type="button"
                            variant="twoTone"
                            onClick={() => arrayHelpers.push('')}
                        >
                            Add a new english service
                        </Button>
                    </div>
                )}
            />

            <FieldArray
                name="arabicItems"
                render={(arrayHelpers) => (
                    <div className="mb-5">
                        {values?.arabicItems?.map(
                            (item: string, index: number) => (
                                <div
                                    key={index}
                                    className="flex gap-3 items-center"
                                >
                                    <FormItem
                                        label={`Arabic Item ${index + 1} Name`}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name={`arabicItems.${index}`}
                                            placeholder="Item Name"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <Button
                                        type="button"
                                        variant="twoTone"
                                        color="red-600"
                                        size="sm"
                                        icon={<HiMinusSm />}
                                        onClick={() =>
                                            arrayHelpers.remove(index)
                                        } // remove a product from the list
                                    >
                                        Remove
                                    </Button>
                                </div>
                            )
                        )}
                        <Button
                            size="md"
                            icon={<HiPlus />}
                            type="button"
                            variant="twoTone"
                            onClick={() => arrayHelpers.push('')}
                        >
                            Add a new arabic item
                        </Button>
                    </div>
                )}
            />

            <FieldArray
                name="englishItems"
                render={(arrayHelpers) => (
                    <div className="mb-5">
                        {values?.englishItems?.map(
                            (item: string, index: number) => (
                                <div
                                    key={index}
                                    className="flex gap-3 items-center"
                                >
                                    <FormItem
                                        label={`English Item ${index + 1} Name`}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name={`englishItems.${index}`}
                                            placeholder="Item Name"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <Button
                                        type="button"
                                        variant="twoTone"
                                        color="red-600"
                                        size="sm"
                                        icon={<HiMinusSm />}
                                        onClick={() =>
                                            arrayHelpers.remove(index)
                                        } // remove a product from the list
                                    >
                                        Remove
                                    </Button>
                                </div>
                            )
                        )}
                        <Button
                            size="md"
                            icon={<HiPlus />}
                            type="button"
                            variant="twoTone"
                            onClick={() => arrayHelpers.push('')}
                        >
                            Add a new english item
                        </Button>
                    </div>
                )}
            />
        </AdaptableCard>
    )
}

export default PackageFields

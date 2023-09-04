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
    name: string
    price: number
    details: string
    items: string[]
    services: { image: string; name: string }[]
    type: string
    isDefault: string
}

type PackageFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: any
}

const PackageEditFields = (props: PackageFields) => {
    const { values, touched, errors } = props
    console.log('values', values)

    // const englishTypes = [
    //     { label: '3 Month', value: '3 month' },
    //     { label: '6 Month', value: '6 month' },
    //     { label: '9 Month', value: '9 month' },
    // ]
    const arabicTypes = [
        { label: '3 شهور', value: '3 شهور' },
        { label: '6 شهور', value: '6 شهور' },
        { label: '9 شهور', value: '9 شهور' },
    ]

    return (
        <AdaptableCard divider className="mb-4">
            <h2 className="mb-6">{values.name}</h2>
            <FormItem
                label="Name"
                invalid={(errors.name && touched.name) as boolean}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="Name"
                    component={Input}
                    value={values.name}
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
                    value={values.price}
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
                            options={arabicTypes}
                            value={arabicTypes.filter(
                                (type) => type.value === values.type
                            )}
                            onChange={(option) => {
                                form.setFieldValue(field.name, option?.value)
                            }}
                        />
                    )}
                </Field>
            </FormItem>

            {/* <FormItem
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
            </FormItem> */}

            <FormItem
                label="Details"
                labelClass="!justify-start"
                invalid={(errors.details && touched.details) as boolean}
                errorMessage={errors.details}
            >
                <Field name="details">
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

            {/* <FormItem
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
            </FormItem> */}

            <FieldArray
                name="services"
                render={(arrayHelpers) => (
                    <div className="mb-5">
                        {values?.services?.map(
                            (service: string, index: number) => (
                                <div
                                    key={index}
                                    className="flex gap-5 items-center"
                                >
                                    <FormItem
                                        label={`Service ${index + 1} Name`}
                                        invalid={Boolean(
                                            errors.services &&
                                                errors.services[index] &&
                                                touched.services &&
                                                touched.services[index]
                                        )}
                                        errorMessage={
                                            errors.services &&
                                            errors.services[index]
                                        }
                                    >
                                        <Field
                                            className="w-[300px]"
                                            type="text"
                                            autoComplete="off"
                                            name={`services[${index}].name`}
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
                            Add a new service
                        </Button>
                    </div>
                )}
            />

            {/* <FieldArray
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
                                        invalid={Boolean(
                                            errors.englishServiceNames &&
                                                errors.englishServiceNames[
                                                    index
                                                ] &&
                                                touched.englishServiceNames &&
                                                touched.englishServiceNames[
                                                    index
                                                ]
                                        )}
                                        errorMessage={
                                            errors.englishServiceNames &&
                                            errors.englishServiceNames[index]
                                        }
                                    >
                                        <Field
                                            type="text"
                                            className="w-[300px]"
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
            /> */}

            <FieldArray
                name="items"
                render={(arrayHelpers) => (
                    <div className="mb-5">
                        {values?.items?.map((item: string, index: number) => (
                            <div
                                key={index}
                                className="flex gap-3 items-center"
                            >
                                <FormItem
                                    label={`Item ${index + 1} Name`}
                                    invalid={Boolean(
                                        errors.items &&
                                            errors.items[index] &&
                                            touched.items &&
                                            touched.items[index]
                                    )}
                                    errorMessage={
                                        errors.items && errors.items[index]
                                    }
                                >
                                    <Field
                                        type="text"
                                        className="w-[300px]"
                                        autoComplete="off"
                                        name={`items[${index}]`}
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
                                    onClick={() => arrayHelpers.remove(index)} // remove a product from the list
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button
                            size="md"
                            icon={<HiPlus />}
                            type="button"
                            variant="twoTone"
                            onClick={() => arrayHelpers.push('')}
                        >
                            Add a new item
                        </Button>
                    </div>
                )}
            />

            {/* <FieldArray
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
                                        invalid={Boolean(
                                            errors.englishItems &&
                                                errors.englishItems[index] &&
                                                touched.englishItems &&
                                                touched.englishItems[index]
                                        )}
                                        errorMessage={
                                            errors.englishItems &&
                                            errors.englishItems[index]
                                        }
                                    >
                                        <Field
                                            type="text"
                                            className="w-[300px]"
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
            /> */}
        </AdaptableCard>
    )
}

export default PackageEditFields

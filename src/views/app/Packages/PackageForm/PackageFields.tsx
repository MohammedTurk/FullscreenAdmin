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
    link?: string
    arabicExecutionTime?: string
    englishExecutionTime?: string
}

type PackageFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: any
}

const PackageFields = (props: PackageFields) => {
    const { values, touched, errors } = props
    const englishTypes = [
        { label: '7 days', value: '7 days' },
        { label: '15 days', value: '15 days' },
        { label: '21 days', value: '21 days' },
        { label: '30 days', value: '30 days' },
        { label: '3 Month', value: '3 month' },
        { label: '6 Month', value: '6 month' },
        { label: '9 Month', value: '9 month' },
    ]
    const arabicTypes = [
        { label: '7 أيام', value: '7 أيام' },
        { label: '15 أيام', value: '15 أيام' },
        { label: '21 أيام', value: '21 أيام' },
        { label: '30 أيام', value: '30 أيام' },
        { label: '3 شهور', value: '3 شهور' },
        { label: '6 شهور', value: '6 شهور' },
        { label: '9 شهور', value: '9 شهور' },
    ]
    const onCheck = (value: boolean, e: ChangeEvent<HTMLInputElement>) => {
        console.log(value, e)
    }

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
                <Field name="isDefault">
                    {({ field }: FieldProps) => (
                        <Checkbox
                            name="isDefault"
                            onChange={(value) => {
                                field.onChange({
                                    target: {
                                        name: 'isDefault',
                                        value: value,
                                    },
                                })
                            }}
                        >
                            isDefault
                        </Checkbox>
                    )}
                </Field>
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
                label="Arabic Execution Time"
                invalid={
                    (errors.arabicExecutionTime &&
                        touched.arabicExecutionTime) as boolean
                }
                errorMessage={errors.arabicExecutionTime}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="arabicExecutionTime"
                    placeholder="Execution Time"
                    component={Input}
                />
            </FormItem>

            <FormItem
                label="English Execution Time"
                invalid={
                    (errors.englishExecutionTime &&
                        touched.englishExecutionTime) as boolean
                }
                errorMessage={errors.englishExecutionTime}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="englishExecutionTime"
                    placeholder="Execution Time"
                    component={Input}
                />
            </FormItem>

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
                                        invalid={Boolean(
                                            errors.arabicItems &&
                                                errors.arabicItems[index] &&
                                                touched.arabicItems &&
                                                touched.arabicItems[index]
                                        )}
                                        errorMessage={
                                            errors.arabicItems &&
                                            errors.arabicItems[index]
                                        }
                                    >
                                        <Field
                                            type="text"
                                            className="w-[300px]"
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
            />
            <FormItem
                label="Arabic Common Questions"
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
                label="English Common Questions"
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
            <FormItem
                label="Link"
                labelClass="!justify-start"
                invalid={(errors.link && touched.link) as boolean}
                errorMessage={errors.link}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="link"
                    placeholder="link"
                    component={Input}
                />
            </FormItem>

            <FieldArray
                name="arabicServiceNames"
                render={(arrayHelpers) => (
                    <div className="mb-5">
                        {values?.arabicServiceNames?.map(
                            (service: string, index: number) => (
                                <div
                                    key={index}
                                    className="flex gap-5 items-center"
                                >
                                    <FormItem
                                        label={`Arabic Service ${
                                            index + 1
                                        } Name`}
                                        invalid={Boolean(
                                            errors.arabicServiceNames &&
                                                errors.arabicServiceNames[
                                                    index
                                                ] &&
                                                touched.arabicServiceNames &&
                                                touched.arabicServiceNames[
                                                    index
                                                ]
                                        )}
                                        errorMessage={
                                            errors.arabicServiceNames &&
                                            errors.arabicServiceNames[index]
                                        }
                                    >
                                        <Field
                                            className="w-[300px]"
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
            />
        </AdaptableCard>
    )
}

export default PackageFields

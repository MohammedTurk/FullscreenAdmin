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
import Button from '@/components/ui/Button'

import {
    HiHashtag,
    HiMinusSm,
    HiOutlineViewGridAdd,
    HiOutlineWifi,
    HiPlus,
    HiViewGridAdd,
} from 'react-icons/hi'

type FormFieldsName = {
    title: string
    content: string
    tags: string
}

type ArticleFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: any
}

const ArticleFields = (props: ArticleFields) => {
    const { values, touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Article Information</h5>
            <p className="mb-6">Section to config basic article information</p>
            <FormItem
                label="Article Title"
                invalid={(errors.title && touched.title) as boolean}
                errorMessage={errors.title}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="title"
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>

            <FormItem
                label="Content"
                labelClass="!justify-start"
                invalid={(errors.content && touched.content) as boolean}
                errorMessage={errors.content}
            >
                <Field name="content">
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
                name="tags"
                render={(arrayHelpers) => (
                    <div>
                        {values?.tags?.map((tag: string, index: number) => (
                            <div
                                key={index}
                                className="flex gap-3 items-center"
                            >
                                <FormItem label={`Tag ${index + 1} Name`}>
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name={`tags.${index}`}
                                        placeholder="Tag Name"
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
                            Add a new tag
                        </Button>
                    </div>
                )}
            />
        </AdaptableCard>
    )
}

export default ArticleFields

{
    /* <Button
    size="sm"
    icon={<HiViewGridAdd />}
    type="button"
    onClick={() => arrayHelpers.push('')}
>
    Add a tag
</Button> */
}

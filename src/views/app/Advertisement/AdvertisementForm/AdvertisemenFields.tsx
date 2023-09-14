import AdaptableCard from '@/components/shared/AdaptableCard'

import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'

import { Select, Switcher } from '@/components/ui'
import {
    getAllArticles,
    useAppDispatch as useArticleAppDispatch,
    useAppSelector as useArticleAppSelector,
} from '../../Articles/ArticlesList/store'
import {
    getAllPackages,
    useAppDispatch as usePackageAppDispatch,
    useAppSelector as usePackageAppSelector,
} from '../../Packages/PackagesList/store'
import { useEffect, useState } from 'react'
import { RichTextEditor } from '@/components/shared'

type FormFieldsName = {
    type: string
    relatedId: string
    arabicText: string
    englishText: string
}

type AdvertisementFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: any
    formType: string
}

const AdvertisementFields = (props: AdvertisementFields) => {
    const [relatedData, setRelatedData] = useState<any>()
    const [type, setType] = useState<string>('')

    const { values, touched, errors, formType } = props

    const advertisementTypes = [
        { label: 'Article', value: 'article' },
        { label: 'Package', value: 'package' },
    ]

    const packagesData = usePackageAppSelector(
        (state) => state.PackagesListSlice?.data?.packagesData
    )
    const packagesLoading = usePackageAppSelector(
        (state) => state.PackagesListSlice?.data?.loading
    )

    const articlesData = useArticleAppSelector(
        (state) => state.articlesListSlice?.data?.articlesList
    )
    const articlesLoading = useArticleAppSelector(
        (state) => state.articlesListSlice?.data?.loading
    )

    const articlesDispatch = useArticleAppDispatch()
    const packagesDispatch = usePackageAppDispatch()

    const fetchData = () => {
        packagesDispatch(getAllPackages())
        articlesDispatch(getAllArticles())
    }

    let articlesSelectData: any
    if (articlesData?.articles) {
        articlesSelectData = articlesData?.articles?.map((article) => {
            return {
                label: article.title,
                value: article._id,
            }
        })
    }

    let packagesSelectData: any
    if (packagesData) {
        packagesSelectData = packagesData?.data?.map((item: any) => {
            return {
                label: item.name,
                value: item._id,
            }
        })
    }

    const handleRelatedData = (type: string | undefined) => {
        if (type === 'package' && packagesData && packagesSelectData) {
            setRelatedData(packagesSelectData)
            setType(type)
        } else if (type === 'article' && articlesData && articlesSelectData) {
            setRelatedData(articlesSelectData)
            setType(type)
        } else {
            setRelatedData([])
            setType('')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (values.type) {
            handleRelatedData(values.type)
        }
    }, [articlesLoading, packagesLoading])

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Advertisement Information</h5>
            <p className="mb-6">
                Section to config basic advertisement information
            </p>
            <FormItem
                label="Advertisement Type"
                invalid={(errors.type && touched.type) as boolean}
                errorMessage={errors.type}
            >
                <Field name="type">
                    {({ field, form }: FieldProps) => (
                        <Select
                            field={field}
                            form={form}
                            options={advertisementTypes}
                            value={advertisementTypes.filter(
                                (type) => type.value === values.type
                            )}
                            onChange={(option) => {
                                form.setFieldValue(field.name, option?.value)
                                handleRelatedData(option?.value)
                            }}
                        />
                    )}
                </Field>
            </FormItem>

            <FormItem
                label={`Select Related ${type}`}
                labelClass="!justify-start"
                invalid={(errors.relatedId && touched.relatedId) as boolean}
                errorMessage={errors.relatedId}
            >
                <Field name="relatedId">
                    {({ field, form }: FieldProps) => (
                        <Select
                            field={field}
                            form={form}
                            options={relatedData}
                            isLoading={!relatedData}
                            value={relatedData?.filter((type: any) => {
                                return type.value === values.relatedId
                            })}
                            placeholder={
                                relatedData
                                    ? 'Select'
                                    : ' Please choose the advertisement type'
                            }
                            loadingMessage={() => {
                                return (
                                    <span>
                                        Please choose the advertisement type
                                    </span>
                                )
                            }}
                            onChange={(option) => {
                                form.setFieldValue(field.name, option?.value)
                            }}
                        />
                    )}
                </Field>
            </FormItem>

            <FormItem
                label="Arabic Text"
                labelClass="!justify-start"
                invalid={(errors.arabicText && touched.arabicText) as boolean}
                errorMessage={errors.arabicText}
            >
                <Field name="arabicText">
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
                label="English Text"
                labelClass="!justify-start"
                invalid={(errors.englishText && touched.englishText) as boolean}
                errorMessage={errors.englishText}
            >
                <Field name="englishText">
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
            {formType === 'edit' && (
                <FormItem
                    label="Active"
                    labelClass="!justify-start"
                    layout="horizontal"
                    className="max-w-[110px]"
                    labelWidth="60px"
                >
                    <Field name="active" component={Switcher} />
                </FormItem>
            )}
        </AdaptableCard>
    )
}

export default AdvertisementFields

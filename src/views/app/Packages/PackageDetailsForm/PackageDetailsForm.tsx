import { forwardRef, useEffect } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import StickyFooter from '@/components/shared/StickyFooter'
import { Form, Formik, FormikProps } from 'formik'
import PackageDetailsFields from './components/PackageDetailsFields'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type InitialData = {
    arabicName: string
    englishName: string
    price: string
    arabicType: string
    englishType: string
    services: {
        name: {
            en: string
            ar: string
        }
        image: string
    }[]
    items: {
        en: string
        ar: string
    }[]
    arabicDetails: string
    englishDetails: string
    isDefault: boolean
}

type PackageForm = {
    initialData?: InitialData
    onBack?: () => void
}

const PackageDetailsForm = forwardRef<FormikRef, PackageForm>((props, ref) => {
    const {
        initialData = {
            arabicName: '',
            englishName: '',
            price: '',
            arabicType: '',
            englishType: '',
            services: [
                {
                    name: {
                        en: '',
                        ar: '',
                    },
                    image: '',
                },
            ],
            items: [
                {
                    en: '',
                    ar: '',
                },
            ],
            arabicDetails: '',
            englishDetails: '',
            isDefault: false,
        },
        onBack,
    } = props

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log()
                }}
            >
                {({ values, touched, errors }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <PackageDetailsFields
                                        values={values}
                                        touched={touched}
                                        errors={errors}
                                    />
                                </div>
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        onClick={() => onBack?.()}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

PackageDetailsForm.displayName = 'PackageDetailsForm'

export default PackageDetailsForm

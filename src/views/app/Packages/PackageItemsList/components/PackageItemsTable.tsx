import { useEffect, useMemo, useRef } from 'react'
import DataTable from '@/components/shared/DataTable'
import { HiEye, HiOutlineTrash, HiPlusCircle } from 'react-icons/hi'
import {
    setTableData,
    useAppDispatch,
    useAppSelector,
    getPackageItems,
    setSelectedPackage,
    togglePackageDeleteConfirmation,
    deletePackage,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'
import {
    AdaptableCard,
    ConfirmDialog,
    Container,
    DoubleSidedImage,
} from '@/components/shared'
import { Button, Notification, toast } from '@/components/ui'

type PackageItem = {
    _id: string
    type: string
    name: string
    items: string[]
    price: number
    details: string
    services: []
    isDefault: false
}

const ActionColumn = ({ row }: { row: PackageItem }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = () => {
        navigate(`/view-package-details/${row._id}`)
    }
    const onPackageDelete = (_id: string) => {
        dispatch(setSelectedPackage({ _id }))
        dispatch(togglePackageDeleteConfirmation(true))
    }
    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onView}
            >
                <HiEye />
            </span>
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={() => onPackageDelete(row._id)}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const PackageItemsTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.PackageSlice.data)
    const packageDeleteConfirmation = useAppSelector(
        (state) => state.PackageSlice?.data?.packageDeleteConfirmation
    )
    console.log(
        'packageDeleteConfirmation',
        useAppSelector((state) => state.PackageSlice?.data)
    )

    const selectedPackage = useAppSelector(
        (state) => state.PackageSlice?.data?.selectedPackage
    )
    const { pageIndex, pageSize, total } = useAppSelector(
        (state) => state.PackageSlice.data.tableData
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, total }),
        [pageIndex, pageSize, total]
    )

    const fetchData = () => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )

        const rquestParam: any = { _id: path }
        dispatch(getPackageItems(rquestParam))
    }
    function createMarkup(data: any) {
        return { __html: data }
    }
    const columns: ColumnDef<PackageItem>[] = useMemo(
        () => [
            {
                header: 'Type',
                accessorKey: 'type',
                cell: (props) => {
                    const row = props.row.original

                    return <span className="capitalize">{row.type}</span>
                },
                enableSorting: false,
            },
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original

                    return <span className="capitalize">{row.name} </span>
                },
                enableSorting: false,
            },
            {
                header: 'Price',
                accessorKey: 'price',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.price}</span>
                },
                enableSorting: false,
            },
            {
                header: 'Details',
                enableSorting: false,
                accessorKey: 'details',
                cell: (props) => {
                    const row = props.row.original
                    let details = row.details
                    if (details.length > 50) {
                        details = details.substring(0, 100) + ' ...'
                    }
                    const data = createMarkup(details)
                    return (
                        <span
                            className="capitalize"
                            dangerouslySetInnerHTML={data}
                        />
                    )
                },
            },
            {
                header: 'Items',
                enableSorting: false,
                accessorKey: 'items',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="capitalize">
                            {row.items.map((item) => item + ' ')}
                        </span>
                    )
                },
            },

            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }
    const navigate = useNavigate()

    const addPackage = () => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )

        navigate(`/add-package/${path}`)
    }

    const onPackageDeleteConfirm = async () => {
        const success = await deletePackage({
            _id: selectedPackage._id,
        })
        if (success) {
            dispatch(togglePackageDeleteConfirmation(false))
            const path = location.pathname.substring(
                location.pathname.lastIndexOf('/') + 1
            )

            const rquestParam: any = { _id: path }
            dispatch(getPackageItems(rquestParam))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Package successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    const onPackageDeleteConfirmationClose = () => {
        dispatch(togglePackageDeleteConfirmation(false))
    }
    return (
        <>
            <div className="lg:flex items-center justify-right mb-4">
                <Button
                    block
                    variant="solid"
                    size="sm"
                    className="!w-[200px]"
                    icon={<HiPlusCircle />}
                    onClick={() => addPackage()}
                >
                    Add Package
                </Button>
            </div>
            {!data?.loading && data?.packageItemsData.length == 0 ? (
                <Container className="h-full">
                    <div className="h-full flex flex-col items-center justify-center">
                        <DoubleSidedImage
                            src="/img/others/img-2.png"
                            darkModeSrc="/img/others/img-2-dark.png"
                            alt="Access Denied!"
                        />
                        <div className="mt-6 text-center">
                            <h3 className="mb-2">No Items Found</h3>
                        </div>
                    </div>
                </Container>
            ) : (
                <>
                    <DataTable
                        ref={tableRef}
                        columns={columns}
                        data={data.packageItemsData}
                        skeletonAvatarColumns={[0]}
                        skeletonAvatarProps={{ className: 'rounded-md' }}
                        loading={data.loading}
                        pagingData={{
                            total: tableData.total as number,
                            pageIndex: tableData.pageIndex as number,
                            pageSize: tableData.pageSize as number,
                        }}
                        onPaginationChange={onPaginationChange}
                        onSelectChange={onSelectChange}
                    />
                    <ConfirmDialog
                        isOpen={packageDeleteConfirmation}
                        type="danger"
                        title="Delete Package"
                        confirmButtonColor="red-600"
                        onClose={onPackageDeleteConfirmationClose}
                        onRequestClose={onPackageDeleteConfirmationClose}
                        onCancel={onPackageDeleteConfirmationClose}
                        onConfirm={onPackageDeleteConfirm}
                    >
                        <p>
                            Are you sure you want to delete this package? This
                            action cannot be undone.
                        </p>
                    </ConfirmDialog>
                </>
            )}
        </>
    )
}

export default PackageItemsTable

import { useEffect, useMemo, useRef } from 'react'
import DataTable from '@/components/shared/DataTable'
import { HiEye } from 'react-icons/hi'
import {
    setTableData,
    useAppDispatch,
    useAppSelector,
    getPackageItems,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'
import { Container, DoubleSidedImage } from '@/components/shared'

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
        // navigate(`/view-package-details/${row.job._id}`)
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onView}
            >
                <HiEye />
            </span>
        </div>
    )
}

const PackageItemsTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.PackageSlice.data)

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

    return (
        <>
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
            )}
        </>
    )
}

export default PackageItemsTable

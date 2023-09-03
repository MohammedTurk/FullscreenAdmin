import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {
    setTableData,
    useAppDispatch,
    useAppSelector,
    getAllServices,
    setSelectedService,
    toggleDeleteConfirmation,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'
import ServiceDeleteConfirmation from './ServiceDeleteConfirmation'

type service = {
    _id: string
    name: string
    serviceNo: string
    image: string
    category: string
    description: string
}

const ActionColumn = ({ row }: { row: service }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/edit-service/${row._id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedService(row._id))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const ProductColumn = ({ row }: { row: service }) => {
    const avatar = row.image ? (
        <Avatar src={row.image} />
    ) : (
        <Avatar icon={<FiPackage />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}

const ServicesTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.serviceListSlice.data)
    const { pageIndex, pageSize, total } = useAppSelector(
        (state) => state.serviceListSlice.data.tableData
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
        dispatch(getAllServices())
    }
    function createMarkup(data: any) {
        return { __html: data }
    }

    const columns: ColumnDef<service>[] = useMemo(
        () => [
            {
                header: 'Name',
                enableSorting: false,
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <ProductColumn row={row} />
                },
            },
            {
                header: 'Category',
                enableSorting: false,
                accessorKey: 'category',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.category}</span>
                },
            },
            {
                enableSorting: false,
                header: 'Description',
                accessorKey: 'description',
                cell: (props) => {
                    const row = props.row.original

                    let description = row.description
                    if (description.length > 50) {
                        description = description.substring(0, 50) + ' ...'
                    }
                    const data = createMarkup(description)
                    return (
                        <span
                            className="capitalize"
                            dangerouslySetInnerHTML={data}
                        />
                    )
                },
            },
            {
                header: 'Service Number',
                enableSorting: false,
                accessorKey: 'serviceNo',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.serviceNo}</span>
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
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data.servicesList}
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
            <ServiceDeleteConfirmation />
        </>
    )
}

export default ServicesTable

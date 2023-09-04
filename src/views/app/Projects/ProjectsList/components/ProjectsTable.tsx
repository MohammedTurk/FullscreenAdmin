import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {
    setTableData,
    useAppDispatch,
    useAppSelector,
    toggleDeleteConfirmation,
    setSelectedProject,
    getAllProjects,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'
import ProjectDeleteConfirmation from './ProjectDeleteConfirmation'

type Project = {
    _id: string
    name: string
    file: string
    link: string
    category: string
    description: string
}

const ActionColumn = ({ row }: { row: Project }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/edit-project/${row._id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProject(row._id))
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

const ProjectColumn = ({ row }: { row: Project }) => {
    const avatar = row.file ? (
        <Avatar src={row.file} />
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

const ProjectsTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.projectListSlice.data)
    const { pageIndex, pageSize, total } = useAppSelector(
        (state) => state.projectListSlice.data.tableData
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
        dispatch(getAllProjects())
    }
    function createMarkup(data: any) {
        return { __html: data }
    }

    const columns: ColumnDef<Project>[] = useMemo(
        () => [
            {
                header: 'Name',
                enableSorting: false,
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <ProjectColumn row={row} />
                },
            },
            {
                header: 'Link',
                enableSorting: false,
                accessorKey: 'link',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="capitalize">
                            <a
                                href={row.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Link
                            </a>
                        </span>
                    )
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
                data={data.projectsList}
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
            <ProjectDeleteConfirmation />
        </>
    )
}

export default ProjectsTable

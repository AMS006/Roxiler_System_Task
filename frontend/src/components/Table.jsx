import React, { useContext, useMemo } from 'react'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'

import { columns } from './data'
import { MyContext } from '../MyContext'
import PaginationComp from './Pagination'
import TableSkeleton from './TableSkeleton'

const Table = () => {

    const {
        currentTransactions,
        tableLoading
    } = useContext(MyContext)

    const data = useMemo(() => currentTransactions, [currentTransactions])
    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

    return (
        <div>
            <h1 className='font-semibold text-xl py-1 text-center'>Transactions Dashboard</h1>
            <div className='w3-responsive overflow-y-auto' style={{ height: '65vh' }}>
                <table className="w3-table-all">
                    <thead className='sticky top-0 z-10  w-full h-full'>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    {tableLoading ? <TableSkeleton /> :
                        data?.length > 0 ? <tbody>
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody> : <span className='text-center p-1.5 text-gray-500 font-semibold'>No Data found</span>}
                </table>
            </div>
            <PaginationComp />
        </div>
    )
}

export default Table
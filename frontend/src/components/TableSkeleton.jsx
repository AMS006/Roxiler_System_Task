import React, { useContext, useMemo } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { MyContext } from '../MyContext'

const TableSkeleton = () => {
    const { perPage } = useContext(MyContext)


    let count = useMemo(() => {
        let array = []
        for (let i = 0; i < perPage; i++)
            array.push(i)
        return array
    }, [perPage])
    return (
        <tbody>
            {count.map(() => (
                <tr>
                    <td>
                        <Skeleton />
                    </td>
                    <td>
                        <Skeleton />
                    </td>
                    <td>
                        <Skeleton />
                    </td>
                    <td>
                        <Skeleton />
                    </td>
                    <td>
                        <Skeleton />
                    </td>
                    <td>
                        <Skeleton />
                    </td>
                    <td>
                        <Skeleton />
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

export default TableSkeleton
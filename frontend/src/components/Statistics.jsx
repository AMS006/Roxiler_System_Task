import React, { useContext, useMemo } from 'react'

import { MyContext } from '../MyContext'
import { monthNames } from './data'

const Statistics = () => {
    const {
        month,
        statistics
    } = useContext(MyContext)
    const monthName = useMemo(() => monthNames[month - 1], [month])
    return (
        <div className='py-4'>
            <h2 className='text-2xl font-semibold'>Statistics - {monthName} </h2>
            {statistics &&
                <table className=''>
                    <tbody className='w3-table-all my-2'>
                        <tr>
                            <td>TotalSale</td>
                            <td>{statistics?.totalSoldAmount}</td>
                        </tr>
                        <tr>
                            <td>Total Sold Items</td>
                            <td>{statistics?.numberOfItemsSold}</td>
                        </tr>
                        <tr>
                            <td>Total Not Sold Itmes</td>
                            <td>{statistics?.numberOfItemsNotSold}</td>
                        </tr>
                    </tbody>
                </table>}
        </div>
    )
}

export default Statistics
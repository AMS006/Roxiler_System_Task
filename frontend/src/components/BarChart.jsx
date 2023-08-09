import React, { useContext, useMemo } from 'react'
import { Chart } from "react-google-charts";

import { MyContext } from '../MyContext';
import { monthNames } from './data';

const BarChart = () => {
  const { month, barChart } = useContext(MyContext)
  const monthName = useMemo(() => monthNames[month - 1], [month])

  const options = {
    chart: {
      title: `Bar Chart Stats - ${monthName}`,
    }
  };

  const data = useMemo(() => {
    let array = [["Price-Range", "Total Items"]]
    if (barChart.length > 0) {
      barChart.map((item) => array.push([item.priceRange, item.totalItems]))
    }
    return array
  }, [barChart])

  return (
    <div className='my-2'>
      <h2 className='text-2xl font-semibold py-2.5'>BarChart</h2>
      <div>
        {data && <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          key={monthName}
          data={data}
          options={options}
        />}
      </div>
    </div>
  )
}

export default BarChart
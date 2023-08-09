import React, { useContext, useMemo } from 'react'
import Chart from 'react-google-charts'

import { monthNames } from './data'
import { MyContext } from '../MyContext'

const PieChart = () => {
  const { month, pieChart } = useContext(MyContext)
  const monthName = useMemo(() => monthNames[month - 1], [month])

  const options = {
    title: `Category Pie Chart - ${monthName}`,
    is3D: true
  };
  const data = useMemo(() => {
    let array = [["Category", "Total Items"]]
    if (pieChart) {
      let keys = Object.keys(pieChart)
      keys.map((key) => array.push([key, pieChart[key]]))
    }
    return array
  }, [pieChart])

  return (
    <div>
      <h2 className='text-2xl font-semibold py-2.5'>PieChart</h2>
      <div>
        <Chart
          chartType="PieChart"
          data={data}
          key={monthName}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      </div>
    </div>
  )
}

export default PieChart
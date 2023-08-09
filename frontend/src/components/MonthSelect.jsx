import React, { useContext } from 'react';
import { MyContext } from '../MyContext';
import axios from 'axios';

const MonthSelect = () => {

  const {
    month,
    searchData,
    page,
    perPage,
    loading,
    setMonth,
    setStatistics,
    setBarChart,
    setPieChart,
    setLoading,
    setCurrentTransactions
  } = useContext(MyContext)

  const handleSelect = async (e) => {
    setLoading(true)
    const selectedValue = e.target.value;
    setMonth(selectedValue)
    const params = {
      inputMonth: selectedValue,
      searchData,
      page,
      perPage
    }
    await axios.get('https://roxille-system-task.onrender.com/allData', { params }).then((data) => {
      setCurrentTransactions(data.data.allData.transactions)
      setStatistics(data.data.allData.statistics)
      setBarChart(data.data.allData.barChart)
      setPieChart(data.data.allData.pieChart)
    }).finally(() => setLoading(false))
  };

  return (
    <div className="month-select">
      <select value={month} disabled={loading} onChange={handleSelect} className="select-box">
        <option value="" disabled>
          Select a month
        </option>
        <option value={1}>January</option>
        <option value={2}>February</option>
        <option value={3}>March</option>
        <option value={4}>April</option>
        <option value={5}>May</option>
        <option value={6}>June</option>
        <option value={7}>July</option>
        <option value={8}>August</option>
        <option value={9}>September</option>
        <option value={10}>October</option>
        <option value={11}>November</option>
        <option value={12}>December</option>
      </select>
    </div>
  );
};

export default MonthSelect;

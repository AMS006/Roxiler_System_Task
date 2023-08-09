import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { MyContext } from '../MyContext';
import Table from '../components/Table';
import Statistics from '../components/Statistics';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import SearchBar from '../components/SearchBar';
import MonthSelect from '../components/MonthSelect';
import Loading from '../components/Loading';

const HomePage = () => {
    const [allData, setAllData] = useState(undefined);
    const [mounted, setIsMounted] = useState(false)

    const {
        page,
        perPage,
        searchData,
        month,
        loading,
        setStatistics,
        setPieChart,
        setBarChart,
        setCurrentTransactions,
        setLoading
    } = useContext(MyContext)

    const getAllData = async () => {
        setLoading(true);
        const params = {
            page,
            perPage,
            searchData,
            inputMonth: month
        }
        const items = await axios.get('http://localhost:4001/allData', { params })
        setAllData(items.data.allData)
    }

    useEffect(() => {
        setLoading(false)
        if (allData && allData?.transactions) {
            setCurrentTransactions(allData.transactions)
            setStatistics(allData.statistics)
            setBarChart(allData.barChart)
            setPieChart(allData.pieChart)

        }
    }, [allData, setCurrentTransactions,setStatistics,setPieChart,setBarChart,setLoading])

    useEffect(() => {
        setIsMounted(true)
        getAllData()
    }, [])
    if (!mounted) {
        return null
    }
    return (
        <div>
            <nav className='py-1.5 px-8 shadow'>
                <h1 className='text-2xl font-semibold'>Transaction Manager</h1>
            </nav>
            <main className='py-2 w3-container'>
                <div className='py-2 flex md:flex-row flex-col gap-4 justify-between'>
                    <SearchBar />
                    <MonthSelect />
                </div>
                {loading ? <Loading /> : <>
                    <Table />
                    <Statistics />
                    <BarChart />
                    <PieChart />
                </>}
            </main>
        </div>
    )
}

export default HomePage
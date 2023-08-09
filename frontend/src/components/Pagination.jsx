import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../MyContext'
import axios from 'axios'

const PaginationComp = () => {
    const {
        page,
        searchData,
        month,
        perPage,
        tableLoading,
        setPage,
        setPerPage,
        setTableLoading,
        currentTransactions,
        setCurrentTransactions
    } = useContext(MyContext)
    const [nextDisabled, setNextDisabled] = useState(false)
    const [prevDisabled, setPrevDisabled] = useState(false);

    useEffect(() => {
        if (page === 1)
            setPrevDisabled(true)
        else
            setPrevDisabled(false)
        if (perPage <= currentTransactions.length) {
            setNextDisabled(false)
        } else
            setNextDisabled(true)
    }, [page, perPage, currentTransactions])

    const handleRowChange = async (e) => {
        setTableLoading(true)
        setPerPage(e.target.value)
        const params = {
            page,
            perPage: e.target.value,
            searchData,
            inputMonth: month
        }
        await axios.get('https://roxille-system-task.onrender.com/allTransactions', { params }).then((data) => {
            setCurrentTransactions(data.data.transactions)
        }).finally(() => setTableLoading(false))
    }
    const handlePrev = async () => {
        setTableLoading(true)
        if (!prevDisabled) {
            setPage(page - 1)
            const params = {
                page: page - 1,
                perPage,
                searchData,
                inputMonth: month
            }
            await axios.get('https://roxille-system-task.onrender.com/allTransactions', { params }).then((data) => {
                setCurrentTransactions(data.data.transactions)
            }).finally(() => setTableLoading(false))
        }
    }
    const handleNext = async () => {
        setTableLoading(true)
        if (!nextDisabled) {
            setPage(page + 1)
            const params = {
                page: page + 1,
                perPage,
                searchData,
                inputMonth: month
            }
            await axios.get('https://roxille-system-task.onrender.com/allTransactions', { params }).then((data) => {
                setCurrentTransactions(data.data.transactions)
            }).finally(() => setTableLoading(false))
        }
    }
    return (
        <div className='flex justify-between py-2 border-b shadow'>
            <div>
                <b>Page No. {page}</b>
            </div>
            <div className='flex gap-1.5'>
                <button disabled={prevDisabled || tableLoading} onClick={handlePrev} className={`border px-1.5 py-1 font-semibold ${prevDisabled ? 'opacity-50 cursor-default' : 'hover:bg-slate-100'}`}>Prev</button>
                <button disabled={nextDisabled || tableLoading} onClick={handleNext} className={`border px-1.5 py-1 font-semibold ${nextDisabled ? 'opacity-50 cursor-default' : 'hover:bg-slate-100'}`}>Next</button>
            </div>
            <div className='flex gap-2 items-center'>
                <label htmlFor="rows" className='font-semibold text-sm'>Rows Per Page :</label>
                <select id="rows" value={perPage} disabled={tableLoading} onChange={handleRowChange} className='p-1 border rounded'>
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                </select>
            </div>
        </div>
    )
}

export default PaginationComp
import { createContext, useState } from 'react';

// Create a new context
const MyContext = createContext();

// Context Provider component
const MyContextProvider = ({ children }) => {

  const [month, setMonth] = useState(3);
  const [searchData, setsearchData] = useState('')
  const [page,setPage] = useState(1)
  const [perPage,setPerPage] = useState(10)
  const [currentTransactions,setCurrentTransactions] = useState([])
  const [statistics,setStatistics] = useState(undefined)
  const [barChart,setBarChart] = useState([])
  const [pieChart,setPieChart] = useState(undefined)
  const [loading,setLoading] = useState(false)
  const [tableLoading,setTableLoading] = useState(false)


  // You can define functions to modify the state here

  const contextValue = {
    month,
    setMonth,
    searchData,
    setsearchData,
    page,
    setPage,
    perPage,
    setPerPage,
    currentTransactions,
    setCurrentTransactions,
    statistics,
    setStatistics,
    barChart,
    setBarChart,
    pieChart,
    setPieChart,
    loading,
    setLoading,
    tableLoading,
    setTableLoading
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };

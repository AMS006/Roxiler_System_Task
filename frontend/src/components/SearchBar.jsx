import axios from 'axios';
import React, { useContext, useState } from 'react';

import { MyContext } from '../MyContext';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    setCurrentTransactions,
    page,
    perPage,
    month,
    loading,
    tableLoading,
    setTableLoading
  } = useContext(MyContext)

  const handleInput = (e) => {
    setSearchTerm(e.target.value)
    if (e.target.value.length === 0) {
      handleSearch()
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.length > 0) {
      handleSearch()
    }
  }
  const handleSearch = async () => {
    setTableLoading(true)
    const params = {
      searchData: searchTerm.toLowerCase(),
      page,
      perPage,
      inputMonth: month
    }
    await axios.get('http://localhost:4001/allTransactions', { params }).then((data) => {
      setCurrentTransactions(data.data.transactions)
    }).finally(() => setTableLoading(false))
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={handleInput}
        className="search-input"
        disabled={loading || tableLoading}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch} disabled={loading || tableLoading} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;

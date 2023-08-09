const { default: axios } = require("axios");
const { getMonthTransaction } = require("./monthTransaction");

// Getting all Transactions based on Search and Pagination Data
exports.getAllTransactions = async (req, res) => {
  try {
    const { searchData, inputMonth, page, perPage } = req.query;

    let sIdx = (Number(page) - 1) * Number(perPage); // Start Index 
    let eIdx = sIdx + Number(perPage); // End Index

    let paginatedTransaction;

    // Getting All Transactions from API
    const transactions = await axios.get(process.env.API_URL);

    // Getting the Transactions for Specific Month
    const monthTransactions = getMonthTransaction(transactions,inputMonth)

    // Filtering The Transactions If there is searched Data
    if (searchData.length > 0) {
      const filteredTransactions = monthTransactions.filter((transaction) => {
        if (
          transaction.title.toLowerCase().includes(searchData) ||
          transaction.description.toLowerCase().includes(searchData) ||
          transaction.price.toString().toLowerCase().includes(searchData)
        ) {
          return transaction;
        }
      });
      if (filteredTransactions.length > 0) {
        paginatedTransaction = filteredTransactions.slice(sIdx, eIdx);

        return res.json({ transactions: paginatedTransaction });
      }else{
        return res.json({transactions: []})
      }
    }
    // Paginating the Transaction
    paginatedTransaction = monthTransactions.slice(sIdx, eIdx);

    return res.json({ transactions: paginatedTransaction });
  } catch (error) {
    return res.status(500).json({ message: "Internal Servel Error" });
  }
};

// Statistics for specific month
exports.getStatistics = async (req, res) => {
  try {
    const { inputMonth } = req.query;

    const transactions = await axios.get(process.env.API_URL);

    let totalSoldAmount = 0;
    let numberOfItemsSold = 0;
    let numberOfItemsNotSold = 0;

    // Getting the Transactions for Specific Month
    const monthTransactions = getMonthTransaction(transactions,inputMonth)

    monthTransactions.map((transactions) => {
      if (transactions.sold) {
        numberOfItemsSold++;
        totalSoldAmount += transactions.price;
      } else {
        numberOfItemsNotSold++;
      }
    });
    const statistics = {
      totalSoldAmount,
      numberOfItemsSold,
      numberOfItemsNotSold,
    }
    return res.json({statistics});
  } catch (error) {
    return res.status(500).json({ message: "Internal Servel Error" });
  }
};

// Bar Chart For Specific month
exports.getBarChart = async (req, res) => {
  try {
    const { inputMonth } = req.query;

    const transactions = await axios.get(process.env.API_URL);

    // Getting the Transactions for Specific Month
    const monthTransactions = getMonthTransaction(transactions,inputMonth)

    const result = [];

    let sum = 0;
    result.push({ priceRange: "0 - 100", totalItems: 0 });
    for (let i = 1; i < 9; i++) {
      sum += 100;
      let priceRange = `${sum + 1} - ${sum + 100}`;
      result.push({
        priceRange,
        totalItems: 0,
      });
    }
    result.push({ priceRange: "901 - above", totalItems: 0 });

    monthTransactions.forEach((transaction) => {
      const price = transaction.price;
      let index = Math.min(Math.floor(price / 100), 9);

      if (price > 900) {
        index = 9;
      }

      result[index].totalItems++;
    });
    return res.json({ barChart: result });
  } catch (error) {
    return res.status(500).json({ message: "Internal Servel Error" });
  }
};

// PieChart For Specific Month
exports.getPieChart = async (req, res) => {
  try {
 
    const { inputMonth } = req.query;

    const transactions = await axios.get(process.env.API_URL);

    // Getting the Transactions for Specific Month
    const monthTransactions = getMonthTransaction(transactions,inputMonth)

    let categoryResult = {};

    monthTransactions.map((transaction) => {
      if (transaction.category in categoryResult)
        categoryResult[transaction.category] += 1;
      else categoryResult[transaction.category] = 1;
    });

    return res.json({ pieChart: categoryResult });
  } catch (error) {
    return res.status(500).json({ message: "Internal Servel Error" });
  }
};

// Getting All Data of above API in single API
exports.getAllData = async (req, res) => {
  try {
    const { searchData, inputMonth, page, perPage } = req.query;
    const params = {
        searchData,
        inputMonth,
        page,
        perPage
    }
    const params1 = {
        inputMonth
    }

    const allTransactions = await axios.get("https://roxille-system-task.onrender.com/allTransactions",{ params })

    const statistics = await axios.get("https://roxille-system-task.onrender.com/statistics",{ params:params1 })

    const barChart = await axios.get("https://roxille-system-task.onrender.com/barchart",{ params:params1 });

    const pieChart = await axios.get("https://roxille-system-task.onrender.com/piechart", {params:params1});

    const result = {
      transactions: allTransactions.data.transactions,
      statistics: statistics.data.statistics,
      barChart: barChart.data.barChart,
      pieChart: pieChart.data.pieChart,
    };

    return res.json({ allData: result });
  } catch (error) {
    return res.status(500).json({ message: "Internal Servel Error" });
  }
};

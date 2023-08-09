const express = require('express')
const { getAllTransactions, getStatistics, getBarChart, getPieChart, getAllData } = require('../controllers')

const router = express.Router()

// GET route for getting all Transactions based on searchedData and pagination
router.get('/allTransactions',getAllTransactions)

// Get route for getting statistics of selected month
router.get('/statistics', getStatistics)

// GET route for getting barchart data of selected month
router.get('/barchart', getBarChart)

// GET route for getting piechat data of selected month
router.get('/piechart',getPieChart)

// GET router for getting all data of above routes
router.get('/allData',getAllData)

module.exports = router
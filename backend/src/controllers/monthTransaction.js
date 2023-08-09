exports.getMonthTransaction = (transactions,inputMonth) =>{
    const monthTransactions = transactions.data.filter((transaction) => {
    const month = new Date(transaction.dateOfSale).getMonth();

    if (month + 1 === Number(inputMonth)) return transaction;
  })

  return monthTransactions
}

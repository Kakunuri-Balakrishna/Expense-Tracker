import "./style.css";
import WalletContainer from "./../WalletContainer/index";
import ExpensesContainer from "./../ExpenseContainer/index";
import EditExpenseModal from "../Modals/EditExpenseModal";
import React, { Suspense, useState, useEffect } from "react";
import TopExpenses from "../TopExpenses";
import { enqueueSnackbar } from "notistack";

const LazyRecentTransaction = React.lazy(() =>
  import("../RecentTransactions/index")
);

const LazySimplePieChart = React.lazy(() => import("../ChartComponent/index"));

function FocusElements() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [walletBalance, setWalletBalance] = useState(
    () => parseFloat(localStorage.getItem("walletBalance")) || 0
  );
  const [transactions, setTransactions] = useState(
    () => JSON.parse(localStorage.getItem("transactions")) || []
  );

  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance);
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleEdit = (id) => {
    // Find the transaction to edit
    const transactionToEdit = transactions.find(
      (transaction) => transaction.id === id
    );
    // Perform editing logic here (e.g., open a modal for editing)
    setEditTransaction(transactionToEdit);
    setEditModalOpen(true);
    console.log("Editing transaction:", transactionToEdit);
  };
  const handleEditModalClose = () => {
    setEditModalOpen(false); // Close the EditExpenseModal
  };
  const handleEditExpense = (editedExpense) => {
    const totalExpenseBeforeEdit = transactions.reduce(
      (total, transaction) => total + transaction.price,
      0
    );

    const totalExpenseAfterEdit =
      totalExpenseBeforeEdit - editTransaction.price + editedExpense.price;
    const updatedWalletBalance =
      walletBalance - (totalExpenseAfterEdit - totalExpenseBeforeEdit);

    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === editedExpense.id ? editedExpense : transaction
    );

    setTransactions(updatedTransactions);
    if (updatedWalletBalance < 0) {
      // Wallet balance would be negative after edit
      // Revert the changes and show error message
      enqueueSnackbar(
        "Cannot change values. Editing would result in a negative wallet balance.",
        { variant: "error" }
      );
    } else {
      // Update the wallet balance and transactions
      setWalletBalance(updatedWalletBalance);
    }
    setEditModalOpen(false);
  };

  // Function to handle deleting a transaction
  const handleDelete = (id, price) => {
    // Filter out the transaction to delete
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    const updatedWalletBalance = parseFloat(walletBalance) + parseFloat(price);

    // Update the state with the filtered transactions
    setTransactions(updatedTransactions);
    setWalletBalance(updatedWalletBalance);
  };

  return (
    <div className="total-content">
      <div className="top-content-container">
        <div className="top-content-wrapper">
          <div className="wallet-balance-container">
            <WalletContainer
              walletBalance={walletBalance}
              setWalletBalance={setWalletBalance}
            />
          </div>
          <div className="expense-container">
            <ExpensesContainer
              transactions={transactions}
              setTransactions={setTransactions}
              walletBalance={walletBalance}
              setWalletBalance={setWalletBalance}
            />
          </div>
          <div className="pie-chart-container">
            <Suspense fallback={<div>Loading...</div>}>
              <LazySimplePieChart
                data={transactions.map((transaction) => ({
                  category: transaction.category,
                  price: transaction.price,
                }))}
              />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="below-content-container">
        <Suspense fallback={<div>Loading...</div>}>
          <LazyRecentTransaction
            transactions={transactions}
            setTransactions={setTransactions}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </Suspense>
        {editTransaction && (
          <EditExpenseModal
            isOpen={editModalOpen}
            closeModal={handleEditModalClose}
            expenseData={editTransaction}
            handleEditExpense={handleEditExpense} // Define this function to handle editing expenses
          />
        )}

        <TopExpenses
          data={transactions.map((transaction) => ({
            category: transaction.category,
            price: transaction.price,
          }))}
        />
      </div>
    </div>
  );
}

export default FocusElements;

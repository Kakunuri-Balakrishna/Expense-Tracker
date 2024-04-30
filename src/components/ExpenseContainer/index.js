import "./style.css";
import { AddExpenseButton } from "../Buttons";
import { useState } from "react";
import AddExpenseModal from "../Modals/AddExpenseModal/index";
import { v4 as uuidv4 } from "uuid"
function ExpensesContainer({
  transactions,
  setTransactions,
  walletBalance,
  setWalletBalance,
}) {
  const generateuuid = () => {
    return uuidv4()
  }
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  // const [nextId, setNextId] = useState(1);
  const openExpenseModal = () => {
    setIsExpenseModalOpen(true);
  };
  const closeExpenseModal = () => {
    setIsExpenseModalOpen(false);
  };

  const handleAddExpense = (expense) => {
    openExpenseModal();
    // Create new expense object with an id
    const newExpense = { id: generateuuid(), ...expense };

    // Update the transactions array with the new expense
    setTransactions((prevTransactions) => [newExpense, ...prevTransactions]);

    // Increment the counter for the next ID


    // Subtract the expense amount from the wallet balance
    const updatedWalletBalance = walletBalance - parseFloat(expense.price);
    setWalletBalance(updatedWalletBalance);
  };
  const totalExpenses = transactions.reduce(
    (total, transaction) => total + parseFloat(transaction.price),
    0
  );
  return (
    <div className="expense-container-wrapper">
      <h4 id="expense-text">
        Expenses: <span id="total-expenses-display">₹{totalExpenses}</span>
      </h4>
      {walletBalance > 0 && <AddExpenseButton onClick={openExpenseModal} />}
      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        closeModal={closeExpenseModal}
        handleAddExpense={handleAddExpense}
      />
    </div>
  );
}

export default ExpensesContainer;

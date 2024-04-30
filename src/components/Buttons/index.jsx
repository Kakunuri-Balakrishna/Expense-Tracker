import "./style.css";
const AddIncomeButton = ({ onClick }) => {
  return (
    <div className="wallet-balance-button">
      <button onClick={onClick}> + Add Income</button>
    </div>
  );
};
const AddExpenseButton = ({ onClick }) => {
  return (
    <div className="expense-button">
      <button onClick={onClick}> + Add Expense</button>
    </div>
  );
};
export { AddIncomeButton, AddExpenseButton };

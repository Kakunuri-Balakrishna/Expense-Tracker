import { useState } from "react";
import Modal from "react-modal";
import "./style.css";
function AddIncomeModal({
  isOpen,
  closeModal,
  setIncomeAmount,
  handleAddIncome,
}) {
  const [amount, setAmount] = useState("");
  const handleChange = (event) => {
    setAmount(event.target.value);
    setIncomeAmount(event.target.value);
  };
  const handleSubmit = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      handleAddIncome(parsedAmount);
      closeModal();
    } else {
      new Error("Please enter a valid positive number."); // Display error message
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h3 id="income-modal-header">Add Balance</h3>
      <div className="income-wrapper">
        <input
          id="balance-input"
          type="text"
          placeholder="Enter amount"
          value={amount}
          onChange={handleChange}
        />
        <button id="balance-button" onClick={handleSubmit}>
          Add Balance
        </button>
        <button id="cancel-button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default AddIncomeModal;

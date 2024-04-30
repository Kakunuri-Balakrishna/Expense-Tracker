import Modal from "react-modal";
import { useSnackbar } from "notistack";
import "./style.css";
import { useState } from "react";
const AddExpenseModal = ({ isOpen, closeModal, handleAddExpense }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    // Check if any field is empty
    if (!title || !price || !category || !date) {
      enqueueSnackbar('Please fill all fields', { variant: 'warning' });
      return;
    }

    // Validate title format
    if (!/^[a-zA-Z\s]*$/.test(title)) {
      enqueueSnackbar('Title should only contain characters', { variant: 'error' });
      return;
    }

    // Validate title length
    if (title.length > 12) {
      enqueueSnackbar('Title should not exceed 12 characters', { variant: 'error' });
      return;
    }

    // Validate category length
    if (category.length > 20) {
      enqueueSnackbar('Category should not exceed 20 characters', { variant: 'error' });
      return;
    }

    // Validate price input
    if (isNaN(parseFloat(price))) {
      enqueueSnackbar('Price should be a number', { variant: 'error' });
      return;
    }

    // Create a new expense object
    const newExpense = {
      title,
      price: parseFloat(price),
      category,
      date
    };

    // Call the handleAddExpense function passed as prop
    handleAddExpense(newExpense);

    // Reset input fields
    setTitle("");
    setPrice("");
    setCategory("");
    setDate("");

    // Close modal
    closeModal();
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="expense-modal"
      overlayClassName="expense-modal-overlay"
    >
      <h3 id="expense-modal-header">Add Expense</h3>
      <div className="expense-wrapper">
        <input type="text" maxLength={12} value={title} placeholder="Enter title" onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
        <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input type="date" placeholder="Date" value={date} onChange={e => setDate(e.target.value)} />
        <button id="expense-add-button" onClick={handleSubmit}>Add Expense</button>
        <button id="expense-cancel-button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};
export default AddExpenseModal;

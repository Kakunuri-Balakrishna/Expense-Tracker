import Modal from "react-modal";
import { useSnackbar } from "notistack";
import "./style.css";
import { useState, useEffect } from "react";

const EditExpenseModal = ({ isOpen, closeModal, expenseData, handleEditExpense }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (isOpen && expenseData) {
      setTitle(expenseData.title);
      setPrice(expenseData.price.toString());
      setCategory(expenseData.category);
      setDate(expenseData.date);
    }
  }, [isOpen, expenseData]);

  const handleSubmit = () => {
    // Check if any field is empty
    if (!title || !price || !category || !date) {
      enqueueSnackbar("Please fill all fields", { variant: "warning" });
      return;
    }

    // Validate title format
    if (!/^[a-zA-Z\s]*$/.test(title)) {
      enqueueSnackbar("Title should only contain characters", { variant: "error" });
      return;
    }

    // Validate title length
    if (title.length > 12) {
      enqueueSnackbar("Title should not exceed 12 characters", { variant: "error" });
      return;
    }

    // Validate category length
    if (category.length > 20) {
      enqueueSnackbar("Category should not exceed 20 characters", { variant: "error" });
      return;
    }

    // Validate price input
    if (isNaN(parseFloat(price))) {
      enqueueSnackbar("Price should be a number", { variant: "error" });
      return;
    }
    if (parseFloat(price) <= 0) {
      enqueueSnackbar("Price Should be positive integer and greater than zero", { variant: "warning" })
    }

    // Create a new expense object
    const editedExpense = {
      ...expenseData,
      title,
      price: parseFloat(price),
      category,
      date,
    };

    // Call the handleEditExpense function passed as prop
    handleEditExpense(editedExpense);

    // Close modal
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="edit-expense-modal"
      overlayClassName="edit-expense-modal-overlay"
    >
      <h3 id="edit-expense-modal-header">Edit Expense</h3>
      <div className="edit-expense-wrapper">
        <input type="text" id="title" maxLength={12} value={title} placeholder="Enter title" onChange={(e) => setTitle(e.target.value)} />
        <input type="text" id="price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="text" id="category" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="date" id="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button id="expense-edit-button" onClick={handleSubmit}>
          Save Changes
        </button>
        <button id="edit-expense-cancel-button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default EditExpenseModal;

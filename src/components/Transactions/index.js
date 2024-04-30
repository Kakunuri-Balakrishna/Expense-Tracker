import './style.css'

import { IoPizzaOutline, IoBusOutline, IoBusinessOutline, IoFootballOutline, IoFilmOutline, IoExtensionPuzzleOutline, IoPencilSharp, IoTrashBinSharp } from 'react-icons/io5';

function Transaction({ transaction, handleEdit, handleDelete }) {
  const categoryIcons = {
    food: <IoPizzaOutline size={35} />,
    transport: <IoBusOutline size={35} />,
    shopping: <IoBusinessOutline size={35} />,
    entertainment: <IoFilmOutline size={35} />,
    sport: <IoFootballOutline size={35} />
    // Add more categories and icons as needed
  };
  return (
    <div className='individual-transaction'>
      <li key={transaction.id}>
        <div id='transaction-icon'>
          {/* Display icon based on category */}
          {categoryIcons[transaction.category.toLowerCase()] || <IoExtensionPuzzleOutline size={35} />} {/* Default icon if category not found */}
        </div>
        <div id='transaction-td-wrapper'>
          <h2>{transaction.title}</h2>
          <p>{transaction.date}</p>
        </div>
        <div id='transaction-pb-wrapper'>
          {/* Edit and delete buttons */}
          <p>₹{transaction.price.toFixed(2)}</p>
          <button id="edit-icon" onClick={() => handleEdit(transaction.id)}><IoPencilSharp size={35} /></button>
          <button id="delete-icon" onClick={() => handleDelete(transaction.id, transaction.price)}><IoTrashBinSharp size={35} /></button>
        </div>
      </li>

    </div>
  )
}

export default Transaction

import './style.css';
import { useState, useEffect } from 'react';
import Transaction from '../Transactions';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';

function RecentTransaction({ transactions, setTransactions, handleEdit, handleDelete }) {
  const itemsPerPage = 3; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Update total pages when transactions change
    setTotalPages(Math.ceil(transactions.length / itemsPerPage));
  }, [transactions, itemsPerPage]);

  // Calculate the index range of transactions to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTransactions = transactions.slice(startIndex, endIndex);

  const sortedTransactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className='recent-transactions-container'>
        <h3 id='transaction-header'>Recent Transactions</h3>

        {sortedTransactions.length > 0 ? (
          <div className="transactions-list">
            {displayedTransactions.map(transaction => (
              <Transaction key={transaction.id} transaction={transaction} handleEdit={handleEdit} handleDelete={handleDelete} />
            ))}
            {totalPages > 1 && (
              <div className="pagination">
                <button id="backward-btn" onClick={goToPreviousPage} disabled={currentPage === 1}>
                  <IoArrowBackOutline />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    id='main-btn'
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={currentPage === i + 1 ? 'active' : ''}
                  >
                    {i + 1}
                  </button>
                ))}
                <button id='forward-btn' onClick={goToNextPage} disabled={currentPage === totalPages}>
                  <IoArrowForwardOutline />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="transactions-list-empty">
            <h4 id='warning-text'>No transactions yet 💵</h4>
          </div>
        )}
      </div>
    </>
  )
}

export default RecentTransaction;

import "./style.css";
import { AddIncomeButton } from "../Buttons";
import { useState } from "react";
import AddIncomeModal from "../Modals/AddIncomeModal";
function WalletContainer({ walletBalance, setWalletBalance }) {
  const [isIncomeModalopen, setIsIncomeModalOpen] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState(0);

  const openIncomeModal = () => {
    setIsIncomeModalOpen(true);
  };
  const closeIncomeModal = () => {
    setIsIncomeModalOpen(false);
  };
  const handleAddIncome = () => {
    setWalletBalance((prevbal) => prevbal + parseInt(incomeAmount));
    closeIncomeModal();
  };
  return (
    <div className="wallet-balance-wrapper">
      <h4 id="wallet-balance-text">
        Wallet Balance: <span id="wallet-balance-amt">₹{walletBalance}</span>
      </h4>
      <AddIncomeButton onClick={openIncomeModal} />
      <AddIncomeModal
        isOpen={isIncomeModalopen}
        closeModal={closeIncomeModal}
        handleAddIncome={handleAddIncome}
        setIncomeAmount={setIncomeAmount}
      />
    </div>
  );
}

export default WalletContainer;

import "./style.css";
import FocusElements from "./../FocusItems/index";

function HomePage() {
  return (
    <div className="homepage">
      <h3 id="page-heading">Expense Tracker</h3>
      <div className="main-content-container">
        <FocusElements />
        {/* <RecentTransaction /> */}
      </div>
    </div>
  );
}

export default HomePage;

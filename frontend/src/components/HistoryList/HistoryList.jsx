import PropTypes from "prop-types";

import styles from './HistoryList.module.scss'

const HistoryList = ({ historyItems }) => {
  return (
    <div className={styles.root}>
      <h2>Change History</h2>
      <ul className={historyItems}>
        {historyItems.map((item, index) => (
            console.log(item),
            
          <li key={index} className={styles.historyItem}>
            <p><strong>What changed:</strong> {item.changeType}</p>
            <p><strong>Date of change:</strong> {new Date(item.changeDate).toLocaleString()}</p>
            <p><strong>User who made the change:</strong> {item.changedBy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

HistoryList.propTypes = {
  historyItems: PropTypes.arrayOf(
    PropTypes.shape({
      change: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired, // ISO string format expected
      user: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HistoryList;

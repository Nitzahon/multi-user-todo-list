import PropTypes from "prop-types";

import styles from "./Header.module.scss";

const Header = ({ userName, loading = false, handleLogout = () => {} }) => (
    <header className={styles.root}>
        <h1>{loading? "..." : `Welcome ${userName}`}</h1>
        <button className={styles.button} onClick={handleLogout}>
            Logout
        </button>
    </header>
);
Header.propTypes = {
    handleLogout: PropTypes.func,
    loading: PropTypes.bool,
    userName: PropTypes.string,
};

export default Header;

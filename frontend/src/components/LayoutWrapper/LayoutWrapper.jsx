import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Header from "@/components/Header/HeaderContainer"; // Adjust path as needed

import styles from "./LayoutWrapper.module.scss";

const Layout = ({ children, isAuthenticated }) => {
  return (
    <div className={styles.root}>
      {isAuthenticated && <Header />}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const LayoutWrapper = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return <Layout isAuthenticated={isAuthenticated}>{children}</Layout>;
};

LayoutWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutWrapper;

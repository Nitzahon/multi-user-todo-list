import React from "react";

import _ from "lodash";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { fetchTaskHistory } from "@/features/history/historySlice";
import HistoryList from "./HistoryList";

const HistoryListContainer = ({ id }) => {
  const dispatch = useDispatch();
  const { history, loading } = useSelector((state) => state.history);

  React.useEffect(() => {
    if ((!_.isNull(history[id]) && !_.isEmpty(history[id])) || loading) {
      return;
    }
    dispatch(fetchTaskHistory(id));
  }, [dispatch, history, id, loading]);

  if (_.isNull(history[id]) || _.isEmpty(history[id])) {
    return null;
  }

  if (loading) {
    return <div className="history">Loading...</div>;
  }
  return <HistoryList historyItems={history[id]}/>;
};

HistoryListContainer.propTypes = {
  id: PropTypes.string,
};

export default HistoryListContainer;

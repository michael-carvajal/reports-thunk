/** Action Type Constants: */
export const LOAD_REPORTS = 'reports/LOAD_REPORTS';
export const RECEIVE_REPORT = 'reports/RECEIVE_REPORT';
export const UPDATE_REPORT = 'reports/UPDATE_REPORT';
export const REMOVE_REPORT = 'reports/REMOVE_REPORT';

/**  Action Creators: */
export const loadReports = (reports) => ({
  type: LOAD_REPORTS,
  reports,
});

export const receiveReport = (report) => ({
  type: RECEIVE_REPORT,
  report,
});

export const editReport = (report) => ({
  type: UPDATE_REPORT,
  report,
});

export const removeReport = (reportId) => ({
  type: REMOVE_REPORT,
  reportId,
});

/** Thunk Action Creators: */

// Your code here

export const fetchReports = () => async dispatch => {
  const response = await fetch('/api/reports');

  if (response.ok) {
    const fetchedReports = await response.json();
    // console.log(fetchedReports);
      dispatch(loadReports(fetchedReports))
  } else {
    console.log("error from server ====>  ", response.error );
  }
}
export const deleteReport = (id) => async dispatch => {
  const response = await fetch(`/api/reports/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const reportDeleted = await response.json();
    // console.log(reportDeleted);
      dispatch(removeReport(id))
  } else {
    console.log("error from server ====>  ", response.error );
  }
}

/** The reports reducer is complete and does not need to be modified */
const reportsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_REPORTS:
      const reportsState = {};
      action.reports.forEach((report) => {
        reportsState[report.id] = report;
      });
      return reportsState;
    case RECEIVE_REPORT:
      return { ...state, [action.report.id]: action.report };
    case UPDATE_REPORT:
      return { ...state, [action.report.id]: action.report };
    case REMOVE_REPORT:
      const newState = { ...state };
      delete newState[action.reportId];
      return newState;
    default:
      return state;
  }
};

export default reportsReducer;

/** Action Type Constants: */
export const LOAD_REPORTS = 'reports/LOAD_REPORTS';
export const RECEIVE_REPORT = 'reports/RECEIVE_REPORT';
export const UPDATE_REPORT = 'reports/UPDATE_REPORT';
export const REMOVE_REPORT = 'reports/REMOVE_REPORT';
export const ADD_REPORT = 'reports/ADD_REPORT';

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
    // const reportDeleted = await response.json();
    // console.log(reportDeleted);
      dispatch(removeReport(id))
  } else {
    console.log("error from server ====>  ", response.statusText );
  }
}
export const getReport = (id) => async dispatch => {
  const response = await fetch(`/api/reports/${id}`);

  if (response.ok) {
    const report = await response.json();
    // console.log(reportDeleted);
      dispatch(receiveReport(report))
  } else {
    console.log("error from server ====>  ", response.statusText );
  }
}
export const updateReport = (report) => async dispatch => {
  const response = await fetch(`/api/reports/${report.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report)
  });

  if (response.ok) {
    const updateReport = await response.json();
    // console.log(reportDeleted);
    dispatch(editReport(updateReport))
    return updateReport
  } else {
    console.log("error from server ====>  ", response.statusText );
  }
}
export const addReport = (report) => async dispatch => {
  const response = await fetch(`/api/reports/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report)
  });

  if (response.ok) {
    const data = await response.json();
    // console.log("data id is ===>>>",data.id);
    dispatch(receiveReport(data))
    return data
  } else {
    console.log("error from server ====>  ", response );
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
    case ADD_REPORT:{
      return { ...state, [action.report.id]: action.report.id }}
    case UPDATE_REPORT:{
      return { ...state, [action.report.id]: action.report }}
    default:
      return state;
  }
};

export default reportsReducer;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchReports } from '../store/reports';

import ReportIndexItem from './ReportIndexItem';

const ReportIndex = () => {
  const dispatch = useDispatch();
  const reports = useSelector(state => Object.values(state.reports)); // populate from Redux store
  // console.log(reports);
  useEffect(() => {
      dispatch(fetchReports())
  }, [dispatch])
  /* **DO NOT CHANGE THE RETURN VALUE** */
  // if (!reports) {
  //   return (
  //     <h2>Loading....</h2>
  //   )
  // }
  return (
    <section>
      <ul>
        {reports.map((report) => (
          <ReportIndexItem
            report={report}
            key={report.id}
          />
        ))}
      </ul>
      <Link
        className="back-button new"
        to="/reports/new"
      >
        New Report
      </Link>
    </section>
  );
};

export default ReportIndex;

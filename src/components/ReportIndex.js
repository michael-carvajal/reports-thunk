import { Link } from 'react-router-dom';

import ReportIndexItem from './ReportIndexItem';

const ReportIndex = () => {
  const reports = []; // populate from Redux store

  /* **DO NOT CHANGE THE RETURN VALUE** */
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
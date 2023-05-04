import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getReport } from '../store/reports';

const ReportShow = () => {
  const { reportId } = useParams();
  const report = useSelector(state => state.reports[reportId]); // populate from Redux store
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReport(reportId))
  }, [dispatch, reportId])

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <section>
      <table id="report-table">
        <thead>
          <tr>
            <th colSpan="2">Report #{reportId}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="attribute">Understanding:</td>
            <td className="value">{report?.understanding}</td>
          </tr>
          <tr>
            <td className="attribute">Improvement:</td>
            <td className="value">{report?.improvement}</td>
          </tr>
        </tbody>
      </table>
      <Link
        className="back-button"
        to="/"
      >
        Back to Report Index
      </Link>
    </section>
  );
};

export default ReportShow;

import { Link, useParams } from 'react-router-dom';

const ReportShow = () => {
  const { reportId } = useParams();
  const report = {}; // populate from Redux store

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
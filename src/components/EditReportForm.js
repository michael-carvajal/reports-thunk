import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReport } from '../store/reports';
import ReportForm from './ReportForm';

const EditReportForm = () => {
  const { reportId } = useParams();
  const report = useSelector(state => state.reports[reportId]); // populate from Redux store
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReport(reportId))
  }, [dispatch])

  if (!report) return(<></>);

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    Object.keys(report).length > 1 && (
      <>
        <ReportForm
          report={report}
          formType="Update Report"
        />
      </>
    )
  );
};

export default EditReportForm;

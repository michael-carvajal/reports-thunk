import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addReport, updateReport } from '../store/reports';

const ReportForm = ({ report, formType }) => {
  const history = useHistory();
  const [understanding, setUnderstanding] = useState(report?.understanding);
  const [improvement, setImprovement] = useState(report?.improvement);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};
    report = { ...report, understanding, improvement };

    if (formType === "Update Report") {
      console.log(improvement);
      const editedReport = await dispatch(updateReport(report));
      console.log(editedReport);
      report = editedReport;

    } else if (formType === "Create Report") {
      if (!understanding) {
        newErrors.understanding = "Understanding is required"
      }
      console.log(improvement);
      if (!improvement) {

        newErrors.improvement = "Improvement is required"
      }
      if (Object.values(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }
      const addedReport = await dispatch(addReport(report))
      report = addedReport;
    }

    if (report.errors) {
      setErrors(report.errors);
    } else {
      history.push(`/reports/${report.id}`)
    }
  };

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <form onSubmit={handleSubmit}>
      <h2>{formType}</h2>
      <div className="errors">{errors.understanding}</div>
      <label>
        Understanding:
        <input
          type="text"
          value={understanding}
          onChange={(e) => setUnderstanding(e.target.value)}
        />
      </label>
      <div className="errors">{errors.improvement}</div>
      <label>
        Improvement:
        <textarea
          value={improvement}
          onChange={(e) => setImprovement(e.target.value)}
        />
      </label>
      <button type="submit">{formType}</button>
    </form>
  );
};

export default ReportForm;

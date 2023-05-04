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


    report = { ...report, understanding, improvement };
    try {
      if (formType !==  "Update Report") {
        const newErrors = {}
        if (!understanding) {
          // console.log("value of understanding should be undefined", understanding);
          newErrors.understanding = "Understanding is required"

        }
        if (!improvement) {
          // console.log("value of improvement should be undefined", improvement);
          newErrors.improvement = "Improvement is required"

        }
        if (Object.values(newErrors).length > 0) {
          setErrors(newErrors)
          return
        }
        const data = await dispatch(addReport(report))
        history.push(`/reports/${data.id}`)

      } else {
        const newErrors = {}
        if (!understanding) {
          // console.log("value of understanding should be undefined", understanding);
          newErrors.understanding = "Understanding is required"

        }
        if (!improvement) {
          // console.log("value of improvement should be undefined", improvement);
          newErrors.improvement = "Improvement is required"

        }
        if (Object.values(newErrors).length > 0) {
          setErrors(newErrors)
          return
        }
        const data = await dispatch(updateReport(report))
        console.log(data);
        history.push(`/reports/${data.id}`)

      }
      // console.log("id in reportForm =>",data.id);
    } catch (error) {
      console.log(error);
      const newErrors = {}
      if (!understanding) {
        // console.log("value of understanding should be undefined", understanding);
        newErrors.understanding = "Understanding is required"

      }
      if (!improvement) {
        // console.log("value of improvement should be undefined", improvement);
        newErrors.improvement = "Improvement is required"

      }
      if (Object.values(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }
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

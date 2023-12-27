import { MdLocationOn } from "react-icons/md";
import { FaSuitcase } from "react-icons/fa";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { deleteJob } from "../redux/slices/Jobslice";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const Card = ({ job }) => {
  const dispatch = useDispatch();
  console.log(job);

  const color = {
    "Devam Ediyor": "orange",
    Mülakat: "red",
    Reddedildi: "green",
  };

  const handleDelete = () => {

    //api isteği atıp veri taanından kaldır
    axios
      .delete(`http://localhost:4500/jobs/${job.id}`)
      .then(() => {
        toast.info("silme işlemi başarılı");
        dispatch(deleteJob(job.id));
      })
      .catch(() => toast.err("silme işlemi başarısız"));
  };
  return (
    <div className="card">
      {/* üst kısım */}
      <div className="top-area">
        <div className="head">
          <div className="letter">
            <span>{job.company[0]}</span>
          </div>
          <div className="info">
            <p> {job.position} </p>
            <p> {job.company} </p>{" "}
          </div>
        </div>

        <div>
          {" "}
          <button onClick={handleDelete}>X</button>{" "}
        </div>
      </div>

      {/* alt kısım */}
      <div className="body">
        <div className="field">
          <MdLocationOn />
          <p> {job.location} </p>
        </div>
        <div className="field">
          <FaSuitcase />
          <p> {job.type} </p>
        </div>
        <div className="field">
          <BsFillCalendarDateFill />
          <p> {job.date} </p>
        </div>
        <div className="status">
          <p style={{ background: color[job.status] }}>{job.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

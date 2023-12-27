import axios from "axios";

import { sortOpt, statusOpt, typeOpt } from "../constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import {
  createJob,
  setError,
  setJobs,
  setloading,
} from "../redux/slices/Jobslice";
import { useEffect } from "react";

const AddJob = () => {
  const state = useSelector((store =>store.jobSlice))
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //api dan verileri alıp stora aktarır
  const fetchData=()=>{
  
    //yüklenme durumunu güncelle
    dispatch(setloading());
    axios
      .get("http://localhost:4500/jobs")
      //veri gelirse stora aktarır
      .then((res) => dispatch(setJobs(res.data)))
      //hata olursa storu güncelle
      .catch((err) => dispatch(setError()));
}
//bileşen ekrana basıldığında verileri çek
useEffect(() => {
  fetchData();

}, []);

  console.log("stateee",state)

  const handleSubmit = (e) => {
    e.preventDefault();
    //inputtan verileri al
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());


    //işe id ve oluşturma tarihi ekle

    data.id = v4();
    data.date = new Date().toLocaleDateString();

    //hem ipa a hemde stora işi ekle

    axios.post("http://localhost:4500/jobs", data).then(() => {
      navigate("/");
      dispatch(createJob(data));
      toast.success("ekleme başarılı");
    });
    //bütün formu sıfırlar
    e.target.reset();
 
  };

  return (
    <div className="add-page">
      <section style={{ border: "2px solid red" }} className="add-sec">
        <h2>Yeni İŞ Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Pozisyon</label>
            <input list="position" name="position" type="text" required />
            <datalist id="position">
              
                {state.jobs.map((job)=> ( <option value={job.position} /> ))
             
 }   

            </datalist>

          </div>
          <div>
            <label htmlFor="">Şirket</label>
            <input list="company" name="company" type="text" required />
            <datalist id="company">
              
              {state.jobs.map((job)=> ( <option value={job.company} /> ))
           
}   

          </datalist>
            
            
            
          </div>
          <div>
            <label htmlFor="">Lokasyon</label>
            <input list="location" name="location" type="text" required />
            <datalist id="location">
              
              {state.jobs.map((job)=> ( <option value={job.location} /> ))
           
}   

          </datalist>
          </div>
          <div>
            <label htmlFor="">Durum</label>
            <select name="status" required>
              <option value={""} hidden>
                Seçiniz
              </option>
              {statusOpt.map((i) => {
                return <option> {i} </option>;
              })}
            </select>
          </div>
          <div>
            <label htmlFor="">Tür</label>
            <select name="type" required>
              <option hidden value={""}>
                Seçiniz
              </option>
              {typeOpt.map((i) => {
                return <option> {i} </option>;
              })}
            </select>
          </div>

          <div>
            <button className="add-button" type="submit">
              <span className="button_top">Oluştur</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;

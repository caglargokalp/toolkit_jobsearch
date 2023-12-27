import { useDispatch } from "react-redux";
import { typeOpt, statusOpt, sortOpt } from "../constants";
import { filterBySearch, sortJobs } from "../redux/slices/Jobslice";
import { useEffect, useState } from "react";
import { clearFilters } from "../redux/slices/Jobslice";


const Filter = ({ jobs }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => dispatch(filterBySearch({field: 'company',text})), 1000);
    //eger ki süre bitmeden use effect calışırsa önceki sayacısıfırla
    //bir sayaç başlat işlemi sayaç durunca yap
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div>
      <section style={{ border: "2px solid red" }} className="filter-sec" >
      <form> 
        <h2>Filtreleme Formu</h2>

        <div>
          <label htmlFor="">Şirket İsmine Göre Ara</label>
          <input
          
            onChange={(e) => setText(e.target.value)}
            list="position"
            name="position"
            type="text"
          />

          <datalist id="position">
            {jobs.map((job) => (
              <option value={job.company} />
            ))}
          </datalist>
        </div>
        <div>
          <label htmlFor="">Durum</label>
          <select
            onChange={(e) =>
              dispatch(
                filterBySearch({ field:'status', text: e.target.value, })
              )
            }
            name="status"
          >
            <option hidden>seçiniz</option>
            {statusOpt.map((i) => {
              return <option> {i} </option>;
            })}
          </select>
        </div>
        <div>
          <label htmlFor="">Tür</label>
          <select onChange={(e) => dispatch(filterBySearch({field:'type',text:e.target.value,}))}>
            <option hidden></option>
            {typeOpt.map((i) => {
              return <option> {i} </option>;
            })}
          </select>
        </div>
        <div>
          <label htmlFor="">Sırala</label>
          <select onChange={(e)=> dispatch(sortJobs(e.target.value))} name="type">
           
            {sortOpt.map((i) => {
              return <option> {i} </option>;
            })}
          </select>
        </div>
        <div>
          <button onClick={()=> dispatch(clearFilters())}
          type="reset" className="add-button">
            <span className="button_top">Filtreleri Sıfırla</span>
          
          </button>
        </div>

       </form>
      </section>
    </div>
  );
};

export default Filter;

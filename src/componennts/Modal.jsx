

const Modal = () => {
  return (
    <div >
        <div className="container" style={{display:"flex"}}>
       
 
           
            <div style={{display:"flex", flexDirection:"column"}} >
            <h3>Yeni İş Ekle</h3>
            <label htmlFor="">pozisyon</label>
                <input type="text" />
                <label htmlFor="">Lokasyon</label>
                <input type="text" />
                <label htmlFor="">Tür</label>
                <select name="Seçiniz" id=""></select>
            </div>
            <div style={{display:"flex",flexDirection:"column"}}>
                <label htmlFor="">Şirket</label>
                <input type="" />
                <label htmlFor="">Durum</label>
                <select name="" id=""></select>
                <button className="mt-5"  >Ekle</button>
            </div>

        </div>

    </div>
  )
}

export default Modal
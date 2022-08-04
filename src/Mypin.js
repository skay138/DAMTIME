import { useState } from "react";
import axios from "axios";
import DataTable from "../Table";

const Mypin = () => {
    const [mypindata,setMypindata] = useState([]);
    const userid = sessionStorage.getItem("loginId");

    axios
        .get("https://damtime.kro.kr:4000/getmypin", userid)
        .then((res) => {
            setMypindata(res.data);
          })
        .catch((error) => console.log(error));
    
    

    return (
      <div>
        <h3>내 핀  정보</h3>
        <DataTable mypindata={mypindata} />
      </div>  
    );
}
export default Mypin
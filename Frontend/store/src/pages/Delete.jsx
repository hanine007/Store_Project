import { useState } from "react";
import { Spinner } from "../Components/spinner";
import { Backto } from "../Components/Backto";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";




export const Delete = () => {
const [loading,setLoading] = useState(false)
const navigate = useNavigate();
const {id}=useParams()
const handleDELETE=()=>{

    setLoading(true);
    axios.delete(`http://localhost:3000/api/app/${id}`)
    .then(()=>{
    navigate('/')
    setLoading(false);
    })
    .catch((error)=>{
    setLoading(false)
    console.log(error)
    })
}
    return (
        <div className="p-4">
            <Backto/>
            <h1 className="text-3xl my-4">Delete Store</h1>
            {loading?<Spinner/>:('') }
            <div className="flex flex-col items-center border-2">
                <h3 className="" >Are you sur you want to delete it ?</h3>
                <button onClick={handleDELETE} className="bg-red-500 text-white p-2 rounded-md">Delete</button>
             </div>

            
        </div>
    );
};


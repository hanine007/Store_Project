import { useState } from "react";
import { Spinner } from "../Components/spinner";
import { Backto } from "../Components/Backto";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from 'notistack';





export const Delete = () => {
    const { enqueueSnackbar } = useSnackbar(); // Utilisation de notistack pour les notifications

const [loading,setLoading] = useState(false)
const navigate = useNavigate();
const {id}=useParams()
const handleDELETE=()=>{

    setLoading(true);
    axios.delete(`http://localhost:3000/api/app/${id}`)
    .then(()=>{
    navigate('/')
    setLoading(false);
    enqueueSnackbar('Store Deleted  successfully', { variant: 'success' });

    })
    .catch((error)=>{
    setLoading(false)
    enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' });

    console.log(error)
    })
}
    return (
        <div className="p-4">
            <Backto/>
            <h1 className="text-3xl my-4">Delete Store</h1>
            {loading?<Spinner/>:('') }
            <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl">
                <h3 className="" >Are you sure you want to delete it ?</h3>
                <button onClick={handleDELETE} className="bg-red-500 text-white p-2 rounded-md">Delete</button>
             </div>

            
        </div>
    );
};


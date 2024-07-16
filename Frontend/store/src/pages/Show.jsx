import { useState,useEffect } from "react";
import { Backto } from "../Components/Backto";
import { Spinner } from "../Components/spinner";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Show = () => {
    const [store,setStore]=useState({})
const [loading,setLoading]=useState(false)
const {id}=useParams()
    useEffect(()=>{
        setLoading(true);
        axios.get(`http://localhost:3000/api/app/${id}`)
        .then(res=>{
            setStore(res.data.data);
            setLoading(false);
        })
        .catch(err=>{
            console.log(err);
            setLoading(false);})
    },[])
    
    return (
        <div>
            <Backto />
            {loading ? (
                <Spinner />
            ) : (
                <div className="p-4">
                    <h1 className="text-3xl my-8">Store Details</h1>
                    <div className="flex gap-x-4">
                        <div>
                            <p className="text-xl">Name: {store.name}</p>
                            <p className="text-xl">Price: {store.price}</p>
                            <p className="text-xl">Entry Date: {store.entry_date}</p>
                            <p className="text-xl">Exit Date: {store.exit_date}</p>
                            

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
    }


import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../Components/spinner";
import axios from 'axios';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import {BsInfoCircle}from'react-icons/bs';
import app from "../App";

export const Home = () => {
    const [store, setStore] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3000/api/app')
            .then((res) => {
                setStore(res.data.data);
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-4">
            <div className="flex justify-center item-center gap-x-4">
                <h1 className="text-3xl my-8">Store List</h1>
                <Link to="/Create" className="bg-blue-500 text-white p-2 rounded-md">
                    <MdOutlineAddBox className="text-blue-800 text-4xl" />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className="w-full border-separate border-spacing-2">
                    <thead>
                        <tr>
                            <th className="border slate-600 rounded-md">No</th>
                            <th className="border slate-600 rounded-md">Name</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Entry Date</th>
                            <th className="border px-4 py-2">Exit Date</th>
                            <th className="border px-4 py-2">Operations</th>
                        </tr>
                    </thead>
                    {store.map ((app,index)=>(
                      <tr key ={app._id}className="h-8">
                        <td className="border-state-700 rounded-md text-center">{index+1}</td>
                        <td className="border-state-700 rounded-md">{app.name}</td>
                        <td className="border-state-700 rounded-md">{app.price}</td>
                        <td className="border-state-700 rounded-md">{app.entry_date}</td>
                        <td className="border-state-700 rounded-md">{app.exit_date}</td>
                        <div className="flex justify-center gap-x-4">
                        <Link to={`/store/details/${app._id}`}>
                        <BsInfoCircle className="text-2xl text-green-800">

                        </Link>
                        <Link to =
                        </tr>  
                    ))}
import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../Components/spinner";
import axios from 'axios';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaCalculator } from 'react-icons/fa'; // Import de l'icône de somme

export const Home = () => {
    const [store, setStore] = useState([]); //store the information api
    const [loading, setLoading] = useState(false); // for know the state if ok or no

    useEffect(() => {
        setLoading(true);//is loading
        axios.get('http://localhost:3000/api/app')//get all info
            .then((res) => {
                setStore(res.data.data);//update store with the info  store in data object  
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setLoading(false);//Désactiver l'état de chargement en cas d'erreur
            });
    }, []);

   

    return (
        <div className="p-4">
            <div className="flex justify-center items-center gap-x-4">
                <h1 className="text-3xl my-8">Store List</h1>
                <Link to="/Create" className="bg-blue-500 text-white p-2 rounded-md">
                    <MdOutlineAddBox className="text-blue-800 text-4xl" />
                </Link>
                <Link to="/sum" className="bg-blue-500 text-white p-2 rounded-md flex items-center">
        <FaCalculator className="text-white text-4xl mr-2" />
        Somme
      </Link>
            </div>
            {loading ? (
                <Spinner />//true
            ) : (//flase
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
                    <tbody>
                        {store.map((app, index) => (
                            <tr key={app._id} className="h-8">
                                <td className="border slate-600 rounded-md text-center">{index + 1}</td>
                                <td className="border slate-600 rounded-md">{app.name}</td>
                                <td className="border px-4 py-2">{app.price}</td>
                                <td className="border px-4 py-2 ">{app.entry_date}</td>
                                <td className="border px-4 py-2">{app.exit_date}</td>
                                <td className="border px-4 py-2">
                                    <div className="flex justify-center gap-x-4">
                                        <Link to={`/details/${app._id}`}>
                                            <BsInfoCircle className="text-2xl text-green-800" />
                                        </Link>
                                        <Link to={`/edit/${app._id}`}>
                                            <AiOutlineEdit className="text-2xl text-yellow-600" />
                                        </Link>
                                        <Link to={`/delete/${app._id}`}>
                                            <MdOutlineDelete className="text-2xl text-red-600" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

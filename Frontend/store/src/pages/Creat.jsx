import { useState } from "react";
import { Backto } from "../Components/Backto";
import { Spinner } from "../Components/spinner"; // Assurez-vous que le chemin est correct
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';

export const Create = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [entry_date, setEntryDate] = useState('');
  const [exit_date, setExitDate] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); // Utilisation de notistack pour les notifications

  const handleSaveNew = () => {
    const data = {
      name,
      number: 'defaultNumber', // Ajout de number si nécessaire pour correspondre au modèle
      price: parseFloat(price), // Convertir le prix en nombre si nécessaire
      entry_date: new Date(entry_date), // Convertir les dates en objets Date
      exit_date: new Date(exit_date)
    };

    console.log('Data to be sent:', data); // Ajout de log
    setLoading(true);
    axios.post('http://localhost:3000/api/app', data)
   
    .then(() => {
      setLoading(false);
      enqueueSnackbar('Data saved successfully', { variant: 'success' });
      navigate('/');
    })
    .catch((error) => {
      setLoading(false);
      enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' });
      console.log('Error response:', error.response); // Log de l'erreur
      console.log('Error message:', error.message); // Log du message d'erreur
    });
  }

  return (
    <div>
      <Backto />
      {loading ? (
        <Spinner />
      ) : (
        <div className="p-4">
          <h1 className="text-3xl my-8">Create Store</h1>
          <div className="flex flex-col gap-y-4">
            <input
              type="text"
              placeholder="Name"
              className="border p-2 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              className="border p-2 rounded-md"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="date"
              placeholder="Entry Date"
              className="border p-2 rounded-md"
              value={entry_date}
              onChange={(e) => setEntryDate(e.target.value)}
            />
            <input
              type="date"
              placeholder="Exit Date"
              className="border p-2 rounded-md"
              value={exit_date}
              onChange={(e) => setExitDate(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-md"
              onClick={handleSaveNew}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

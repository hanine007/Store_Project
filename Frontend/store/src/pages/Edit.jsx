import { useState ,useEffect} from "react";
import { Backto } from "../Components/Backto";
import { Spinner } from "../Components/spinner"; // Assurez-vous que le chemin est correct
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';

export const Edit = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [entry_date, setEntryDate] = useState('');
  const [exit_date, setExitDate] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); // Utilisation de notistack pour les notifications

const {id}=useParams()

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/api/app/${id}`)
    .then((response) => {
        setEntryDate(response.data.data.entry_date)
        setExitDate(response.data.data.exit_date)
        setName(response.data.data.name)
        setPrice(response.data.data.price)

        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])
  










  const handleEdit = () => {
    const data = {
      name,
      number: 'defaultNumber', // Ajout de number si nécessaire pour correspondre au modèle
      price: parseFloat(price), // Convertir le prix en nombre si nécessaire
      entry_date: new Date(entry_date), // Convertir les dates en objets Date
      exit_date: new Date(exit_date)
    };

    console.log('Data to be sent:', data); // Ajout de log
    setLoading(true);
    axios.put(`http://localhost:3000/api/app/${id}`, data)
   
    .then(() => {
      setLoading(false);
      enqueueSnackbar('Store  Edited successfully', { variant: 'success' });
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
          <h1 className="text-3xl my-8">Edit Store</h1>
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
              onClick={handleEdit}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import  { useState, useEffect } from 'react';
import axios from 'axios';

export const Summ = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/summ')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Year</th>
            <th className="py-2 px-4 border-b">Month</th>
            <th className="py-2 px-4 border-b">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{item._id.year}</td>
              <td className="py-2 px-4 border-b">{item._id.month}</td>
              <td className="py-2 px-4 border-b">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



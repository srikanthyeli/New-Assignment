import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SubmitRating.css";

const SubmitRating = () => {
  const [stores, setStores] = useState([]);
  const [storeId, setStoreId] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/stores", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then((response) => {
      setStores(response.data);
    })
    .catch((error) => console.error("Error fetching stores:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!storeId || rating < 1 || rating > 5) {
      alert("Please select a store and a valid rating (1-5).");
      return;
    }

    axios.post("http://localhost:5000/ratings", 
      { store_id: storeId, rating },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
    .then(() => {
      alert("Rating submitted successfully!");
      navigate("/stores");
    })
    .catch((error) => alert("Error submitting rating:", error.response?.data?.message));
  };

  return (
    <div className="rating-container">
      <h2>Submit a Store Rating</h2>
      <form onSubmit={handleSubmit}>
        <label>Choose a Store:</label>
        <select value={storeId} onChange={(e) => setStoreId(e.target.value)} required>
          <option value="">Select a store</option>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>{store.name}</option>
          ))}
        </select>

        <label>Rating (1-5):</label>
        <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(Number(e.target.value))} required />

        <button type="submit">Submit Rating</button>
      </form>
    </div>
  );
};

export default SubmitRating;

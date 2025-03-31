import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [stores, setStores] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch statistics
    axios.get("http://localhost:5000/stats", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(response => setStats(response.data))
    .catch(error => console.error("Error fetching stats:", error));

    // Fetch store list
    axios.get("http://localhost:5000/stores", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(response => setStores(response.data))
    .catch(error => console.error("Error fetching stores:", error));
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="stats">
        <div className="card">
          <h3>{stats.users}</h3>
          <p>Total Users</p>
        </div>
        <div className="card">
          <h3>{stats.stores}</h3>
          <p>Total Stores</p>
        </div>
        <div className="card">
          <h3>{stats.ratings}</h3>
          <p>Total Ratings</p>
        </div>
      </div>

      <div className="store-list">
        <h3>Stores</h3>
        <input
          type="text"
          placeholder="Search stores..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <ul>
          {stores
            .filter(store => store.name.toLowerCase().includes(filter.toLowerCase()))
            .map(store => (
              <li key={store.id}>
                <span>{store.name} - {store.address}</span>
                <button onClick={() => navigate("/submit-rating")}>Rate</button>
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to Store Rating App</h1>
      <p>Rate and review stores with ease!</p>

      <div className="button-container">
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
        <button onClick={() => navigate("/stores")}>Browse Stores</button>
      </div>
    </div>
  );
};

export default Home;

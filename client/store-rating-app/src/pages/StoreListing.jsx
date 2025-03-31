import React, { useEffect, useState } from "react";
import { getStores } from "../api";
import StoreCard from "../components/StoreCard";

const StoreListing = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await getStores();
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching stores", error);
      }
    }
    fetchStores();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Stores</h2>
      <div className="grid grid-cols-3 gap-4">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};

export default StoreListing;

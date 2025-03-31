import React from "react";

const StoreCard = ({ store }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold">{store.name}</h3>
      <p>{store.address}</p>
      <p className="text-gray-600">Email: {store.email}</p>
    </div>
  );
};

export default StoreCard;

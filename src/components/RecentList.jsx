import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import { Link } from "react-router";

const RecentList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/top-cars", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
      })
      .catch((err) => console.error("Failed to load cars:", err));
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="lg:text-4xl text-xl font-bold text-center mt-15">
        Recent Listed Cars
      </h1>
      <div className="lg:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
      <div className="card-actions mt-10">
        <Link to="/all-cars" className="btn btn-primary">
          View All Cars
        </Link>
      </div>
    </div>
  );
};

export default RecentList;

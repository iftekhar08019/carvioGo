import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loading from "./Loading";

const RecentList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/top-cars", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
      })
      .catch(async (err) => {
        console.error("Failed to load cars:", err);
        await Swal.fire({
          icon: "error",
          title: "Failed to Load Recent Cars",
          text: "Unable to load recent cars. Please try again later.",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

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

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaTh, FaListUl } from "react-icons/fa";
import Loading from "../components/Loading";
import Swal from "sweetalert2";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOption, setSortOption] = useState("dateDesc");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("/api/available-cars", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch(async (err) => {
        console.error("Failed to load cars:", err);
        await Swal.fire({
          icon: "error",
          title: "Failed to Load Cars",
          text: "Unable to load available cars. Please try again later.",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter based on model, brand, or location
  const filtered = cars.filter((car) => {
    const term = searchTerm.toLowerCase();
    return (
      car.carModel.toLowerCase().includes(term) ||
      (car.brand && car.brand.toLowerCase().includes(term)) ||
      (car.location && car.location.toLowerCase().includes(term))
    );
  });

  // Sort cars based on selected option
  const sorted = [...filtered].sort((a, b) => {
    if (sortOption === "dateDesc") {
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    } else if (sortOption === "dateAsc") {
      return new Date(a.dateAdded) - new Date(b.dateAdded);
    } else if (sortOption === "priceLow") {
      return a.dailyRentalPrice - b.dailyRentalPrice;
    } else if (sortOption === "priceHigh") {
      return b.dailyRentalPrice - a.dailyRentalPrice;
    }
    return 0;
  });

  const toggleView = () => {
    setView((v) => (v === "grid" ? "list" : "grid"));
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Available Cars</h1>

      {/* Search, view toggle, and sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by model, brand, or location..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input input-bordered w-full md:w-1/3"
        />
        <div className="flex items-center gap-4">
          <button onClick={toggleView} className="btn btn-outline btn-primary">
            {view === "grid" ? <FaListUl /> : <FaTh />}
            {view === "grid" ? "List View" : "Grid View"}
          </button>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="dateDesc">Newest First</option>
            <option value="dateAsc">Oldest First</option>
            <option value="priceLow">Price: Lowest First</option>
            <option value="priceHigh">Price: Highest First</option>
          </select>
        </div>
      </div>

      {/* Car List/Grid */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            : "flex flex-col gap-6"
        }
      >
        {sorted.length > 0 ? (
          sorted.map((car) => (
            <div
              key={car._id}
              className={`card ${
                view === "grid" ? "w-80" : "w-full"
              } shadow-sm transition-transform duration-300 hover:scale-105 mt-6`}
            >
              {view === "list" ? (
                <div className="flex items-center p-4">
                  <div className="w-1/3">
                    <img
                      src={
                        car.image ||
                        "https://via.placeholder.com/384x216?text=No+Image"
                      }
                      alt={car.carModel}
                      className="rounded-xl object-cover w-full h-48"
                    />
                  </div>
                  <div className="w-2/3 pl-6">
                    <h2 className="card-title">{car.carModel}</h2>
                    <p className="text-sm text-gray-600">
                      Price: ${car.dailyRentalPrice}/day
                    </p>
                    <p
                      className={`text-sm ${
                        car.availability === "Available"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {car.availability}
                    </p>
                    <p className="text-xs text-gray-500">
                      Location: {car.location}
                    </p>
                    <div className="card-actions mt-4">
                      <button
                        onClick={() => navigate(`/cars/${car._id}`)}
                        className="btn btn-primary"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <figure className="px-10 pt-10">
                    <img
                      src={
                        car.image ||
                        "https://via.placeholder.com/384x216?text=No+Image"
                      }
                      alt={car.carModel}
                      className="rounded-xl object-cover w-full h-48"
                    />
                  </figure>
                  <div className="card-body text-center">
                    <h2 className="card-title">{car.carModel}</h2>
                    <p className="text-sm text-gray-600">
                      Price: ${car.dailyRentalPrice}/day
                    </p>
                    <p
                      className={`text-sm ${
                        car.availability === "Available"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {car.availability}
                    </p>
                    <p className="text-xs text-gray-500">
                      Location: {car.location}
                    </p>
                    <div className="card-actions mt-4">
                      <button
                        onClick={() => navigate(`/cars/${car._id}`)}
                        className="btn btn-primary"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No cars match your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default AvailableCars;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaTh, FaListUl } from "react-icons/fa";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [view, setView] = useState("grid"); // Track the view (grid or list)
  const [sortOption, setSortOption] = useState("dateDesc"); // Sorting option
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available cars
    fetch("http://localhost:3000/cars?availability=Available")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error("Failed to load cars:", err));
  }, []);

  // Sort cars based on selected option
  const sortedCars = cars.sort((a, b) => {
    if (sortOption === "dateDesc") {
      return new Date(b.dateAdded) - new Date(a.dateAdded); // Newest first
    } else if (sortOption === "dateAsc") {
      return new Date(a.dateAdded) - new Date(b.dateAdded); // Oldest first
    } else if (sortOption === "priceLow") {
      return a.dailyRentalPrice - b.dailyRentalPrice; // Lowest price first
    } else if (sortOption === "priceHigh") {
      return b.dailyRentalPrice - a.dailyRentalPrice; // Highest price first
    }
    return 0;
  });

  // Toggle between grid and list views
  const toggleView = () => {
    setView(view === "grid" ? "list" : "grid");
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Available Cars</h1>

      {/* View toggle and sorting options */}
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={toggleView} className="btn btn-outline btn-primary">
            {view === "grid" ? <FaListUl /> : <FaTh />}
            {view === "grid" ? "List View" : "Grid View"}
          </button>
        </div>

        {/* Sorting Dropdown */}
        <div>
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

      {/* Car Cards */}
      <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "flex flex-col gap-6"}>
        {sortedCars.length > 0 ? (
          sortedCars.map((car) => (
            <div
              key={car._id}
              className={`card ${view === "grid" ? "w-80" : "w-full"} shadow-sm transition-transform duration-300 hover:scale-110 mt-6`}
            >
              {/* Grid View and List View Layout */}
              {view === "list" ? (
                <div className="flex items-center p-4">
                  <div className="w-1/3">
                    <img
                      src={car.image || "https://via.placeholder.com/384x216?text=No+Image"}
                      alt={car.carModel || "Car Image"}
                      className="rounded-xl object-cover w-full h-48"
                    />
                  </div>
                  <div className="w-2/3 pl-6">
                    <h2 className="card-title flex items-center gap-2">{car.carModel || "Car Model"}</h2>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      Price: {`$${car.dailyRentalPrice || "Price not available"}/day`}
                    </p>
                    <p className={`text-sm ${car.availability === "Available" ? "text-green-600" : "text-red-600"}`}>
                      {car.availability === "Available" ? "Available" : "Not Available"}
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
                <figure className="px-10 pt-10">
                  <img
                    src={car.image || "https://via.placeholder.com/384x216?text=No+Image"}
                    alt={car.carModel || "Car Image"}
                    className="rounded-xl object-cover w-full h-48"
                  />
                </figure>
              )}

              {/* For Grid View (Image and Details together) */}
              {view === "grid" && (
                <div className="card-body text-center">
                  <h2 className="card-title flex items-center gap-2">{car.carModel || "Car Model"}</h2>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    Price: {`$${car.dailyRentalPrice || "Price not available"}/day`}
                  </p>
                  <p className={`text-sm ${car.availability === "Available" ? "text-green-600" : "text-red-600"}`}>
                    {car.availability === "Available" ? "Available" : "Not Available"}
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
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No cars available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default AvailableCars;

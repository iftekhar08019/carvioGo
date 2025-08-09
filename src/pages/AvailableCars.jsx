import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaTh, FaListUl, FaSearch, FaCar, FaFilter, FaSort } from "react-icons/fa";
import Loading from "../components/Loading";
import Swal from "sweetalert2";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import CarCard from "../components/CarCard";
import { apiRequest } from "../config/api";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOption, setSortOption] = useState("dateDesc");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    apiRequest("available-cars")
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg mb-6">
            <FaCar className="text-2xl text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Available Cars
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our collection of premium vehicles available for rent. Find the perfect car for your journey.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by model, brand, or location..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
              />
            </div>

            {/* View Toggle and Sort */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* View Toggle */}
              <motion.button
                onClick={toggleView}
                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {view === "grid" ? <FaListUl /> : <FaTh />}
                <span>{view === "grid" ? "List View" : "Grid View"}</span>
              </motion.button>

              {/* Sort Dropdown */}
              <div className="relative">
                <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm cursor-pointer"
                >
                  <option value="dateDesc">Newest First</option>
                  <option value="dateAsc">Oldest First</option>
                  <option value="priceLow">Price: Lowest First</option>
                  <option value="priceHigh">Price: Highest First</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <p className="text-gray-600 text-center">
            Found <span className="font-semibold text-blue-600">{sorted.length}</span> car{sorted.length !== 1 ? 's' : ''} available
          </p>
        </motion.div>

        {/* Car List/Grid */}
        {sorted.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={
              view === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                : "flex flex-col gap-6"
            }
          >
            {sorted.map((car, index) => (
              <motion.div
                key={car._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {view === "list" ? (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img
                          src={car.image || "https://via.placeholder.com/384x216?text=No+Image"}
                          alt={car.carModel}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{car.carModel}</h2>
                        <p className="text-lg font-semibold text-blue-600 mb-2">
                          ${car.dailyRentalPrice}/day
                        </p>
                        <p className={`text-sm mb-2 ${
                          car.availability === "Available" ? "text-green-600" : "text-red-600"
                        }`}>
                          {car.availability}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          Location: {car.location}
                        </p>
                        <motion.button
                          onClick={() => navigate(`/cars/${car._id}`)}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Book Now
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <CarCard car={car} />
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center py-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 max-w-md mx-auto">
              <FaSearch className="text-6xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No cars found</h3>
              <p className="text-gray-600">
                {searchTerm ? "No cars match your search criteria." : "No cars are currently available."}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AvailableCars;

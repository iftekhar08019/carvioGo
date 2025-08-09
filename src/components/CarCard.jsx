import React from "react";
import { useNavigate } from "react-router";
import { FaHeart, FaTag, FaCar, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaArrowRight } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const CarCard = ({
  car
}) => {
  const navigate = useNavigate();
  const { 
    _id: carId, 
    carModel, 
    dailyRentalPrice, 
    availability, 
    dateAdded, 
    image, 
  } = car || {};

  return (
    <motion.div 
      className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/20 overflow-hidden transition-all duration-300"
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={image || "https://via.placeholder.com/384x216?text=No+Image"}
          alt={carModel || "Car Image"}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Availability Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
          availability === "Available" 
            ? "bg-green-500 text-white" 
            : "bg-red-500 text-white"
        }`}>
          {availability === "Available" ? <FaCheckCircle className="inline mr-1" /> : <FaTimesCircle className="inline mr-1" />}
          {availability || "Not Available"}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Car Model */}
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <FaCar className="text-blue-500" /> 
          {carModel || "Car Model"}
        </h2>

        {/* Price */}
        <p className="text-lg font-semibold text-blue-600 mb-3 flex items-center gap-2">
          <FaTag className="text-blue-400" /> 
          {`$${dailyRentalPrice || "Price not available"}/day`}
        </p>

        {/* Date Added */}
        <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-gray-400" /> 
          {new Date(dateAdded).toLocaleDateString() || "Unknown Date"}
        </p>

        {/* View Details Button */}
        <motion.button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          onClick={() => navigate(`/cars/${carId}`)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>View Details</span>
          <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CarCard;

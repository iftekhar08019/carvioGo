import React from "react";
import { useNavigate } from "react-router";
import { FaHeart, FaTag, FaCar, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

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
    <div className="card bg-base-100 w-80 shadow-sm transition-transform duration-300 hover:scale-110 mt-6 ">
      <figure className="px-10 pt-10">
        <img
          src={image || "https://via.placeholder.com/384x216?text=No+Image"}
          alt={carModel || "Car Image"}
          className="rounded-xl object-cover w-full h-48"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title flex items-center gap-2">
          <FaCar /> {carModel || "Car Model"}
        </h2>
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <FaTag /> {`$${dailyRentalPrice || "Price not available"}/day`}
        </p>
        <p className={`text-sm flex items-center gap-2 ${availability === "Available" ? "text-green-600" : "text-red-600"}`}>
          {availability === "Available" ? <FaCheckCircle /> : <FaTimesCircle />}
          {availability || "Not Available"}
        </p>
        <p className="text-xs text-gray-500 flex items-center gap-2">
          <FaCalendarAlt /> {new Date(dateAdded).toLocaleDateString() || "Unknown Date"}
        </p>

        <div className="card-actions mt-4">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/cars/${carId}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;

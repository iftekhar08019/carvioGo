import React from "react";
import { useNavigate } from "react-router";
import { FaHeart, FaTag, FaCar, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const CarCard = ({ 
  car
}) => {
const navigate = useNavigate();
const { id: carId, model, daily_price, availability, date_posted, car_image } = car || {};

return (
    <div className="card bg-base-100 w-80 shadow-sm transition-transform duration-300 hover:scale-110 mt-6 ">
        <figure className="px-10 pt-10">
            <img
                src={car_image || "https://via.placeholder.com/384x216?text=No+Image"}
                alt={model || "Car Image"}
                className="rounded-xl object-cover w-full h-48"
            />
        </figure>
        <div className="card-body items-center text-center">
            <h2 className="card-title flex items-center gap-2">
              <FaCar /> {model || "Car Model"}
            </h2>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <FaTag /> {daily_price || "Daily Price"}
            </p>
            <p className={`text-sm flex items-center gap-2 ${availability ? "text-green-600" : "text-red-600"}`}>
              {availability ? <FaCheckCircle /> : <FaTimesCircle />}
              {availability ? "Available" : "Not Available"}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-2">
              <FaCalendarAlt /> {date_posted || "Unknown Date"}
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

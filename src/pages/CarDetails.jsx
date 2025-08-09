import React, { useState, useEffect, useContext } from "react";
import {
  FaCar,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaArrowLeft,
  FaStar,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [car, setCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/cars/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch(async (err) => {
        console.error("Failed to fetch car details:", err);
        await Swal.fire({
          icon: "error",
          title: "Failed to Load Car Details",
          text: "Unable to load car details. Please try again later.",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  const openBookingModal = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Not Logged In",
        text: "You need to be logged in to book a car.",
      });
      return;
    }
    if (!car) {
      Swal.fire({
        icon: "error",
        title: "Car Not Loaded",
        text: "Car details are still loading. Please wait and try again.",
      });
      return;
    }
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
  };

  const handleBooking = async () => {
    try {
      const userEmail = user?.email;
      if (!userEmail) {
        await Swal.fire({
          icon: "error",
          title: "Not Logged In",
          text: "You need to be logged in to book a car.",
        });
        return;
      }

      const loadingAlert = Swal.fire({
        title: "Processing Booking...",
        text: "Please wait while we process your booking.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const requestBody = { userEmail };

      const res = await fetch(`/api/cars/${id}/booking`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        credentials: "include",
      });

      loadingAlert.close();

      if (!res.ok) {
        const errorText = await res.text();
        
        if (errorText.includes("already booked")) {
          await Swal.fire({
            icon: "error",
            title: "Booking Failed",
            text: "You have already booked this car.",
          });
          return;
        } else {
          throw new Error(errorText || "Booking failed");
        }
      }

      let data;
      try {
        data = await res.json();
      } catch (error) {
        console.error("Failed to parse response as JSON:", error);
        data = { bookingCount: (car?.bookingCount || 0) + 1 };
      }
      
      setCar((prevCar) => ({
        ...prevCar,
        bookingCount: data.bookingCount || (prevCar.bookingCount + 1),
      }));

      await Swal.fire({
        icon: "success",
        title: "Booking Confirmed",
        text: "Your car has been successfully booked.",
        timer: 2000,
        showConfirmButton: false,
      });

      closeBookingModal();
    } catch (error) {
      console.error("Booking error:", error);
      await Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: error.message || "Failed to book the car. Please try again.",
      });
    }
  };

  if (!car) return <p className="text-center p-10">Loading car details...</p>;

  const {
    carModel,
    dailyRentalPrice,
    availability,
    features,
    description,
    image,
    location,
    bookingCount,
  } = car;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-6 left-6 z-20"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 text-gray-700 hover:text-blue-600"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back</span>
          </button>
        </motion.div>

        <div className="container mx-auto px-4 py-8 pt-20">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {carModel}
            </h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                availability === "Available" 
                  ? "bg-green-100 text-green-700" 
                  : "bg-red-100 text-red-700"
              }`}>
                {availability === "Available" ? <FaCheckCircle /> : <FaTimesCircle />}
                {availability}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                ))}
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                <img
                  src={image}
                  alt={carModel}
                  className="w-full h-96 lg:h-[500px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>

            {/* Details Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full lg:w-1/2"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
                {/* Price Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <FaDollarSign className="text-2xl text-blue-500" />
                    <span className="text-3xl font-bold text-gray-800">
                      ${dailyRentalPrice}
                    </span>
                    <span className="text-gray-600">/day</span>
                  </div>
                </div>

                {/* Key Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold text-gray-800">{location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50/50 rounded-xl">
                    <FaUsers className="text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">Bookings</p>
                      <p className="font-semibold text-gray-800">{bookingCount}</p>
                    </div>
                  </div>
                </div>

                {/* Features Section */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaCar className="text-blue-500" />
                    Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {features?.length > 0 ? (
                      features.map((feature, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                        >
                          {feature}
                        </motion.span>
                      ))
                    ) : (
                      <span className="text-gray-500">No features listed</span>
                    )}
                  </div>
                </div>

                {/* Description Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Description</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {description || "No description available."}
                  </p>
                </div>

                {/* Book Now Button */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-center"
                >
                  <button
                    onClick={openBookingModal}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={!user || !car}
                  >
                    {!user ? "Login to Book" : "Book Now"}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Booking Confirmation Modal */}
        {isModalOpen && car && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeBookingModal}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 max-w-md w-full"
            >
              <button
                onClick={closeBookingModal}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Confirm Booking
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-xl">
                  <span className="font-semibold text-gray-700">Car Model:</span>
                  <span className="text-gray-800">{carModel}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50/50 rounded-xl">
                  <span className="font-semibold text-gray-700">Price Per Day:</span>
                  <span className="text-gray-800">${dailyRentalPrice}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-xl">
                  <span className="font-semibold text-gray-700">Location:</span>
                  <span className="text-gray-800">{location}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={closeBookingModal}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleBooking} 
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  disabled={!user}
                >
                  Confirm Booking
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetails;

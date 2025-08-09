import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { FaCar, FaDollarSign, FaCalendarAlt, FaMapMarkerAlt, FaRegImage, FaCogs, FaPlus, FaCheckCircle } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import carAnimation from "../assets/car.json";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";

const AddCarPage = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    carModel: "",
    dailyRentalPrice: "",
    availability: "",
    vehicleRegistrationNumber: "",
    features: [],
    description: "",
    bookingCount: 0,
    image: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const features = checked
          ? [...prev.features, value]
          : prev.features.filter((feature) => feature !== value);
        return { ...prev, features };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.carModel || !formData.dailyRentalPrice || !formData.availability || 
        !formData.vehicleRegistrationNumber || !formData.description || !formData.image || !formData.location) {
      await Swal.fire({
        title: "Validation Error",
        text: "Please fill in all required fields",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    // Validate user is logged in
    if (!user?.email) {
      await Swal.fire({
        title: "Authentication Error",
        text: "You must be logged in to add a car",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const carData = {
      carModel: formData.carModel,
      dailyRentalPrice: Number(formData.dailyRentalPrice),
      availability: formData.availability,
      vehicleRegistrationNumber: formData.vehicleRegistrationNumber,
      features: formData.features || [],
      description: formData.description,
      bookingCount: 0,
      image: formData.image,
      location: formData.location,
      userEmail: user.email,
      userName: user.displayName || user.email,
      dateAdded: new Date().toISOString(),
    };

    try {
      console.log("Sending car data:", carData); // Debug log

      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
        credentials: "include",
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server response:", errorText); // Debug log
        throw new Error(`Failed to add car: ${res.status} - ${errorText}`);
      }

      const result = await res.json();
      console.log("Success response:", result); // Debug log

      await Swal.fire({
        title: "Success!",
        text: "Car added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form
      setFormData({
        carModel: "",
        dailyRentalPrice: "",
        availability: "",
        vehicleRegistrationNumber: "",
        features: [],
        description: "",
        bookingCount: 0,
        image: "",
        location: "",
      });
    } catch (error) {
      console.error("Error adding car:", error);
      await Swal.fire({
        title: "Error",
        text: error.message || "Failed to add car. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const features = ["GPS", "AC", "Bluetooth", "Sunroof", "Leather Seats", "Backup Camera"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Car Animation Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <Lottie 
            animationData={carAnimation} 
            loop={true} 
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl"
        >
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg mb-4">
              <FaCar className="text-2xl text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Add Your Car
            </h1>
            <p className="text-gray-600 text-lg">
              Share your vehicle and start earning from car rentals
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-6"
              >
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <FaCar className="text-blue-500" />
                    Basic Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Car Model */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Car Model</label>
                    <div className="relative">
                      <FaCar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        name="carModel"
                        value={formData.carModel}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        type="text"
                        placeholder="e.g., Toyota Camry"
                        required
                      />
                    </div>
                  </div>

                  {/* Daily Rental Price */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Daily Rental Price</label>
                    <div className="relative">
                      <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        name="dailyRentalPrice"
                        value={formData.dailyRentalPrice}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        type="number"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Availability</label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        type="text"
                        placeholder="e.g., Available Now"
                        required
                      />
                    </div>
                  </div>

                  {/* Registration Number */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Registration Number</label>
                    <div className="relative">
                      <FaCogs className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        name="vehicleRegistrationNumber"
                        value={formData.vehicleRegistrationNumber}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        type="text"
                        placeholder="e.g., ABC-123"
                        required
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        type="text"
                        placeholder="e.g., Downtown, City"
                        required
                      />
                    </div>
                  </div>

                  {/* Image URL */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <div className="relative">
                      <FaRegImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        type="text"
                        placeholder="https://example.com/car-image.jpg"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-white/80 backdrop-blur-sm"
                    rows="4"
                    placeholder="Describe your car, its features, condition, and any special notes..."
                    required
                  ></textarea>
                </div>
              </motion.div>

              {/* Features Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="space-y-6"
              >
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    Features & Amenities
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Select the features your car offers</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {features.map((feature) => (
                    <motion.label
                      key={feature}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 bg-white/80 backdrop-blur-sm ${
                        formData.features.includes(feature)
                          ? "border-blue-500 bg-blue-50/80 shadow-md"
                          : "border-gray-200 hover:border-blue-300 hover:bg-gray-50/80"
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="features"
                        value={feature}
                        checked={formData.features.includes(feature)}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className={`font-medium ${
                        formData.features.includes(feature) ? "text-blue-700" : "text-gray-700"
                      }`}>
                        {feature}
                      </span>
                    </motion.label>
                  ))}
                </div>
              </motion.div>

              {/* Booking Count Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700">Initial Booking Count</label>
                <input
                  type="number"
                  name="bookingCount"
                  value={formData.bookingCount}
                  readOnly
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50/80 text-gray-500 cursor-not-allowed backdrop-blur-sm"
                  placeholder="0"
                />
                <p className="text-sm text-gray-500">This will be set to 0 for new cars</p>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="pt-6"
              >
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FaPlus className="text-lg" />
                  Add Your Car
                </button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddCarPage;

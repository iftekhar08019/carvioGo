import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaTrash, FaCar, FaPlus, FaSort, FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const initialCarState = {
  carModel: "",
  dailyRentalPrice: "",
  availability: "",
  vehicleRegistrationNumber: "",
  features: "",
  description: "",
  image: "",
  location: "",
};

const MyCars = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState(initialCarState);
  const [sortBy, setSortBy] = useState("date-desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`/api/cars?email=${user.email}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setCars(data))
        .catch(async (err) => {
          console.error("Failed to fetch cars", err);
          await Swal.fire({
            icon: "error",
            title: "Failed to Load Cars",
            text: "Unable to load your cars. Please try again later.",
          });
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user?.email]);

  if (loading) {
    return <Loading />;
  }

  if (!user) return <p className="text-center p-10">Loading user info...</p>;

  const openEditModal = (car) => {
    setEditingCar(car);
    setFormData(car);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingCar(null);
  };

  const handleFormChange = (e) => {
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `/api/cars/${editingCar._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Update failed");

      setCars((prev) =>
        prev.map((r) => (r._id === editingCar._id ? formData : r))
      );
      closeEditModal();

      await Swal.fire({
        icon: "success",
        title: "Car Updated",
        text: "Your car details have been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update car details. Please try again.",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this car? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `/api/cars/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Delete failed");

      setCars((prev) => prev.filter((r) => r._id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your car has been deleted.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Failed to delete car. Please try again.",
      });
    }
  };

  const sortedCars = [...cars].sort((a, b) => {
    if (sortBy === "date-desc") {
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
    if (sortBy === "date-asc") {
      return new Date(a.dateAdded) - new Date(b.dateAdded);
    }
    if (sortBy === "price-asc") {
      return Number(a.dailyRentalPrice) - Number(b.dailyRentalPrice);
    }
    if (sortBy === "price-desc") {
      return Number(b.dailyRentalPrice) - Number(a.dailyRentalPrice);
    }
    return 0;
  });

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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg mb-6">
              <FaCar className="text-2xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Cars
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Manage your car listings and track your rental business
            </p>
          </motion.div>

          {cars.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              {/* Empty State Illustration */}
              <div className="relative mb-8">
                <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-lg">
                  <FaCar className="text-6xl text-blue-500" />
                </div>
                {/* Floating elements for visual appeal */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60 animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              </div>

              {/* Main Message */}
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                No Cars Added Yet
              </h2>
              
              <p className="text-lg text-gray-600 max-w-md mb-8 leading-relaxed">
                Start your journey by adding your first car to the platform. Share your vehicle and begin earning from car rentals!
              </p>

              {/* Features List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <FaPlus className="text-blue-500 text-xl" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Easy to Add</h3>
                  <p className="text-sm text-gray-600">Simple form to add your car details</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <FaCar className="text-green-500 text-xl" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Start Earning</h3>
                  <p className="text-sm text-gray-600">Begin earning from car rentals immediately</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Secure & Safe</h3>
                  <p className="text-sm text-gray-600">Your cars are protected and insured</p>
                </motion.div>
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link
                  to="/add-car"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <FaPlus className="mr-3 group-hover:rotate-90 transition-transform duration-300 relative z-10" />
                  <span className="relative z-10">Add Your First Car</span>
                </Link>
              </motion.div>

              {/* Additional Info */}
              <p className="text-sm text-gray-500 mt-6">
                Need help? Contact our support team for assistance
              </p>
            </motion.div>
          ) : (
            <>
              {/* Sort Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <FaSort className="text-blue-500" />
                    <label className="font-semibold text-gray-700">Sort by:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    >
                      <option value="date-desc">Date Added (Newest First)</option>
                      <option value="date-asc">Date Added (Oldest First)</option>
                      <option value="price-asc">Price (Lowest First)</option>
                      <option value="price-desc">Price (Highest First)</option>
                    </select>
                  </div>
                  <div className="text-sm text-gray-600">
                    {cars.length} car{cars.length !== 1 ? 's' : ''} found
                  </div>
                </div>
              </motion.div>

              <div className="overflow-x-auto">
                {/* Desktop Table */}
                <div className="hidden md:block bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Car Image</th>
                        <th className="px-6 py-4 text-left font-semibold">Car Model</th>
                        <th className="px-6 py-4 text-left font-semibold">Daily Rental Price</th>
                        <th className="px-6 py-4 text-left font-semibold">Booking Count</th>
                        <th className="px-6 py-4 text-left font-semibold">Availability</th>
                        <th className="px-6 py-4 text-left font-semibold">Date Added</th>
                        <th className="px-6 py-4 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedCars.map((car, index) => (
                        <motion.tr
                          key={car._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <img
                              src={car.image}
                              alt={car.carModel}
                              className="w-16 h-16 object-cover rounded-xl shadow-md"
                            />
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-800">{car.carModel}</td>
                          <td className="px-6 py-4 text-blue-600 font-semibold">{`$${car.dailyRentalPrice}/day`}</td>
                          <td className="px-6 py-4">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                              {car.bookingCount}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              car.availability === "Available" 
                                ? "bg-green-100 text-green-700" 
                                : "bg-red-100 text-red-700"
                            }`}>
                              {car.availability}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {new Date(car.dateAdded).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <motion.button
                                onClick={() => openEditModal(car)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <FaEdit className="text-sm" /> Update
                              </motion.button>
                              <motion.button
                                onClick={() => handleDelete(car._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <FaTrash className="text-sm" /> Delete
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {sortedCars.map((car, index) => (
                    <motion.div
                      key={car._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={car.image}
                          alt={car.carModel}
                          className="w-20 h-20 object-cover rounded-xl shadow-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{car.carModel}</h3>
                          <p className="text-blue-600 font-semibold">{`$${car.dailyRentalPrice}/day`}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Bookings</p>
                          <p className="font-semibold text-blue-600">{car.bookingCount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Status</p>
                          <span className={`px-2 py-1 rounded-full text-sm font-semibold ${
                            car.availability === "Available" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-red-100 text-red-700"
                          }`}>
                            {car.availability}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => openEditModal(car)}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FaEdit className="text-sm" /> Update
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(car._id)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FaTrash className="text-sm" /> Delete
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Edit Modal */}
        {isModalOpen && editingCar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeEditModal}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={closeEditModal}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Update Car
              </h3>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    type="text"
                    placeholder="Car Model"
                    required
                  />
                  <input
                    name="dailyRentalPrice"
                    value={formData.dailyRentalPrice}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    type="number"
                    placeholder="Daily Rental Price"
                    required
                  />
                  <input
                    name="availability"
                    value={formData.availability}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    type="text"
                    placeholder="Availability"
                    required
                  />
                  <input
                    name="vehicleRegistrationNumber"
                    value={formData.vehicleRegistrationNumber}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    type="text"
                    placeholder="Vehicle Registration Number"
                    required
                  />
                  <input
                    name="image"
                    value={formData.image}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    type="text"
                    placeholder="Image URL"
                    required
                  />
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    type="text"
                    placeholder="Location"
                    required
                  />
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows="4"
                  placeholder="Description"
                  required
                ></textarea>

                <div className="mt-4">
                  <label className="block font-semibold mb-2">Features:</label>
                  <div className="flex flex-wrap gap-4">
                    {["GPS", "AC", "Bluetooth", "Leather Seats"].map(
                      (feature) => (
                        <label
                          key={feature}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            name="features"
                            value={feature}
                            checked={formData.features?.includes(feature)}
                            onChange={handleFormChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          />
                          {feature}
                        </label>
                      )
                    )}
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Changes
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCars;

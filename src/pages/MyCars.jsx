import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaTrash, FaCar, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import { Link } from "react-router";

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
  const [cars, setCars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState(initialCarState);
  const [sortBy, setSortBy] = useState("date-desc"); // default: newest first
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
          credentials: "include", // Include credentials for cookie-based auth
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
    <div className="min-h-screen bg-transparent py-10 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">My Cars</h1>

      {cars.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
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
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaPlus className="text-blue-500 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Easy to Add</h3>
              <p className="text-sm text-gray-600">Simple form to add your car details</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaCar className="text-green-500 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Start Earning</h3>
              <p className="text-sm text-gray-600">Begin earning from car rentals immediately</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Secure & Safe</h3>
              <p className="text-sm text-gray-600">Your cars are protected and insured</p>
            </div>
          </div>

          {/* Call to Action */}
          <Link
            to="/add-car"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <FaPlus className="mr-3 group-hover:rotate-90 transition-transform duration-300 relative z-10" />
            <span className="relative z-10">Add Your First Car</span>
          </Link>

          {/* Additional Info */}
          <p className="text-sm text-gray-500 mt-6">
            Need help? Contact our support team for assistance
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-3 mb-4 items-center justify-between">
            <div>
              <label className="font-semibold mr-2">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-bordered select-sm"
              >
                <option value="date-desc">Date Added (Newest First)</option>
                <option value="date-asc">Date Added (Oldest First)</option>
                <option value="price-asc">Price (Lowest First)</option>
                <option value="price-desc">Price (Highest First)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            {/* Desktop Table */}
            <table className="table w-full hidden md:table">
              <thead>
                <tr>
                  <th>Car Image</th>
                  <th>Car Model</th>
                  <th>Daily Rental Price</th>
                  <th>Booking Count</th>
                  <th>Availability</th>
                  <th>Date Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedCars.map((car) => (
                  <tr key={car._id}>
                    <td>
                      <img
                        src={car.image}
                        alt={car.model}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td>{car.carModel}</td>
                    <td>{`$${car.dailyRentalPrice}/day`}</td>
                    <td>{car.bookingCount}</td>
                    <td>{car.availability}</td>
                    <td>{new Date(car.dateAdded).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => openEditModal(car)}
                        className="btn btn-sm btn-outline btn-primary flex items-center gap-2"
                      >
                        <FaEdit /> Update
                      </button>
                      <button
                        onClick={() => handleDelete(car._id)}
                        className="btn btn-sm btn-outline btn-error flex items-center gap-2"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card View */}
            <div className="block md:hidden flex flex-col gap-4">
              {sortedCars.map((car) => (
                <div
                  key={car._id}
                  className="bg-white rounded-xl shadow p-4 flex flex-col gap-3"
                >
                  {/* ... your mobile card content ... */}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Modal */}
      {isModalOpen && (
        <>
          <input
            type="checkbox"
            id="edit-modal"
            className="modal-toggle"
            checked={isModalOpen}
            readOnly
          />
          <div className="modal">
            <div className="modal-box relative max-w-3xl">
              <label
                htmlFor="edit-modal"
                className="btn btn-sm btn-circle absolute right-4 top-4"
                onClick={closeEditModal}
              >
                ✕
              </label>

              <h3 className="text-lg font-bold mb-4">Update Car</h3>

              <form
                onSubmit={handleUpdate}
                className="space-y-4 max-h-[70vh] overflow-y-auto"
              >
                <input
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleFormChange}
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="Car Model"
                  required
                />
                <input
                  name="dailyRentalPrice"
                  value={formData.dailyRentalPrice}
                  onChange={handleFormChange}
                  className="input input-bordered w-full"
                  type="number"
                  placeholder="Daily Rental Price"
                  required
                />
                <input
                  name="availability"
                  value={formData.availability}
                  onChange={handleFormChange}
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="Availability"
                  required
                />
                <input
                  name="vehicleRegistrationNumber"
                  value={formData.vehicleRegistrationNumber}
                  onChange={handleFormChange}
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="Vehicle Registration Number"
                  required
                />
                <input
                  name="image"
                  value={formData.image}
                  onChange={handleFormChange}
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="Image URL"
                  required
                />
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="Location"
                  required
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="textarea textarea-bordered w-full"
                  placeholder="Description"
                  required
                ></textarea>

                <div className="mt-2">
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
                            checked={formData.features.includes(feature)}
                            onChange={handleFormChange}
                            className="checkbox checkbox-sm"
                          />
                          {feature}
                        </label>
                      )
                    )}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary mt-4 w-full">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyCars;

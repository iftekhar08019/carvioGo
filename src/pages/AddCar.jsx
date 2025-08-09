import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { FaCar, FaDollarSign, FaCalendarAlt, FaMapMarkerAlt, FaRegImage, FaCogs } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";

const AddCarPage = () => {
  const { user } = useContext(AuthContext); // get current logged-in user
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

    const carData = {
      ...formData,
      bookingCount: 0,
      user: {
        name: user?.displayName || "Anonymous",
        email: user?.email,
      },
      dateAdded: new Date(),
    };

    try {
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carData),
        credentials: "include", // important for http-only cookies
      });

      if (!res.ok) {
        throw new Error(`Failed to add car: ${res.statusText}`);
      }

      const data = await res.json();
      Swal.fire({
        title: "Success!",
        text: "Car added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

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
      console.error(error);
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to add car",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div
      className="hero min-h-full bg-fixed"
      style={{
        backgroundImage:
          "url(https://hips.hearstapps.com/hmg-prod/images/vol-27-pcoty-2025-group-1-677dbc61d16c0.jpg?crop=0.819xw:0.918xh;0.112xw,0.0815xh&resize=768:*)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content w-full max-w-5xl text-neutral-content">
        <form onSubmit={handleSubmit} className="bg-white w-full rounded-md shadow-xl p-8 text-black">
          <h2 className="text-3xl font-bold text-center mb-6 text-black">Add New Car</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-2">
              <FaCar className="text-xl" />
              <input
                name="carModel"
                value={formData.carModel}
                onChange={handleChange}
                className="input input-bordered w-full"
                type="text"
                placeholder="Car Model"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <FaDollarSign className="text-xl" />
              <input
                name="dailyRentalPrice"
                value={formData.dailyRentalPrice}
                onChange={handleChange}
                className="input input-bordered w-full"
                type="number"
                placeholder="Daily Rental Price"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-xl" />
              <input
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="input input-bordered w-full"
                type="text"
                placeholder="Availability"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <FaRegImage className="text-xl" />
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="input input-bordered w-full"
                type="text"
                placeholder="Image URL"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-xl" />
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input input-bordered w-full"
                type="text"
                placeholder="Location"
                required
              />
            </div>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full md:col-span-2"
              placeholder="Description"
              required
            ></textarea>

            <input
              name="vehicleRegistrationNumber"
              value={formData.vehicleRegistrationNumber}
              onChange={handleChange}
              className="input input-bordered w-full"
              type="text"
              placeholder="Vehicle Registration Number"
              required
            />
          </div>

          <div className="mt-6">
            <div className="form-control mt-5">
              <label className="label">
                <span className="label-text font-semibold">Booking Count</span>
              </label>
              <input
                type="number"
                name="bookingCount"
                value={formData.bookingCount}
                readOnly
                disabled
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Features */}
          <div className="mt-6">
            <label className="label font-semibold">Features:</label>
            <div className="flex flex-wrap gap-4">
              {["GPS", "AC", "Bluetooth", "Sunroof", "Leather Seats", "Backup Camera"].map((feature) => (
                <label key={feature} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="features"
                    value={feature}
                    checked={formData.features.includes(feature)}
                    onChange={handleChange}
                    className="checkbox checkbox-sm"
                  />
                  {feature}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-8 w-full">
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCarPage;

import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

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

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/cars?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setCars(data))
        .catch((err) => console.error("Failed to fetch cars", err));
    }
  }, [user?.email]);

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
        `http://localhost:3000/cars/${editingCar._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
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
      Swal.fire({
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
      const res = await fetch(`http://localhost:3000/cars/${id}`, {
        method: "DELETE",
      });
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
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Failed to delete car. Please try again.",
      });
    }
  };

  if (!user) return <p className="text-center p-10">Loading user info...</p>;

  return (
    <div className="min-h-screen bg-transparent py-10 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">My Cars</h1>

      {cars.length === 0 && (
        <p className="text-center text-gray-600">
          You have not added any cars yet. <a href="/add-car" className="text-blue-600">Add a car</a>
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="table w-full">
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
            {cars.map((car) => (
              <tr key={car._id}>
                <td>
                  <img
                    src={car.image}
                    alt={car.model}
                    className="w-16 h-16 object-cover"
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
      </div>

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
                    {["GPS", "AC", "Bluetooth", "Leather Seats"].map((feature) => (
                      <label key={feature} className="flex items-center gap-2">
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
                    ))}
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

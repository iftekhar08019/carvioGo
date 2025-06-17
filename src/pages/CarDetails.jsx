import React, { useState, useEffect, useContext } from "react";
import { FaCar, FaDollarSign, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const CarDetails = () => {
  const { id } = useParams(); // Fetching the car ID from the URL
  const { user } = useContext(AuthContext);

  const [car, setCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch the car details using the car ID
    fetch(`http://localhost:3000/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch((err) => console.error("Failed to fetch car details:", err));
  }, [id]);

  const openBookingModal = () => {
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
  };

const handleBooking = async () => {
  try {
    const userEmail = user?.email;
    if (!userEmail) {
      Swal.fire({
        icon: "error",
        title: "Not Logged In",
        text: "You need to be logged in to book a car.",
      });
      return;
    }

    // Check if the user has already booked the car
    const res = await fetch(`http://localhost:3000/cars/${id}/booking`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail }), // Pass the userEmail in the request body
    });

    if (!res.ok) {
      const error = await res.text();
      if (error === "You have already booked this car") {
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: "You have already booked this car.",
        });
        return;
      } else {
        throw new Error("Booking failed");
      }
    }

    const data = await res.json();
    setCar((prevCar) => ({
      ...prevCar,
      bookingCount: data.bookingCount,
    }));

    Swal.fire({
      icon: "success",
      title: "Booking Confirmed",
      text: "Your car has been successfully booked.",
      timer: 2000,
      showConfirmButton: false,
    });

    closeBookingModal();
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Booking Failed",
      text: "Failed to book the car. Please try again.",
    });
  }
};





  if (!car) return <p className="text-center p-10">Loading car details...</p>;

  const { carModel, dailyRentalPrice, availability, features, description, image, location, bookingCount } = car;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto px-4 py-8">
        <h1 className="lg:text-4xl text-xl font-bold text-center my-7">
          {carModel}
        </h1>

        <div className="flex flex-col lg:flex-row mx-4 gap-8">
          {/* Image Section */}
          <div className="w-full md:w-1/2 px-4">
            <img
              src={image}
              alt={carModel}
              className="w-full h-auto rounded-lg shadow-md mb-4 object-cover max-h-[400px]"
            />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{carModel}</h2>
            <p className="text-xl text-gray-800 mb-4">
              <FaDollarSign className="inline mr-2" />
              {`${dailyRentalPrice}/day`}
            </p>

            <div className="flex items-center gap-4 mb-4">
              <p className={`text-sm flex items-center gap-2 ${availability === "Available" ? "text-green-600" : "text-red-600"}`}>
                {availability === "Available" ? <FaCheckCircle /> : <FaTimesCircle />}
                {availability}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Features:</h3>
              <ul className="flex flex-wrap gap-3">
                {features?.length > 0 ? (
                  features.map((feature, index) => (
                    <li key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {feature}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No features listed</li>
                )}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-1">Description:</h3>
              <p className="whitespace-pre-wrap text-gray-700">{description}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Location:</span> {location}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Booking Count:</span> {bookingCount}
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={openBookingModal}
                className="btn btn-primary flex items-center gap-2"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {isModalOpen && (
        <>
          <input
            type="checkbox"
            id="booking-modal"
            className="modal-toggle"
            checked={isModalOpen}
            readOnly
          />
          <div className="modal">
            <div className="modal-box relative max-w-3xl">
              <label
                htmlFor="booking-modal"
                className="btn btn-sm btn-circle absolute right-4 top-4"
                onClick={closeBookingModal}
              >
                ✕
              </label>

              <h3 className="text-lg font-bold mb-4">Confirm Booking</h3>
              <p className="mb-4">You are about to book the following car:</p>

              <div className="space-y-2 mb-6">
                <p className="text-lg font-semibold">Car Model: {carModel}</p>
                <p className="text-lg font-semibold">
                  Price Per Day: ${dailyRentalPrice}
                </p>
                <p className="text-lg font-semibold">
                  Location: {location}
                </p>
              </div>

              <div className="flex justify-end gap-4">
                <button onClick={closeBookingModal} className="btn btn-secondary">
                  Cancel
                </button>
                <button onClick={handleBooking} className="btn btn-primary">
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CarDetails;

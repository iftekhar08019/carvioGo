import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router";
import { FaDollarSign } from "react-icons/fa";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const fmt = (d) =>
    new Date(d).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bookings?email=${user.email}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then(setBookings)
        .catch((err) => console.error("Failed to load bookings:", err));
    }
  }, [user?.email]);

  const handleCancelBooking = async (bookingId) => {
    const { isConfirmed } = await Swal.fire({
      title: "Cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "No",
      confirmButtonColor: "#dc2626",
    });
    if (!isConfirmed) return;

    try {
      const response = await fetch(
        `http://localhost:3000/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const text = await response.text();
      let payload;
      try {
        payload = JSON.parse(text);
      } catch {
        payload = { message: text };
      }
      if (!response.ok) {
        return Swal.fire(
          "Cancel failed",
          payload.error || payload.message,
          "error"
        );
      }
      setBookings((bs) =>
        bs.map((b) => (b._id === bookingId ? { ...b, status: "Canceled" } : b))
      );
      Swal.fire("Canceled", "Your booking was canceled.", "success");
    } catch (err) {
      console.error("NETWORK ERROR in cancel:", err);
      Swal.fire("Cancel failed", err.message, "error");
    }
  };

  const openModifyModal = (booking) => {
    setCurrentBooking(booking);
    const start = booking.startDate
      ? new Date(booking.startDate)
      : new Date(booking.bookingDate);
    const end = booking.endDate
      ? new Date(booking.endDate)
      : new Date(booking.bookingDate);
    setDateRange([start, end]);
    setModalOpen(true);
  };

  const handleModifyConfirm = async () => {
    if (!startDate || !endDate) {
      return Swal.fire("Please select start and end dates", "", "warning");
    }
    try {
      const res = await fetch(
        `http://localhost:3000/bookings/${currentBooking._id}/modify`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            newStartDate: startDate.toISOString(),
            newEndDate: endDate.toISOString(),
          }),
          credentials: "include",
        }
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }
      const updated = await res.json();
      setBookings((bs) =>
        bs.map((b) => (b._id === updated._id ? { ...b, ...updated } : b))
      );
      setModalOpen(false);
      Swal.fire("Updated", "Booking dates updated.", "success");
    } catch (err) {
      console.error("Modify error:", err);
      Swal.fire("Update failed", err.message, "error");
    }
  };

  if (!user) return <p className="text-center mt-10">Loading user info...</p>;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        My Bookings
      </h1>
      {bookings.length === 0 ? (
        <div className="text-center mt-10">
          <p className="mb-4">You haven't booked any car yet.</p>
          <Link to="/available-cars" className="btn btn-primary">
            Go to Available Cars
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-2 font-semibold text-left">Image</th>
                  <th className="px-4 py-2 font-semibold text-left">Model</th>
                  <th className="px-4 py-2 font-semibold text-left">
                    Date Range
                  </th>
                  <th className="px-4 py-2 font-semibold text-left">
                    Total Price
                  </th>
                  <th className="px-4 py-2 font-semibold text-left">Status</th>
                  <th className="px-4 py-2 font-semibold text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => {
                  const disabled = b.status === "Canceled";
                  const btnClass = disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "";
                  return (
                    <tr
                      key={b._id}
                      className={`${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:shadow-md`}
                    >
                      <td className="px-4 py-3">
                        <img
                          src={b.carImage}
                          alt={b.carModel}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-3">{b.carModel}</td>
                      <td className="px-4 py-3 space-x-1">
                        <FaCalendarAlt className="inline text-gray-600" />
                        {fmt(b.startDate || b.bookingDate)} –{" "}
                        {fmt(b.endDate || b.bookingDate)}
                      </td>
                      <td className="px-4 py-3">
                        <FaDollarSign className="inline mr-1" />
                        {b.totalPrice}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={
                            b.status === "Canceled"
                              ? "text-red-600"
                              : "text-green-600"
                          }
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 space-x-2">
                        <button
                          onClick={() => openModifyModal(b)}
                          disabled={disabled}
                          className={`btn btn-sm btn-outline btn-primary flex items-center ${btnClass}`}
                        >
                          <FaCalendarAlt className="mr-1" /> Modify Date
                        </button>
                        <button
                          onClick={() => handleCancelBooking(b._id)}
                          disabled={disabled}
                          className={`btn btn-sm btn-outline btn-error flex items-center ${btnClass}`}
                        >
                          <FaTimesCircle className="mr-1" /> Cancel
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Mobile Card List */}
          <div className="md:hidden space-y-4">
            {bookings.map((b) => {
              const disabled = b.status === "Canceled";
              const btnClass = disabled ? "opacity-50 cursor-not-allowed" : "";
              return (
                <div
                  key={b._id}
                  className="border rounded-lg p-4 shadow hover:shadow-md transition"
                >
                  <div className="flex items-center mb-3">
                    <img
                      src={b.carImage}
                      alt={b.carModel}
                      className="w-20 h-20 object-cover rounded mr-4"
                    />
                    <div>
                      <h2 className="font-semibold text-lg">{b.carModel}</h2>
                      <p className="text-gray-600">
                        <FaCalendarAlt className="inline mr-1" />{" "}
                        {fmt(b.startDate || b.bookingDate)} –{" "}
                        {fmt(b.endDate || b.bookingDate)}
                      </p>
                      <p className="text-gray-600">
                        <FaDollarSign className="inline mr-1" />${b.totalPrice}
                      </p>
                      <p
                        className={
                          b.status === "Canceled"
                            ? "text-red-600"
                            : "text-green-600"
                        }
                      >
                        {b.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => openModifyModal(b)}
                      disabled={disabled}
                      className={`btn btn-sm btn-outline btn-primary flex items-center ${btnClass}`}
                    >
                      <FaCalendarAlt className="mr-1" /> Modify
                    </button>
                    <button
                      onClick={() => handleCancelBooking(b._id)}
                      disabled={disabled}
                      className={`btn btn-sm btn-outline btn-error flex items-center ${btnClass}`}
                    >
                      <FaTimesCircle className="mr-1" /> Cancel
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Modify Date Modal */}
          {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Select new dates</h2>
                <DatePicker
                  selected={startDate}
                  onChange={(update) => setDateRange(update)}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  minDate={new Date()}
                  inline
                />
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleModifyConfirm}
                    className="btn btn-primary"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyBookings;

import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaTimesCircle, FaCar, FaArrowLeft, FaEdit, FaTrash, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router";
import Loading from "../components/Loading";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [loading, setLoading] = useState(true);

  const fmt = (d) =>
    new Date(d).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`/api/bookings?email=${user.email}`, { credentials: "include" })
        .then(async (res) => {
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || res.statusText);
          }
          return res.json();
        })
        .then(setBookings)
        .catch(async (err) => {
          console.error("Failed to load bookings:", err);
          await Swal.fire({
            icon: "error",
            title: "Failed to Load Bookings",
            text: "Unable to load your bookings. Please try again later.",
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
        `/api/bookings/${bookingId}/cancel`,
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
      await Swal.fire("Cancel failed", err.message, "error");
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
        `/api/bookings/${currentBooking._id}/modify`,
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
      await Swal.fire("Update failed", err.message, "error");
    }
  };

  if (!user) return <p className="text-center mt-10">Loading user info...</p>;

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
              <FaCalendarAlt className="text-2xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Bookings
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Manage your car rental bookings and track your travel history
            </p>
          </motion.div>

          {bookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center py-12"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 max-w-md mx-auto">
                <FaCar className="text-6xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No bookings yet</h3>
                <p className="text-gray-600 mb-6">
                  You haven't booked any car yet. Start exploring our available cars!
                </p>
                <Link
                  to="/available-cars"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <FaCar className="text-sm" />
                  Browse Available Cars
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Image</th>
                      <th className="px-6 py-4 text-left font-semibold">Model</th>
                      <th className="px-6 py-4 text-left font-semibold">Date Range</th>
                      <th className="px-6 py-4 text-left font-semibold">Total Price</th>
                      <th className="px-6 py-4 text-left font-semibold">Status</th>
                      <th className="px-6 py-4 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b, i) => {
                      const disabled = b.status === "Canceled";
                      return (
                        <motion.tr
                          key={b._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className={`border-b border-gray-200 hover:bg-gray-50/50 transition-colors duration-200 ${
                            disabled ? "opacity-50" : ""
                          }`}
                        >
                          <td className="px-6 py-4">
                            <img
                              src={b.carImage}
                              alt={b.carModel}
                              className="w-16 h-16 object-cover rounded-xl shadow-md"
                            />
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-800">{b.carModel}</td>
                          <td className="px-6 py-4 text-gray-600">
                            <div className="flex flex-col">
                              <span className="text-sm">
                                <FaCalendarAlt className="inline mr-1 text-blue-500" />
                                {fmt(b.startDate || b.bookingDate)}
                              </span>
                              <span className="text-sm">
                                <FaCalendarAlt className="inline mr-1 text-purple-500" />
                                {fmt(b.endDate || b.bookingDate)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <FaDollarSign className="text-green-500" />
                              <span className="font-semibold text-green-600">{b.totalPrice}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              b.status === "Active" 
                                ? "bg-green-100 text-green-700" 
                                : b.status === "Canceled"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              {!disabled && (
                                <>
                                  <motion.button
                                    onClick={() => openModifyModal(b)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-xl transition-all duration-200 flex items-center gap-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <FaEdit className="text-sm" /> Modify
                                  </motion.button>
                                  <motion.button
                                    onClick={() => handleCancelBooking(b._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl transition-all duration-200 flex items-center gap-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <FaTrash className="text-sm" /> Cancel
                                  </motion.button>
                                </>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {bookings.map((b, i) => {
                  const disabled = b.status === "Canceled";
                  return (
                    <motion.div
                      key={b._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 ${
                        disabled ? "opacity-50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={b.carImage}
                          alt={b.carModel}
                          className="w-20 h-20 object-cover rounded-xl shadow-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{b.carModel}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <FaDollarSign className="text-green-500" />
                            <span className="font-semibold text-green-600">{b.totalPrice}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Start Date</p>
                          <p className="font-semibold text-gray-800">
                            {fmt(b.startDate || b.bookingDate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">End Date</p>
                          <p className="font-semibold text-gray-800">
                            {fmt(b.endDate || b.bookingDate)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          b.status === "Active" 
                            ? "bg-green-100 text-green-700" 
                            : b.status === "Canceled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {b.status}
                        </span>
                      </div>

                      {!disabled && (
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => openModifyModal(b)}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <FaEdit className="text-sm" /> Modify
                          </motion.button>
                          <motion.button
                            onClick={() => handleCancelBooking(b._id)}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <FaTrash className="text-sm" /> Cancel
                          </motion.button>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Modify Modal */}
        {modalOpen && currentBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 max-w-md w-full"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Modify Booking
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select New Date Range:
                  </label>
                  <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => setDateRange(update)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    minDate={new Date()}
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <motion.button
                    onClick={handleModifyConfirm}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Confirm Changes
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;

import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loading from "./Loading";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaCar, FaArrowRight } from "react-icons/fa";

const RecentList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/top-cars", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
      })
      .catch(async (err) => {
        console.error("Failed to load cars:", err);
        await Swal.fire({
          icon: "error",
          title: "Failed to Load Recent Cars",
          text: "Unable to load recent cars. Please try again later.",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg mb-6">
          <FaCar className="text-2xl text-white" />
        </div>
        <h1 className="lg:text-4xl text-2xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Recent Listed Cars
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover the latest cars added to our platform. Find your perfect ride from our carefully curated selection.
        </p>
      </motion.div>

      <motion.div 
        className="lg:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {cars.map((car, index) => (
          <motion.div
            key={car._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <CarCard car={car} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="card-actions mt-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Link 
          to="/all-cars" 
          className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <span>View All Cars</span>
          <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </motion.div>
    </div>
  );
};

export default RecentList;

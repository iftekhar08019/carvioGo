import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

export const CustomerReviews = () => {
  const reviews = [
    {
      name: "Sophia Bennett",
      role: "Frequent Traveler",
      review:
        "Booking a car has never been this easy. The interface is intuitive and the service is super reliable!",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      rating: 5,
    },
    {
      name: "Liam Carter",
      role: "Business Consultant",
      review:
        "Their customer support is top-notch. I had an issue and it was resolved in minutes. Highly recommended!",
      image:
        "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      rating: 5,
    },
    {
      name: "Ava Smith",
      role: "Tourist",
      review:
        "Great selection of cars, competitive prices, and seamless pickup experience. I'll definitely use them again!",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      rating: 5,
    },
  ];

  return (
    <div className="px-4 py-20 mx-auto max-w-screen-xl" id="reviews">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Hear from our satisfied customers who have experienced the CarvioGo difference
        </p>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: false, amount: 0.2 }}
            whileHover={{ y: -10 }}
          >
            {/* Quote Icon */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <FaQuoteLeft className="text-white text-sm" />
            </div>

            {/* Rating Stars */}
            <div className="flex justify-center mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 w-5 h-5" />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-gray-700 italic mb-6 text-center leading-relaxed">
              "{review.review}"
            </p>

            {/* Customer Info */}
            <div className="flex flex-col items-center">
              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 rounded-full mb-3 object-cover border-4 border-white shadow-lg"
              />
              <p className="font-semibold text-lg text-gray-900">{review.name}</p>
              <p className="text-sm text-gray-500">{review.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;

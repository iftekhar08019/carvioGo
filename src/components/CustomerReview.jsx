import { motion } from "framer-motion";

export const CustomerReviews = () => {
  const reviews = [
    {
      name: "Sophia Bennett",
      role: "Frequent Traveler",
      review:
        "Booking a car has never been this easy. The interface is intuitive and the service is super reliable!",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
      name: "Liam Carter",
      role: "Business Consultant",
      review:
        "Their customer support is top-notch. I had an issue and it was resolved in minutes. Highly recommended!",
      image:
        "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
      name: "Ava Smith",
      role: "Tourist",
      review:
        "Great selection of cars, competitive prices, and seamless pickup experience. I’ll definitely use them again!",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
  ];

  return (
    <div className="px-4 py-20 mx-auto max-w-screen-xl" id="reviews">
      <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-20 h-20 rounded-full mb-4 object-cover"
            />
            <p className="text-gray-700 italic mb-4">"{review.review}"</p>
            <p className="font-semibold text-lg">{review.name}</p>
            <p className="text-sm text-gray-500">{review.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default CustomerReviews;

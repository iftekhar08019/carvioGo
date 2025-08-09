import { motion } from "framer-motion";
import { FaTags, FaGift, FaCarAlt, FaArrowRight } from "react-icons/fa";

export const SpecialOffers = () => {
  const offers = [
    {
      title: "15% Off Weekend Rentals",
      description: "Book your ride this weekend and get an exclusive 15% discount on all vehicles.",
      cta: "Book Now",
      icon: <FaTags className="text-3xl" />,
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-50 to-pink-50"
    },
    {
      title: "Luxury Cars at $99/day",
      description: "Drive in style this holiday season. Limited-time pricing on our premium fleet.",
      cta: "Learn More",
      icon: <FaCarAlt className="text-3xl" />,
      gradient: "from-blue-500 to-purple-500",
      bgGradient: "from-blue-50 to-purple-50"
    },
    {
      title: "Refer & Earn $20",
      description: "Invite a friend and earn $20 credit when they complete their first booking.",
      cta: "Refer Now",
      icon: <FaGift className="text-3xl" />,
      gradient: "from-green-500 to-teal-500",
      bgGradient: "from-green-50 to-teal-50"
    },
  ];

  return (
    <div className="px-4 py-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-24">
      <motion.div 
        className="max-w-xl mb-16 md:mx-auto text-center lg:max-w-2xl md:mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-red-900 uppercase rounded-full bg-gradient-to-r from-red-100 to-pink-100 shadow-sm"
          whileHover={{ scale: 1.05 }}
        >
          Special Offers
        </motion.div>
        <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
          Deals You Don't Want to Miss
        </h2>
        <p className="mt-4 text-lg text-gray-600 md:text-xl">
          Grab limited-time offers to make your ride more affordable and exciting.
        </p>
      </motion.div>

      <div className="grid gap-8 row-gap-5 sm:grid-cols-1 lg:grid-cols-3">
        {offers.map((offer, index) => (
          <motion.div
            key={index}
            className="relative p-8 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            initial={{ x: 80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.03, y: -10 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${offer.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <motion.div 
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${offer.gradient} flex items-center justify-center text-white shadow-lg mb-6`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {offer.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{offer.title}</h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">{offer.description}</p>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="/"
                  className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r ${offer.gradient} rounded-xl hover:shadow-lg transition-all duration-300 group`}
                >
                  <span>{offer.cta}</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

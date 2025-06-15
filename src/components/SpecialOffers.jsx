import { motion } from "framer-motion";
import { FaTags,FaGift, FaCarAlt } from "react-icons/fa";

export const SpecialOffers = () => {
  const offers = [
    {
      title: "15% Off Weekend Rentals",
      description: "Book your ride this weekend and get an exclusive 15% discount on all vehicles.",
      cta: "Book Now",
      icon: <FaTags className="text-3xl text-red-500 mb-4" />,
    },
    {
      title: "Luxury Cars at $99/day",
      description: "Drive in style this holiday season. Limited-time pricing on our premium fleet.",
      cta: "Learn More",
      icon: <FaCarAlt className="text-3xl text-red-500 mb-4" />,
    },
    {
      title: "Refer & Earn $20",
      description: "Invite a friend and earn $20 credit when they complete their first booking.",
      cta: "Refer Now",
      icon: <FaGift className="text-3xl text-red-500 mb-4" />,
    },
  ];

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto text-center lg:max-w-2xl md:mb-12">
        <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-red-900 uppercase rounded-full bg-red-100">
          Special Offers
        </p>
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Deals You Don't Want to Miss</h2>
        <p className="mt-4 text-base text-gray-600 md:text-lg">
          Grab limited-time offers to make your ride more affordable and exciting.
        </p>
      </div>
      <div className="grid gap-8 row-gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            initial={{ x: 80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div>
              {offer.icon}
              <h3 className="text-xl font-semibold text-gray-800">{offer.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{offer.description}</p>
            </div>
            <div className="mt-6">
              <a
                href="/"
                className="inline-block px-5 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition"
              >
                {offer.cta}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

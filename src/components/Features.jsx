import { FaCarSide, FaMoneyBillWave, FaRegCalendarCheck, FaHeadset } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export const Feature = () => {
  const features = [
    {
      icon: <FaCarSide className="w-8 h-8 sm:w-12 sm:h-12" />,
      title: "Wide Variety of Cars",
      description: "From fuel-efficient compact cars to luxury SUVs, we have a vehicle for every style and budget.",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100"
    },
    {
      icon: <FaMoneyBillWave className="w-8 h-8 sm:w-12 sm:h-12" />,
      title: "Affordable Prices",
      description: "Enjoy competitive daily rates and no hidden fees—transparent pricing you can rely on.",
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100"
    },
    {
      icon: <FaRegCalendarCheck className="w-8 h-8 sm:w-12 sm:h-12" />,
      title: "Easy Booking Process",
      description: "Book your car in just a few clicks with our intuitive and responsive platform.",
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100"
    },
    {
      icon: <FaHeadset className="w-8 h-8 sm:w-12 sm:h-12" />,
      title: "24/7 Customer Support",
      description: "Our dedicated support team is here for you—anytime, anywhere you need help.",
      gradient: "from-pink-500 to-pink-600",
      bgGradient: "from-pink-50 to-pink-100"
    }
  ];

  return (
    <div className="px-4 py-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-24">
      <motion.div 
        className="max-w-xl mb-16 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="max-w-lg mb-6 font-sans text-4xl font-bold leading-none tracking-tight text-gray-900 sm:text-5xl md:mx-auto">
          <span className="relative inline-block">
            <span className="relative bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose
            </span>
          </span>{' '}
          CarvioGo?
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Discover what sets CarvioGo apart — your trusted partner in seamless, affordable, and reliable car rentals.
        </p>
      </motion.div>
      
      <div className="grid gap-8 row-gap-12 lg:grid-cols-2">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="max-w-md sm:mx-auto sm:text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className={`flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg sm:mx-auto sm:w-24 sm:h-24`}
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-white">
                {feature.icon}
              </div>
            </motion.div>
            <h6 className="mb-3 text-xl font-bold leading-5 text-gray-900">{feature.title}</h6>
            <p className="mb-3 text-sm text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Feature;

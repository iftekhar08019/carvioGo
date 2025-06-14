import { FaCarSide, FaMoneyBillWave, FaRegCalendarCheck, FaHeadset } from 'react-icons/fa';

export const Feature = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <span className="relative">Why Choose</span>
          </span>{' '}
          CarvioGo?
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Discover what sets CarvioGo apart — your trusted partner in seamless, affordable, and reliable car rentals.
        </p>
      </div>
      <div className="grid gap-8 row-gap-12 lg:grid-cols-2">
        {/* Feature 1 */}
        <div className="max-w-md sm:mx-auto sm:text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <FaCarSide className="w-12 h-12 text-indigo-600 sm:w-20 sm:h-20" />
          </div>
          <h6 className="mb-3 text-xl font-bold leading-5">Wide Variety of Cars</h6>
          <p className="mb-3 text-sm text-gray-900">
            From fuel-efficient compact cars to luxury SUVs, we have a vehicle for every style and budget.
          </p>
        </div>
        {/* Feature 2 */}
        <div className="max-w-md sm:mx-auto sm:text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <FaMoneyBillWave className="w-12 h-12 text-indigo-600 sm:w-20 sm:h-20" />
          </div>
          <h6 className="mb-3 text-xl font-bold leading-5">Affordable Prices</h6>
          <p className="mb-3 text-sm text-gray-900">
            Enjoy competitive daily rates and no hidden fees—transparent pricing you can rely on.
          </p>
        </div>
        {/* Feature 3 */}
        <div className="max-w-md sm:mx-auto sm:text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <FaRegCalendarCheck className="w-12 h-12 text-indigo-600 sm:w-20 sm:h-20" />
          </div>
          <h6 className="mb-3 text-xl font-bold leading-5">Easy Booking Process</h6>
          <p className="mb-3 text-sm text-gray-900">
            Book your car in just a few clicks with our intuitive and responsive platform.
          </p>
        </div>
        {/* Feature 4 */}
        <div className="max-w-md sm:mx-auto sm:text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <FaHeadset className="w-12 h-12 text-indigo-600 sm:w-20 sm:h-20" />
          </div>
          <h6 className="mb-3 text-xl font-bold leading-5">24/7 Customer Support</h6>
          <p className="mb-3 text-sm text-gray-900">
            Our dedicated support team is here for you—anytime, anywhere you need help.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Feature;

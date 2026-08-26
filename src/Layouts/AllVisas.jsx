import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // framer-motion ইম্পোর্ট করা হয়েছে
import Lottie from "lottie-react";
import empty from "../assets/empty.json";
import useAllVisa from "../hooks/useAllVisa";
import VisaCard from "../Components/AllVisaCard/VisaCard";
import { FiSliders } from "react-icons/fi";
import Loader from "../Components/shared/Loader";

const AllVisas = () => {
  const { loader, allVisaData, setFilter } = useAllVisa();

  // গ্রিড কন্টেইনারের কাস্টম অ্যানিমেশন ভ্যারিয়েন্ট
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }, // প্রতিটি কার্ড একের পর এক আসবে
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="w-11/12 max-w-7xl mx-auto bg-white select-none pb-24 pt-20">
      {/* Dynamic Header Hero Terminal */}
      <div className="text-center py-12 lg:py-16  border-b border-gray-50 mb-12">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-2"
        >
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
            Explore All Visas
          </h2>
          <p className="text-xs text-gray-400 font-bold  ">
            Find and apply for your ideal global destination
          </p>
        </motion.div>
      </div>

      {/* Controller & Filter Terminal Panel */}
      <div className="w-full mb-10 flex items-center justify-start">
        <div className="relative flex items-center">
          <FiSliders className="absolute left-4 text-gray-400 text-sm pointer-events-none" />
          <select
            onChange={(e) => setFilter(e.target.value)}
            defaultValue="all"
            className="w-full pl-10 pr-4 py-3 text-xs font-bold tracking-wider  bg-gray-50 border border-gray-100 rounded-xl outline-none text-gray-700 focus:border-primaryBlue focus:bg-white transition-all duration-300 cursor-pointer appearance-none"
          >
            <option value="all">All Visa Types</option>
            <option value="Tourist Visa">Tourist Visa</option>
            <option value="Student Visa">Student Visa</option>
            <option value="Official Visa">Official Visa</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Dynamic Main Body Content Terminal */}
      {loader ? (
        <Loader />
      ) : (
        <AnimatePresence mode="wait">
          {allVisaData.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <figure className="w-full max-w-sm mx-auto">
                <Lottie animationData={empty} loop={true} />
              </figure>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-400 tracking-tight mt-4">
                No Visa Documents Found
              </h3>
            </motion.div>
          ) : (
            <motion.div
              key="visa-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 "
            >
              {allVisaData.map((visaCard) => (
                <motion.div key={visaCard._id} variants={cardVariants}>
                  <VisaCard visaCard={visaCard} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default AllVisas;

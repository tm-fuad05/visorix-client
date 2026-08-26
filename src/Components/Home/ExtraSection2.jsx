import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // framer-motion ইম্পোর্ট করা হয়েছে
import { RxBorderSolid } from "react-icons/rx";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import axios from "axios";

const ExtraSection2 = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("../reviews.json").then((res) => setReviews(res.data));
  }, []);

  // গ্রিড কন্টেইনারের কাস্টম অ্যানিমেশন ভ্যারিয়েন্ট
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // প্রতিটি কার্ড একের পর এক সিকোয়েন্সে আসবে
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 16 },
    },
  };

  return (
    <div className="w-11/12 max-w-7xl mx-auto mb-20 mt-16 overflow-hidden select-none">
      {/* Header Area with Motion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center w-10/12 lg:w-7/12 mx-auto text-center mb-12 space-y-2"
      >
        <p className="text-[10px] font-bold  text-blue-600 ">
          CLIENTS TESTIMONIALS
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
          What Customers Saying About Visorix
        </h2>
        <RxBorderSolid className="text-4xl text-blue-500 -mt-2" />
      </motion.div>

      {/* Reviews Interactive Grid Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {reviews.map((review, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{
              y: -6,
              scale: 1.01,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-xl shadow-gray-100/40 transition-all duration-300 hover:border-blue-500/30"
          >
            {/* Identity Terminal Node */}
            <div className="flex flex-col items-center text-center sm:w-1/3 flex-shrink-0 space-y-2">
              <figure className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-gray-50 shadow-inner">
                <img
                  className="w-full h-full object-cover"
                  src={
                    review.image ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt={review.name}
                />
              </figure>
              <div>
                <h6 className="font-bold text-sm text-gray-900 leading-snug">
                  {review.name}
                </h6>
                <p className="text-[11px] font-medium text-gray-400 tracking-wide">
                  {review.location}
                </p>
              </div>
            </div>

            {/* Content Body Terminal Node */}
            <div className="flex flex-col text-center sm:text-left sm:w-2/3 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h6 className="font-bold text-sm text-blue-600 tracking-tight">
                  {review.title}
                </h6>
                <div className="flex justify-center sm:justify-start">
                  <Rating
                    readonly
                    initialRating={review.rating}
                    emptySymbol={
                      <FaRegStar className="text-xs text-amber-400 mx-[1px]" />
                    }
                    fullSymbol={
                      <FaStar className="text-xs text-amber-400 mx-[1px]" />
                    }
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                "{review.review}"
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ExtraSection2;

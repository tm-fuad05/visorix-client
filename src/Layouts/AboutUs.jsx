import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // framer-motion ইম্পোর্ট করা হয়েছে
import { FiChevronDown, FiShield, FiCpu, FiAward } from "react-icons/fi";

const AboutUs = () => {
  const [activeItem, setActiveItem] = useState(null);

  const toggleAccordion = (item) => {
    setActiveItem(activeItem === item ? null : item);
  };

  const faqs = [
    {
      id: "item1",
      question: "What services does Visorix offer?",
      answer:
        "Visorix specializes in assisting with visa applications for various purposes such as travel, work, education, and more. Our team ensures a smooth and efficient process.",
    },
    {
      id: "item2",
      question: "How can I get started with Visorix?",
      answer:
        "Getting started is simple! Contact us through our website, provide the required details, and our team will guide you through the next steps.",
    },
    {
      id: "item3",
      question: "Why choose Visorix?",
      answer:
        "Visorix stands out for our expertise, personalized service, and dedication to making visa applications hassle-free for our clients.",
    },
  ];

  return (
    <div className="bg-white min-h-screen select-none pt-32 pb-20">
      {/* Upper Brand Section */}
      <div className="w-11/12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-24">
        {/* Welcome Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50/50 border border-gray-100 rounded-3xl p-8 lg:p-10 flex flex-col justify-center space-y-4"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome to{" "}
            <span className="text-primaryBlue font-logo tracking-tighter">
              Visorix
            </span>
          </h2>
          <p className="text-md font-medium text-gray-500 leading-relaxed">
            At Visorix, we are dedicated to simplifying your visa application
            process. Our mission is to provide clear, accurate, and efficient
            guidance tailored to your unique travel needs. With years of
            experience and a commitment to excellence, we strive to make your
            journey seamless and stress-free.
          </p>
          <p className="text-md font-medium text-gray-500 leading-relaxed">
            Whether you are traveling for business, leisure, or education, our
            expert team is here to assist you every step of the way. Discover a
            hassle-free visa experience with Visorix.
          </p>
        </motion.div>

        {/* Core Values Minimalist Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gray-50/50 border border-gray-100 rounded-3xl p-8 lg:p-10 flex flex-col justify-center space-y-6"
        >
          <div>
            <h4 className="text-xl font-bold text-gray-900 tracking-tight">
              Our Core Values
            </h4>
            <p className="text-md text-gray-400 font-medium mt-1">
              Integrity, Transparency, and Excellence are at the heart of
              everything we do.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="flex flex-col items-center text-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm shadow-gray-100/50">
              <FiShield className="text-xl text-primaryBlue mb-2" />
              <span className="text-[10px] font-bold  tracking-wider text-gray-700">
                Integrity
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm shadow-gray-100/50">
              <FiCpu className="text-xl text-secondaryIndigo mb-2" />
              <span className="text-[10px] font-bold  tracking-wider text-gray-700">
                Clarity
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm shadow-gray-100/50">
              <FiAward className="text-xl text-blue-500 mb-2" />
              <span className="text-[10px] font-bold  tracking-wider text-gray-700">
                Quality
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Accordion FAQ Section with Smooth Heights */}
      <div className="w-11/12 max-w-3xl mx-auto">
        <div className="text-center mb-10 space-y-1">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[11px] font-bold text-gray-400  ">
            Everything you need to know about our workflow
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = activeItem === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden bg-white ${isOpen ? "border-primaryBlue/30 shadow-lg shadow-primaryBlue/5" : "border-gray-100"}`}
              >
                <button
                  className="w-full flex justify-between items-center p-5 text-left text-md font-bold text-gray-800 hover:text-primaryBlue transition-colors focus:outline-none cursor-pointer bg-white"
                  onClick={() => toggleAccordion(faq.id)}
                >
                  <span className="tracking-wide">{faq.question}</span>
                  <FiChevronDown
                    className={`text-sm text-gray-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180 text-primaryBlue" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-md font-medium text-gray-500 leading-relaxed border-t border-gray-50/50 bg-gray-50/30">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

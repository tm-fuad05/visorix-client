import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlinePhone } from "react-icons/hi2";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";

// Slide Assets
import slide1 from "../../assets/slide1.png";
import slide2 from "../../assets/slide2.png";
import slide3 from "../../assets/slide3.png";

const slides = [
  {
    id: 1,
    image: slide1,

    titlePrefix: "Welcome to ",
    titleHighlight: "Visorix",
    titleSuffix: "!",
    highlightGradient: "from-blue-500 via-indigo-500 to-cyan-400",
    description:
      "Navigating the visa process can be complex—trust us to simplify it for you. With personalized solutions, we ensure a smooth and stress-free application journey.",
    buttonText: "Contact Us",
    buttonLink: "/contact-us",
    buttonIcon: HiOutlinePhone,
  },
  {
    id: 2,
    image: slide2,

    titlePrefix: "Achieve Your ",
    titleHighlight: "Immigration",
    titleSuffix: " Goals",
    highlightGradient: "from-blue-500 via-indigo-500 to-purple-500",
    description:
      "Whether you're starting a new life abroad or planning a temporary visit, we provide expert guidance to help you achieve your immigration goals effortlessly.",
    buttonText: "Contact Us",
    buttonLink: "/contact-us",
    buttonIcon: HiOutlinePhone,
  },
  {
    id: 3,
    image: slide3,

    titlePrefix: "Explore Global ",
    titleHighlight: "Opportunities",
    titleSuffix: "",
    highlightGradient: "from-orange-500 via-amber-500 to-red-500",
    description:
      "Discover the easiest and most reliable pathways to secure your visa for work, study, or travel. Let us guide you toward fulfilling your international dreams with confidence.",
    buttonText: "Explore All Visas",
    buttonLink: "/all-visas",
    buttonIcon: FiArrowRight,
  },
];

const contentVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: custom * 0.1,
      ease: "easeOut",
    },
  }),
};

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const paginate = useCallback((direction) => {
    setActiveIndex((prevIndex) => {
      let nextIndex = prevIndex + direction;
      if (nextIndex < 0) nextIndex = slides.length - 1;
      if (nextIndex >= slides.length) nextIndex = 0;
      return nextIndex;
    });
  }, []);

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [paginate]);

  const currentSlide = slides[activeIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-neutral-950 select-none">
      {/* Preloaded Stacked Background Images with GPU-accelerated Crossfade */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={false}
            animate={{
              opacity: index === activeIndex ? 1 : 0,
              scale: index === activeIndex ? 1 : 1.05,
            }}
            transition={{
              opacity: { duration: 1, ease: "easeInOut" },
              scale: { duration: 6, ease: "linear" },
            }}
            className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/60 to-neutral-950/30 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40 z-10 pointer-events-none" />

      {/* Slide Text Content */}
      <div className="relative z-20 w-11/12 max-w-7xl mx-auto h-full flex flex-col justify-center items-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
            className="max-w-3xl space-y-6 text-left"
          >
            {/* Heading */}
            <motion.h1
              custom={2}
              variants={contentVariants}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
            >
              {currentSlide.titlePrefix}
              <span
                className={`bg-gradient-to-r ${currentSlide.highlightGradient} bg-clip-text text-transparent`}
              >
                {currentSlide.titleHighlight}
              </span>
              {currentSlide.titleSuffix}
            </motion.h1>

            {/* Description */}
            <motion.p
              custom={3}
              variants={contentVariants}
              className="text-base sm:text-lg md:text-xl text-gray-300 font-normal max-w-2xl leading-relaxed"
            >
              {currentSlide.description}
            </motion.p>

            {/* CTA Button */}
            <motion.div custom={4} variants={contentVariants} className="pt-4">
              <Link
                to={currentSlide.buttonLink}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] rounded-2xl text-white font-bold text-sm transition-all duration-300 group"
              >
                <currentSlide.buttonIcon className="text-lg group-hover:translate-x-1 transition-transform" />
                <span>{currentSlide.buttonText}</span>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Dots / Bar Indicator */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex items-center justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
              activeIndex === index
                ? "w-10 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/50"
                : "w-2.5 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;

import React, { useState, useEffect } from "react";
import banner from "../assets/banner.gif";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Hero = () => {
  const [charIndex, setCharIndex] = useState(0);
  
  const mainText = "Find the Ride That Moves You.";
  const displayText = mainText.slice(0, charIndex);

  useEffect(() => {
    if (charIndex < mainText.length) {
      const timeout = setTimeout(() => {
        setCharIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [charIndex]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingTextVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const glowVariants = {
    animate: {
      textShadow: [
        "0 0 5px rgba(255,255,255,0.5)",
        "0 0 20px rgba(255,255,255,0.8)",
        "0 0 5px rgba(255,255,255,0.5)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="hero min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${banner})`,
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated background overlay */}
      <motion.div 
        className="hero-overlay absolute inset-0 bg-opacity-40"
        variants={floatingVariants}
        animate="animate"
      />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="hero-content text-neutral-content text-center relative z-10"
        variants={itemVariants}
      >
        <motion.div 
          className="max-w-md"
          variants={containerVariants}
        >
          {/* Enhanced Title Animation */}
          <motion.div
            className="mb-5 text-5xl font-bold relative"
            variants={titleVariants}
            animate="animate"
          >
            <motion.h1 
              className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
              variants={glowVariants}
              animate="animate"
            >
              {displayText.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.1,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
              <motion.span
                className="inline-block w-1 h-12 bg-white ml-1"
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.h1>
            
            {/* Floating subtitle */}
        
          </motion.div>
          
          {/* Enhanced Description Animation */}
          <motion.div
            className="mb-5 text-lg leading-relaxed"
            variants={textVariants}
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              {[
                "Discover the finest selection of premium cars,",
                "carefully curated to reflect your unique style,",
                
              ].map((text, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, x: -30, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ 
                    delay: 1.4 + (index * 0.2), 
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                >
                  {text}{index === 2 ? <br /> : index < 5 ? " " : ""}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
          >
            <Link
              to="/available-cars"
              className="relative inline-flex items-center justify-center p-4 px-8 py-4 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-lg group bg-white hover:shadow-2xl"
            >
              <motion.span 
                className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 to-purple-600 group-hover:translate-x-0 ease"
                whileHover={{
                  scale: 1.1,
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.span>
              <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease font-semibold">
                Browse Cars
              </span>
              <span className="relative invisible font-semibold">Browse Cars</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;

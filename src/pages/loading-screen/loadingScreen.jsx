// src/pages/LoadingScreen.jsx
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Cahaya blencong */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-yellow-500/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Siluet Wayang */}
      <motion.img
        src="/img/3.svg"
        alt="Wayang Loading"
        className="w-40 h-40 object-contain drop-shadow-lg"
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Teks */}
      <motion.div
        className="mt-6 flex items-center space-x-2 text-lg font-medium tracking-widest"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Sparkles className="w-6 h-6 text-yellow-400" />
        <span>Memuat Website Budaya Kita...</span>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;

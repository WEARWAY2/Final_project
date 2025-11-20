import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Path to your logo
// Use logo from assets

import logoLight from "../assets/logo_black.png";
import logoDark from "../assets/logo.png";
import { useTheme } from "../context/ThemeContext";

export default function AppleIntroLoader({ children }) {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const { theme } = useTheme();
  const LOGO_SRC = theme === "dark" ? logoDark : logoLight;

  useEffect(() => {
    // Hide intro after 2.2s
    const introTimeout = setTimeout(() => {
      setShowIntro(false);
      setTimeout(() => setShowContent(true), 400);
    }, 2200);
    return () => clearTimeout(introTimeout);
  }, []);

  return (
    <div
      className="fixed inset-0 min-h-screen w-full flex items-center justify-center bg-black z-[9999]"
      style={{ overflow: "hidden" }}
    >
      {/* AnimatePresence for intro */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="flex flex-col items-center justify-center w-full h-full min-h-screen"
            style={{
              minHeight: "100dvh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="relative flex items-center justify-center w-32 h-32"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
              }}
            >
              {/* Creative loader: double circle */}
              <motion.div
                className="absolute left-0 top-0 w-32 h-32 rounded-full border-4 border-gray-700 border-t-white"
                style={{ borderTopColor: theme === "dark" ? "#fff" : "#222" }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
              <motion.div
                className="absolute left-2 top-2 w-28 h-28 rounded-full border-2 border-gray-500 border-b-blue-400"
                style={{
                  borderBottomColor: theme === "dark" ? "#60a5fa" : "#2563eb",
                }}
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
              />
              {/* Logo steady in center, bigger */}
              <img
                src={LOGO_SRC}
                alt="Logo"
                className="w-28 h-28 z-10 object-contain"
                style={{
                  display: "block",
                  maxWidth: "112px",
                  maxHeight: "112px",
                  margin: "0 auto",
                }}
              />
            </div>
            {/* Optional loading bar under logo */}
            <div className="w-24 h-1 mt-8 bg-gray-800 rounded overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content fade in */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

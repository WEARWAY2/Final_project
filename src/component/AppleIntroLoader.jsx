import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import logoLight from "../assets/logo_black.png";
import logoDark from "../assets/logo.png";
import { useTheme } from "../context/ThemeContext";

export default function AppleIntroLoader({ children }) {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();
  const LOGO_SRC = theme === "dark" ? logoDark : logoLight;

  // Initial load effect
  useEffect(() => {
    const introTimeout = setTimeout(() => {
      setShowIntro(false);
      setTimeout(() => setShowContent(true), 600);
    }, 2500);
    return () => clearTimeout(introTimeout);
  }, []);

  // Route change detection
  useEffect(() => {
    if (showContent) {
      setIsRouteChanging(true);
      const timer = setTimeout(() => {
        setIsRouteChanging(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, showContent]);

  // Prevent scrolling when loader is visible
  useEffect(() => {
    if (showIntro || isRouteChanging) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showIntro, isRouteChanging]);

  return (
    <>
      {/* Initial Loader - Shows on app load */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black z-[9999]"
            style={{
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {/* Logo Container */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Logo in Center */}
                <motion.img
                  src={LOGO_SRC}
                  alt="Logo"
                  className="z-10 object-contain"
                  style={{
                    width: "180px",
                    height: "180px",
                    filter: theme === "dark" ? "drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))" : "drop-shadow(0 0 20px rgba(0, 0, 0, 0.5))",
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                />
              </div>

              {/* Premium Loading Text */}
              <motion.p
                style={{
                  marginTop: "40px",
                  fontSize: "2.8rem",
                  color: "#fff",
                  fontWeight: "700",
                  textAlign: "center",
                  letterSpacing: "0.08em",
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Loading...
              </motion.p>

              {/* Animated Progress Dots */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "20px",
                }}
              >
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: "#000000",
                    }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Route Transition Loader */}
      <AnimatePresence>
        {isRouteChanging && showContent && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black z-[9999]"
            style={{
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {/* Compact Loader for Route Changes */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <motion.img
                  src={LOGO_SRC}
                  alt="Logo"
                  className="z-10 object-contain"
                  style={{
                    width: "120px",
                    height: "120px",
                    filter: theme === "dark" ? "drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))" : "drop-shadow(0 0 15px rgba(0, 0, 0, 0.5))",
                  }}
                />
              </div>

              <motion.p
                style={{
                  marginTop: "30px",
                  fontSize: "2.2rem",
                  color: "#fff",
                  fontWeight: "700",
                  textAlign: "center",
                  letterSpacing: "0.08em",
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Loading...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

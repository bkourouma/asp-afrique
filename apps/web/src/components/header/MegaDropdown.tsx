"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SmartLink } from "@/components/ui/smart-link";
import { usePreloadOnHover } from "@/hooks/usePreload";

interface SubMenuItem {
  href: string;
  label: string;
}

interface MegaDropdownProps {
  isOpen: boolean;
  submenu: SubMenuItem[];
  currentPath?: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10, x: -10 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    x: -10,
    transition: {
      duration: 0.2,
    },
  },
};

export const MegaDropdown = ({
  isOpen,
  submenu,
  currentPath,
  onMouseEnter,
  onMouseLeave,
}: MegaDropdownProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 py-3 z-50 overflow-hidden"
          style={{
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          {/* Gradient background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-accent-1/5 opacity-50 pointer-events-none" />
          
          <motion.div variants={containerVariants} className="relative z-10">
            {submenu.map((subItem, index) => {
              const isActive = currentPath === subItem.href;
              const { handleMouseEnter } = usePreloadOnHover(subItem.href);

              return (
                <motion.div
                  key={subItem.href}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  className="px-1"
                >
                  <SmartLink
                    href={subItem.href}
                    onMouseEnter={handleMouseEnter}
                    className={`
                      block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                      relative overflow-hidden group
                      ${
                        isActive
                          ? "bg-accent-1/15 text-accent-1"
                          : "text-gray-700 hover:bg-accent-1/10 hover:text-accent-1"
                      }
                    `}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-accent-1 rounded-r-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover underline effect */}
                    <span className="relative z-10 flex items-center">
                      {subItem.label}
                      {isActive && (
                        <motion.span
                          className="ml-2 w-1.5 h-1.5 rounded-full bg-accent-1"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </span>
                    
                    {/* Hover background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent-1/5 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.2 }}
                    />
                  </SmartLink>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


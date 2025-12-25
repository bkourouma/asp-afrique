"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SmartLink } from "@/components/ui/smart-link";
import { X, ChevronDown } from "lucide-react";
import { usePreloadOnHover } from "@/hooks/usePreload";
import { useState, useCallback } from "react";

interface NavigationItem {
  href: string;
  label: string;
  hasSubmenu?: boolean;
  submenu?: Array<{ href: string; label: string }>;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
  currentPath?: string;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const menuVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
  exit: { opacity: 0, x: 20 },
};

export const MobileMenu = ({
  isOpen,
  onClose,
  navigationItems,
  currentPath,
}: MobileMenuProps) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = useCallback((href: string) => {
    setOpenSubmenu((prev) => (prev === href ? null : href));
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Mobile Menu */}
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl shadow-2xl z-50 overflow-y-auto"
            style={{
              boxShadow: "-4px 0 24px rgba(0, 0, 0, 0.15)",
            }}
          >
            <div className="p-6 h-full flex flex-col">
              {/* Mobile Menu Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200"
              >
                <div className="text-xl font-bold text-accent-1">Menu</div>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Fermer le menu"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </motion.button>
              </motion.div>

              {/* Mobile Navigation */}
              <nav className="flex-1 space-y-2">
                {navigationItems.map((item, index) => {
                  const isActive = currentPath === item.href;
                  const isAboutPage = currentPath?.startsWith(item.href);
                  const isSubmenuOpen = openSubmenu === item.href;
                  const { handleMouseEnter } = usePreloadOnHover(item.href);

                  return (
                    <motion.div
                      key={item.href}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {item.hasSubmenu ? (
                        <div>
                          <motion.div
                            onClick={() => toggleSubmenu(item.href)}
                            onMouseEnter={handleMouseEnter}
                            className={`
                              flex items-center justify-between p-4 rounded-lg group cursor-pointer
                              ${
                                isAboutPage
                                  ? "bg-accent-1/15 text-accent-1 border-l-4 border-accent-1"
                                  : "hover:bg-gray-50 text-gray-700"
                              }
                            `}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="font-medium">{item.label}</span>
                            <motion.div
                              animate={{ rotate: isSubmenuOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-accent-1" />
                            </motion.div>
                          </motion.div>

                          {/* Mobile Submenu */}
                          <AnimatePresence>
                            {isSubmenuOpen && item.submenu && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="ml-4 space-y-1 overflow-hidden"
                              >
                                {item.submenu.map((subItem, subIndex) => {
                                  const isSubActive = currentPath === subItem.href;
                                  const { handleMouseEnter: handleSubMouseEnter } =
                                    usePreloadOnHover(subItem.href);

                                  return (
                                    <motion.div
                                      key={subItem.href}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: subIndex * 0.05 }}
                                    >
                                      <SmartLink
                                        href={subItem.href}
                                        onClick={onClose}
                                        onMouseEnter={handleSubMouseEnter}
                                        className={`
                                          block px-4 py-2 text-sm rounded-lg transition-all
                                          ${
                                            isSubActive
                                              ? "bg-accent-1/15 text-accent-1 font-medium"
                                              : "text-gray-600 hover:bg-gray-50 hover:text-accent-1"
                                          }
                                        `}
                                      >
                                        {subItem.label}
                                      </SmartLink>
                                    </motion.div>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <SmartLink
                          href={item.href}
                          onClick={onClose}
                          onMouseEnter={handleMouseEnter}
                          className={`
                            flex items-center justify-between p-4 rounded-lg group
                            ${
                              isActive
                                ? "bg-accent-1/15 text-accent-1 border-l-4 border-accent-1"
                                : "hover:bg-gray-50 text-gray-700"
                            }
                          `}
                        >
                          <span className="font-medium">{item.label}</span>
                        </SmartLink>
                      )}
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile Menu Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 pt-6 border-t border-gray-200"
              >
                <div className="text-sm text-gray-500 text-center">
                  ASP CONSULTING - Date de création: 2003
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};


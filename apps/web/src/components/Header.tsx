"use client";

import { useState, useCallback, memo, useMemo, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { SmartLink } from "@/components/ui/smart-link";
import { usePreloadPages } from "@/hooks/usePreload";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { DesktopNav } from "./header/DesktopNav";
import { MobileMenu } from "./header/MobileMenu";

interface HeaderProps {
  currentPath?: string;
}

const navigationItems = [
  { href: "/", label: "Accueil" },
  { href: "/formations", label: "Formation" },
  { href: "/consulting", label: "Consulting" },
  {
    href: "/a-propos",
    label: "À propos",
    hasSubmenu: true,
    submenu: [
      {
        href: "/a-propos/mot-du-directeur",
        label: "Mot du Directeur Général",
      },
      { href: "/a-propos/notre-equipe", label: "Notre Équipe" },
      {
        href: "/a-propos/agrements-autorisations",
        label: "Agréments et Autorisations",
      },
    ],
  },
  { href: "/partenaires", label: "Partenaire" },
  { href: "/videos", label: "Vidéos" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

// Burger menu animation variants
const burgerTopVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 7 },
};

const burgerMiddleVariants = {
  closed: { opacity: 1 },
  open: { opacity: 0 },
};

const burgerBottomVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -7 },
};

function HeaderComponent({ currentPath = "/" }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const { scrollY } = useScroll();
  const scrollProgress = useScrollProgress();

  // Calculate header shrink based on scroll
  const headerHeight = useTransform(scrollY, [0, 100], [80, 64]);
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.98)"]
  );

  // Précharger les pages importantes avec gestion d'erreur
  try {
    usePreloadPages();
  } catch (error) {
    console.warn("Erreur dans usePreloadPages:", error);
  }

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleDropdownEnter = useCallback(() => {
    setIsAboutDropdownOpen(true);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    setIsAboutDropdownOpen(false);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-1 via-accent-2 to-accent-1 z-[60] origin-left"
        style={{
          scaleX: scrollProgress,
        }}
      />

      {/* Header */}
      <motion.header
        className="fixed top-0 w-full z-50 border-b border-white/20 shadow-sm performance-instant"
        style={{
          height: headerHeight,
          backgroundColor: headerBackground,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="container mx-auto px-4 h-full">
          <nav className="flex justify-between items-center h-full">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <SmartLink href="/" className="block link-instant">
                <motion.img
                  src="/images/Logo_ASPCI.jpg"
                  alt="Logo ASPCI"
                  className="h-10 w-auto object-contain"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                />
              </SmartLink>
            </motion.div>

            {/* Desktop Navigation */}
            <DesktopNav
              navigationItems={navigationItems}
              currentPath={currentPath}
              isAboutDropdownOpen={isAboutDropdownOpen}
              onDropdownEnter={handleDropdownEnter}
              onDropdownLeave={handleDropdownLeave}
            />

            {/* Mobile Menu Button with Animated Burger */}
            <motion.button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100/50 btn-instant relative"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 4px 12px rgba(255, 107, 53, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                transition: "box-shadow 0.3s ease",
              }}
            >
              <div className="w-6 h-5 flex flex-col justify-between relative">
                <motion.span
                  variants={burgerTopVariants}
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full h-0.5 bg-gray-700 rounded-full origin-center"
                />
                <motion.span
                  variants={burgerMiddleVariants}
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  transition={{ duration: 0.2 }}
                  className="w-full h-0.5 bg-gray-700 rounded-full"
                />
                <motion.span
                  variants={burgerBottomVariants}
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full h-0.5 bg-gray-700 rounded-full origin-center"
                />
              </div>

              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-accent-1/20 blur-xl opacity-0"
                animate={{
                  opacity: isMobileMenuOpen ? 0.3 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        navigationItems={navigationItems}
        currentPath={currentPath}
      />
    </>
  );
}

export const Header = memo(HeaderComponent);

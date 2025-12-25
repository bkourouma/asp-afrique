"use client";

import { motion } from "framer-motion";
import { SmartLink } from "@/components/ui/smart-link";
import { ChevronDown } from "lucide-react";
import { MegaDropdown } from "./MegaDropdown";
import { usePreloadOnHover } from "@/hooks/usePreload";
import { useMemo, memo } from "react";

interface NavigationItem {
  href: string;
  label: string;
  hasSubmenu?: boolean;
  submenu?: Array<{ href: string; label: string }>;
}

interface DesktopNavProps {
  navigationItems: NavigationItem[];
  currentPath?: string;
  isAboutDropdownOpen: boolean;
  onDropdownEnter: () => void;
  onDropdownLeave: () => void;
}

interface NavLinkProps {
  item: NavigationItem;
  isActive: boolean;
}

const NavLink = memo(({ item, isActive }: NavLinkProps) => {
  const { handleMouseEnter } = usePreloadOnHover(item.href);

  return (
    <SmartLink
      href={item.href}
      onMouseEnter={handleMouseEnter}
      className="relative font-medium group link-instant"
    >
      <motion.span
        className={`block ${
          isActive ? "text-accent-1" : "text-gray-700 hover:text-accent-1"
        }`}
        whileHover={{ scale: 1.05 }}
      >
        {item.label}
      </motion.span>

      {/* Animated underline */}
      <motion.span
        className="absolute -bottom-1 left-0 h-0.5 bg-accent-1 origin-left"
        initial={{ scaleX: isActive ? 1 : 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
      />
    </SmartLink>
  );
});

NavLink.displayName = "NavLink";

export const DesktopNav = ({
  navigationItems,
  currentPath,
  isAboutDropdownOpen,
  onDropdownEnter,
  onDropdownLeave,
}: DesktopNavProps) => {
  const isAboutPage = useMemo(
    () => currentPath?.startsWith("/a-propos"),
    [currentPath]
  );

  return (
    <nav className="hidden md:flex space-x-8">
      {navigationItems.map((item) => {
        const isActive = currentPath === item.href;

        return (
          <div key={item.href} className="relative">
            {item.hasSubmenu ? (
              <div
                className="relative"
                onMouseEnter={onDropdownEnter}
                onMouseLeave={onDropdownLeave}
              >
                <SmartLink
                  href={item.href}
                  className="relative font-medium group flex items-center gap-1 link-instant"
                >
                  <motion.span
                    className={`${
                      isAboutPage
                        ? "text-accent-1"
                        : "text-gray-700 hover:text-accent-1"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.label}
                  </motion.span>

                  <motion.div
                    animate={{ rotate: isAboutDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown
                      className={`w-4 h-4 icon-instant ${
                        isAboutDropdownOpen ? "text-accent-1" : ""
                      }`}
                    />
                  </motion.div>

                  {/* Animated underline */}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-accent-1 origin-left"
                    initial={{ scaleX: isAboutPage ? 1 : 0 }}
                    animate={{ scaleX: isAboutPage ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  />
                </SmartLink>

                {/* Mega Dropdown */}
                {item.submenu && (
                  <MegaDropdown
                    isOpen={isAboutDropdownOpen}
                    submenu={item.submenu}
                    currentPath={currentPath}
                    onMouseEnter={onDropdownEnter}
                    onMouseLeave={onDropdownLeave}
                  />
                )}
              </div>
            ) : (
              <NavLink item={item} isActive={isActive} />
            )}
          </div>
        );
      })}
    </nav>
  );
};


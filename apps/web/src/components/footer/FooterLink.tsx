"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

interface FooterLinkProps {
  href: string;
  label: string;
  className?: string;
}

export const FooterLink = ({ href, label, className = "" }: FooterLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <motion.div
      className={className}
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Link
        href={href}
        className={`
          block text-text-secondary hover:text-accent-1 transition-colors duration-300 text-sm leading-relaxed
          relative group flex items-center gap-2
          ${isActive ? "text-accent-1 font-medium" : ""}
        `}
      >
        <span className="relative">
          {label}
          {/* Active underline */}
          {isActive && (
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-1"
              layoutId="footer-active-link"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          {/* Hover underline */}
          {!isActive && (
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-accent-1"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          )}
        </span>

        {/* Arrow icon animated */}
        <motion.div
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          animate={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-4 h-4 text-accent-1" />
        </motion.div>
      </Link>
    </motion.div>
  );
};


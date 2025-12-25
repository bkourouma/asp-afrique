"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Facebook, Linkedin, Youtube, Twitter } from "lucide-react";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/ASPCotedIvoire",
    icon: Facebook,
    color: "bg-blue-500",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/academie-de-la-securite-professionnelle",
    icon: Linkedin,
    color: "bg-blue-700",
    gradient: "from-blue-700 to-blue-800",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@ASP_CI",
    icon: Youtube,
    color: "bg-red-500",
    gradient: "from-red-500 to-red-600",
  },
  {
    name: "Twitter",
    url: "#",
    icon: Twitter,
    color: "bg-sky-500",
    gradient: "from-sky-500 to-sky-600",
  },
];

interface SocialLinksProps {
  className?: string;
}

export const SocialLinks = ({ className = "" }: SocialLinksProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 600);
  };

  return (
    <div className={`flex space-x-4 ${className}`}>
      {socialLinks.map((social, index) => {
        const Icon = social.icon;
        const isHovered = hoveredIndex === index;
        const isClicked = clickedIndex === index;

        return (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative w-12 h-12 bg-gradient-to-br ${social.gradient} text-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleClick(index)}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            title={social.name}
          >
            {/* Ripple effect on click */}
            {isClicked && (
              <motion.div
                className="absolute inset-0 bg-white/30 rounded-full"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            )}

            {/* Tooltip */}
            <motion.div
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 pointer-events-none"
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 5,
              }}
              transition={{ duration: 0.2 }}
            >
              {social.name}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <div className="border-4 border-transparent border-t-gray-900" />
              </div>
            </motion.div>

            {/* Icon with rotation and scale animation */}
            <motion.div
              animate={{
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{
                rotate: { duration: 0.5, ease: "easeInOut" },
                scale: { duration: 0.2 },
              }}
            >
              <Icon className="w-5 h-5 relative z-10" />
            </motion.div>

            {/* Shine effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: isHovered ? "100%" : "-100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </motion.a>
        );
      })}
    </div>
  );
};


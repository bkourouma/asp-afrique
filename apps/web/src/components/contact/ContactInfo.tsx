"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Copy, Check, ExternalLink } from "lucide-react";
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/useToast";

interface ContactInfoItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  action?: "copy" | "call" | "link" | "map";
  href?: string;
}

const contactItems: ContactInfoItem[] = [
  {
    icon: MapPin,
    label: "Adresse",
    value: "Cocody Angré Terminus 81/82 Djibi 2 V.74\n03 BP 987 Abidjan 03",
    action: "map",
    href: "https://www.google.com/maps/search/?api=1&query=Cocody+Angré+Terminus+81+82+Djibi+2+V.74+Abidjan",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+225 27 31 96 32 67",
    action: "call",
    href: "tel:+2252731963267",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+225 07 07 01 30 03",
    action: "call",
    href: "tel:+2250707013003",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+225 07 59 81 48 64",
    action: "call",
    href: "tel:+2250759814864",
  },
  {
    icon: Mail,
    label: "Email",
    value: "bahjulgues@gmail.com",
    action: "copy",
  },
];

export const ContactInfo = () => {
  const { success } = useToast();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleAction = useCallback(
    async (item: ContactInfoItem, index: number) => {
      if (item.action === "copy") {
        try {
          await navigator.clipboard.writeText(item.value);
          setCopiedIndex(index);
          success(`${item.label} copié dans le presse-papiers !`);
          setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
          console.error("Failed to copy:", err);
        }
      } else if (item.action === "map" || item.action === "link") {
        if (item.href) {
          window.open(item.href, "_blank");
        }
      }
      // call action handled by href in link
    },
    [success]
  );

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20"
      >
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-accent-1 to-[#E55A2B] rounded-lg flex items-center justify-center">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-primary">Informations de contact</h3>
        </motion.div>

        <div className="space-y-4">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            const isCopied = copiedIndex === index;
            const isClickable = item.action === "copy" || item.action === "map";

            return (
              <motion.div
                key={`${item.label}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`
                  group flex items-start space-x-4 p-4 rounded-xl transition-all duration-300
                  ${
                    isClickable
                      ? "cursor-pointer hover:bg-accent-1/10 hover:shadow-lg"
                      : "hover:bg-gray-50"
                  }
                `}
                onClick={() => isClickable && handleAction(item, index)}
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="flex-shrink-0 mt-0.5"
                  animate={{
                    scale: isCopied ? [1, 1.2, 1] : 1,
                    rotate: isCopied ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isCopied
                        ? "text-accent-1"
                        : "text-accent-1 group-hover:text-accent-2"
                    }`}
                  />
                </motion.div>

                <div className="flex-1">
                  <p className="font-semibold text-primary text-sm mb-1">
                    {item.label}
                  </p>
                  {item.action === "call" && item.href ? (
                    <a
                      href={item.href}
                      className="text-text-secondary hover:text-accent-1 transition-colors block"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-text-secondary text-sm whitespace-pre-line">
                      {item.value}
                    </p>
                  )}
                </div>

                {/* Action button */}
                {isClickable && (
                  <motion.button
                    className="ml-3 p-2 rounded-lg bg-gray-100/50 hover:bg-accent-1/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction(item, index);
                    }}
                    aria-label={
                      item.action === "copy"
                        ? `Copier ${item.label}`
                        : "Ouvrir dans Google Maps"
                    }
                  >
                    {isCopied ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <Check className="w-4 h-4 text-accent-1" />
                      </motion.div>
                    ) : item.action === "map" ? (
                      <ExternalLink className="w-4 h-4 text-gray-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600" />
                    )}
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

    </div>
  );
};


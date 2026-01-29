"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Copy, Check } from "lucide-react";
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/useToast";

interface ContactItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  copyable?: boolean;
}

const contactItems: ContactItem[] = [
  {
    icon: MapPin,
    label: "Adresse",
    value: "Cocody Angré, Abidjan, Côte d'Ivoire",
    copyable: true,
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+225 07 59 81 48 64",
    copyable: true,
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+225 07 08 97 78 23",
    copyable: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: "bahjulgues@gmail.com",
    copyable: true,
  },
];

interface ContactSectionProps {
  className?: string;
}

export const ContactSection = ({ className = "" }: ContactSectionProps) => {
  const { success } = useToast();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = useCallback(
    async (value: string, index: number) => {
      try {
        await navigator.clipboard.writeText(value);
        setCopiedIndex(index);
        success(`${value} copié dans le presse-papiers !`);
        setTimeout(() => setCopiedIndex(null), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    },
    [success]
  );

  return (
    <div className={className}>
      <motion.h4
        className="text-lg font-semibold text-primary mb-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        Contact
      </motion.h4>
      <div className="space-y-4">
        {contactItems.map((item, index) => {
          const Icon = item.icon;
          const isCopied = copiedIndex === index;

          return (
            <motion.div
              key={index}
              className="flex items-start space-x-3 group cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ x: 4 }}
              onClick={() => item.copyable && handleCopy(item.value, index)}
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

              <div className="flex-1 flex items-center justify-between group/item">
                <p className="text-text-secondary text-sm leading-relaxed group-hover:text-primary transition-colors duration-200">
                  {item.value}
                </p>

                {item.copyable && (
                  <motion.button
                    className="ml-3 p-1.5 rounded-lg bg-gray-100/50 hover:bg-accent-1/10 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(item.value, index);
                    }}
                    aria-label={`Copier ${item.label}`}
                  >
                    {isCopied ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <Check className="w-4 h-4 text-accent-1" />
                      </motion.div>
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600 group-hover/item:text-accent-1 transition-colors" />
                    )}
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};


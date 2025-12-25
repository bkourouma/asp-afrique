"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { SmartLink } from "@/components/ui/smart-link";
import { FooterLink } from "./footer/FooterLink";
import { ContactSection } from "./footer/ContactSection";
import { SocialLinks } from "./footer/SocialLinks";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/hooks/useToast";

interface FooterProps {
  formations?: Array<{
    id: string;
    title: string;
    slug: string;
  }>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export function Footer({ formations = [] }: FooterProps) {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });
  const { toasts, removeToast } = useToast();

  const defaultFormations = [
    {
      id: "as",
      title: "Agent de Sécurité Professionnel (AS)",
      slug: "agent-securite-professionnel",
    },
    {
      id: "asp",
      title: "Agent de Sécurité Portuaire (ASP)",
      slug: "agent-securite-portuaire",
    },
    {
      id: "ass",
      title: "Agent d'Intervention (ASS)",
      slug: "agent-intervention",
    },
    {
      id: "apr",
      title: "Agent de Protection Rapprochée (APR)",
      slug: "agent-protection-rapprochee",
    },
  ];

  const displayFormations =
    formations.length > 0 ? formations.slice(0, 4) : defaultFormations;

  const servicesLinks = [
    { href: "/consulting", label: "Consulting" },
    { href: "/formations", label: "Formations" },
    { href: "/partenaires", label: "Partenaires" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <footer
        ref={footerRef}
        className="relative bg-gradient-to-b from-white via-gray-50/30 to-white border-t border-gray-200/50 overflow-hidden"
      >
        {/* Background geometric pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(30deg, #0A2540 12%, transparent 12.5%, transparent 87%, #0A2540 87.5%, #0A2540),
                                linear-gradient(150deg, #0A2540 12%, transparent 12.5%, transparent 87%, #0A2540 87.5%, #0A2540),
                                linear-gradient(30deg, #0A2540 12%, transparent 12.5%, transparent 87%, #0A2540 87.5%, #0A2540),
                                linear-gradient(150deg, #0A2540 12%, transparent 12.5%, transparent 87%, #0A2540 87.5%, #0A2540)`,
              backgroundSize: "80px 140px",
              backgroundPosition: "0 0, 0 0, 40px 70px, 40px 70px",
            }}
          />
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12"
          >
            {/* Company Info */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-primary mb-4">
                  ASP CONSULTING
                </h3>
                <p className="text-text-secondary leading-relaxed mb-6 text-sm">
                  Date de création: 2003<br />
                  Expertises ivoiro-canadiennes
                </p>

                {/* Social Media Icons */}
                <SocialLinks />
              </motion.div>
            </motion.div>

            {/* Formations */}
            <motion.div variants={itemVariants}>
              <motion.h4
                className="text-lg font-semibold text-primary mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                Formations
              </motion.h4>
              <div className="space-y-4">
                {displayFormations.map((formation, index) => (
                  <motion.div
                    key={formation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -20 }
                    }
                    transition={{
                      delay: 0.3 + index * 0.05,
                      duration: 0.4,
                    }}
                  >
                    <FooterLink
                      href={`/formation/${formation.slug}`}
                      label={formation.title}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants}>
              <motion.h4
                className="text-lg font-semibold text-primary mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                Services
              </motion.h4>
              <div className="space-y-4">
                {servicesLinks.map((service, index) => (
                  <motion.div
                    key={service.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -20 }
                    }
                    transition={{
                      delay: 0.5 + index * 0.05,
                      duration: 0.4,
                    }}
                  >
                    <FooterLink href={service.href} label={service.label} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <ContactSection />
          </motion.div>

          {/* Animated Divider */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <motion.div
              className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-accent-1 to-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 100%",
              }}
            />
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="text-text-secondary text-sm text-center md:text-left">
              &copy; 2025 ASP CONSULTING - Tous droits réservés. Date de création: 2003
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <SmartLink
                href="/privacy"
                className="text-text-secondary hover:text-accent-1 transition-colors text-sm"
              >
                Politique de confidentialité
              </SmartLink>
              <SmartLink
                href="/terms"
                className="text-text-secondary hover:text-accent-1 transition-colors text-sm"
              >
                Conditions d'utilisation
              </SmartLink>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Toast Container */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          isVisible={true}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );
}

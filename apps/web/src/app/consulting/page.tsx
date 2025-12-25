"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiGet } from "@/lib/api-client";
import { Briefcase, Users, Shield, Target, TrendingUp, CheckCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface ConsultingService {
  id: string;
  name: string;
  slug: string;
  description: string;
  entity: string;
  targetSectors?: string | null;
  ctaText?: string | null;
  isActive: boolean;
}

export default function ConsultingPage() {
  const [consultingServices, setConsultingServices] = useState<ConsultingService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await apiGet<ConsultingService[]>('/api/v1/consulting');
        setConsultingServices(data);
      } catch (error) {
        console.error('Error fetching consulting services:', error);
        // Fallback to static data if API fails
        setConsultingServices([
          {
            id: "evaluation-risques-gamr",
            name: "Évaluation et analyse des risques (GAMR)",
            description: "Audit complet de vos installations et processus pour identifier les vulnérabilités et établir un plan d'amélioration de la sécurité.",
            entity: "CABINET FORMATION ET GESTION EN SECURITE",
            targetSectors: "Entreprises, Industries, Commerce",
            ctaText: "Demander un audit GAMR",
            slug: "evaluation-risques-gamr",
            isActive: true
          },
          {
            id: "plans-securite",
            name: "Élaboration de plans de sécurité",
            description: "Conception et mise en place de stratégies de sécurité adaptées à votre secteur d'activité et à vos besoins spécifiques.",
            entity: "CABINET FORMATION ET GESTION EN SECURITE",
            targetSectors: "Tous secteurs",
            ctaText: "Consulter pour un plan de sécurité",
            slug: "plans-securite",
            isActive: true
          },
          {
            id: "gestion-crise",
            name: "Gestion de crise",
            description: "Formation et accompagnement pour la mise en place de cellules de crise et de plans d'urgence opérationnels.",
            entity: "CABINET FORMATION ET GESTION EN SECURITE",
            targetSectors: "Entreprises, Organisations",
            ctaText: "Préparer votre gestion de crise",
            slug: "gestion-crise",
            isActive: true
          },
          {
            id: "formation-interne",
            name: "Formation interne des équipes",
            description: "Programmes de formation sur mesure pour vos équipes de sécurité et vos collaborateurs.",
            entity: "CABINET FORMATION ET GESTION EN SECURITE",
            targetSectors: "Entreprises privées, Organisations",
            ctaText: "Former vos équipes",
            slug: "formation-interne",
            isActive: true
          },
          {
            id: "certification-isps",
            name: "Certification ISPS Code",
            description: "Accompagnement pour l'obtention et le maintien de la certification ISPS Code pour les installations portuaires.",
            entity: "EXPERTISE EN SURETE MARITIME (CODE ISPS)",
            targetSectors: "Ports, Terminaux maritimes",
            ctaText: "Obtenir la certification ISPS",
            slug: "certification-isps",
            isActive: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0b1a39] mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header currentPath="/consulting" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-[#1A3F5F] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <Briefcase className="w-12 h-12 mx-auto text-accent-1 mb-4" />
            </motion.div>

            <motion.h1
              className="text-5xl font-bold mb-4 text-accent-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Nos Services de Conseil
            </motion.h1>

            <motion.p
              className="text-xl text-center text-gray-200 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Expertise professionnelle en sécurité d'entreprise. Accompagnement personnalisé
              pour renforcer votre sécurité et assurer la conformité réglementaire.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-white/50 to-accent-1/5 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#FF6B35]/20 rounded-full"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 23) % 100}%`,
                animationDelay: `${(i * 0.3) % 6}s`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
              Nos Services de Conseil
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Des solutions personnalisées pour renforcer votre sécurité d'entreprise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {consultingServices.filter(service => service.isActive).map((service, index) => (
              <motion.div
                key={service.id}
                id={service.slug}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 group border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary mb-2">{service.name}</h3>
                    {service.entity && (
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#0A2540]/10 to-[#1A3F5F]/10 text-[#0A2540] rounded-lg text-xs font-medium border border-[#0A2540]/20">
                          {service.entity}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>

                <div className="mb-6">
                  <span className="inline-block bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white text-sm px-4 py-2 rounded-full font-medium">
                    {service.targetSectors}
                  </span>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-[#1A3F5F] transition-colors font-medium group-hover:shadow-lg"
                  >
                    {service.ctaText}
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-[#0A2540] to-[#1A3F5F] text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${(i * 23) % 100}%`,
                top: `${(i * 17) % 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.8, 0.1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Target className="w-16 h-16 mx-auto text-[#FF6B35] mb-6" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#FF6B35' }}>
              Besoin d'un Audit de Sécurité ?
            </h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-200">
              Contactez nos experts pour une évaluation gratuite de vos besoins en sécurité.
              Nous vous proposons des solutions sur mesure adaptées à votre secteur d'activité.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#FF6B35] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#E55A2B] transition-colors text-lg shadow-2xl"
              >
                <CheckCircle className="w-5 h-5" />
                Demander un Audit Gratuit
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
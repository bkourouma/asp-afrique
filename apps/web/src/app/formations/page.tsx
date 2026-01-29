"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiGet } from "@/lib/api-client";
import { Shield, Anchor, Siren, UserCheck, Search, Network } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface Formation {
  id: string;
  title: string;
  slug: string;
  duration: string;
  description: string;
  entity: string;
  objectives?: string | null;
  syllabus?: string | null;
  imageUrl?: string | null;
  isActive: boolean;
}

export default function FormationsPage() {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);

  // Icon and color mapping for formations
  const formationIcons = {
    as: { icon: Shield, color: '#FF6B35', bgColor: 'rgba(255, 107, 53, 0.1)' },
    asp: { icon: Anchor, color: '#00D9FF', bgColor: 'rgba(0, 217, 255, 0.1)' },
    ass: { icon: Siren, color: '#FFD23F', bgColor: 'rgba(255, 210, 63, 0.1)' },
    apr: { icon: UserCheck, color: '#9D4EDD', bgColor: 'rgba(157, 78, 221, 0.1)' },
    ai: { icon: Search, color: '#06FFA5', bgColor: 'rgba(6, 255, 165, 0.1)' },
    is: { icon: Network, color: '#FF006E', bgColor: 'rgba(255, 0, 110, 0.1)' },
  };
  
  // Récupérer l'URL de l'image depuis l'API uniquement
  const getImageUrl = (formation: Formation): string | null => {
    // Utiliser uniquement l'imageUrl de l'API
    return formation.imageUrl || null;
  };

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const data = await apiGet<Formation[]>('/api/v1/formations', { requireAuth: false });
        setFormations(data);
      } catch (error) {
        console.error('Error fetching formations:', error);
        // Fallback to static data if API fails
        setFormations([
          {
            id: "as",
            title: "Agent de Sécurité Professionnel (AS)",
            duration: "360h",
            description: "Formation complète aux métiers de la sécurité privée avec focus sur la prévention, la surveillance et l'intervention.",
            slug: "agent-de-securite-professionnel-as",
            entity: "CABINET FORMATION ET GESTION EN SECURITE",
            objectives: "Maîtriser les techniques de sécurité, connaître la législation, développer les compétences relationnelles.",
            syllabus: "Module 1: Législation et réglementations\nModule 2: Techniques de surveillance\nModule 3: Gestion des conflits\nModule 4: Premiers secours\nModule 5: Sécurité incendie",
            isActive: true
          },
          {
            id: "asp",
            title: "Agent de Sécurité Portuaire (ASP)",
            duration: "360h",
            description: "Spécialisation en sécurité portuaire et maritime selon les normes internationales ISPS Code.",
            slug: "agent-securite-portuaire",
            entity: "EXPERTISE EN SURETE MARITIME (CODE ISPS)",
            objectives: "Appliquer les normes ISPS, sécuriser les zones portuaires, gérer les accès sensibles.",
            syllabus: "Module 1: Réglementation portuaire\nModule 2: ISPS Code\nModule 3: Contrôle d'accès\nModule 4: Gestion des risques maritimes\nModule 5: Coordination avec autorités",
            isActive: true
          },
          {
            id: "ass",
            title: "Agent d'Intervention (ASS)",
            duration: "360h",
            description: "Formation spécialisée dans les opérations tactiques, les interventions d'urgence et les patrouilles de sécurité.",
            slug: "agent-intervention",
            entity: "CABINET FORMATION ET GESTION EN SECURITE",
            objectives: "Maîtriser les techniques d'intervention, gérer les situations de crise, assurer la protection des biens et personnes.",
            syllabus: "Module 1: Techniques d'intervention\nModule 2: Armement et désarmement\nModule 3: Gestion de crise\nModule 4: Protection rapprochée\nModule 5: Protocoles d'urgence",
            isActive: true
          },
          {
            id: "apr",
            title: "Agent de Protection Rapprochée (APR)",
            duration: "360h",
            description: "Formation spécialisée dans la protection des personnalités et la sécurité rapprochée des VIP.",
            slug: "agent-protection-rapprochee",
            entity: "CABINET FORMATION ET GESTION EN SECURITE",
            objectives: "Assurer la protection rapprochée, analyser les risques, planifier les déplacements sécurisés.",
            syllabus: "Module 1: Analyse de risques\nModule 2: Protection rapprochée\nModule 3: Conduite sécurisée\nModule 4: Gestion des menaces\nModule 5: Protocoles VIP",
            isActive: true
          },
          {
            id: "ai",
            title: "Agent d'Investigation (AI)",
            duration: "360h",
            description: "Formation en investigation privée, renseignement et surveillance selon les normes légales.",
            slug: "agent-investigation",
            entity: "CABINET FORMATION ET GESTION EN SECURITE",
            objectives: "Mener des investigations légales, collecter des informations, rédiger des rapports d'enquête.",
            syllabus: "Module 1: Méthodologie d'investigation\nModule 2: Techniques de surveillance\nModule 3: Droit de l'investigation\nModule 4: Rédaction de rapports\nModule 5: Outils informatiques",
            isActive: true
          },
          {
            id: "is",
            title: "Ingénierie Sécuritaire (IS)",
            duration: "360h",
            description: "Formation supérieure en stratégie de sécurité d'entreprise et gestion des risques corporatifs.",
            slug: "ingenierie-securitaire",
            entity: "CABINET FORMATION ET GESTION EN SECURITE",
            objectives: "Développer des stratégies de sécurité, évaluer les risques, mettre en place des plans de continuité.",
            syllabus: "Module 1: Management de la sécurité\nModule 2: Analyse des risques\nModule 3: Systèmes de sécurité\nModule 4: Gestion de crise\nModule 5: Audit et conformité",
            isActive: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFormations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des formations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header currentPath="/formations" />

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
              <Shield className="w-12 h-12 mx-auto text-white mb-4" />
            </motion.div>

            <motion.h1
              className="text-5xl font-bold mb-4 text-accent-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Nos Programmes de Formation
            </motion.h1>

            <motion.p
              className="text-xl text-center text-gray-200 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Découvrez nos formations certifiées en sécurité professionnelle,
              conçues pour répondre aux standards internationaux et aux besoins du marché ivoirien.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Formations Grid */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-white/50 to-accent-1/5 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-accent-1/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-1/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-1/5 rounded-full blur-3xl"></div>

          {Array.from({ length: 20 }, (_, i) => {
            const durations = [4.2, 4.5, 4.8, 4.1, 4.6, 4.3, 4.7, 4.4, 4.9, 4.0];
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-accent-1/20 rounded-full"
                style={{
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 23) % 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: durations[i % durations.length],
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            );
          })}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-6"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] p-4 rounded-2xl shadow-xl">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
              Nos Formations Certifiées
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Des programmes d'excellence pour votre carrière professionnelle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formations.map((formation, index) => {
              const iconData = formationIcons[formation.id as keyof typeof formationIcons];
              const IconComponent = iconData?.icon || Shield;

              return (
                <motion.div
                  key={formation.id}
                  className="perspective-1000 group"
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -12,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/30 hover:border-[#FF6B35]/30 relative overflow-hidden transform-gpu h-full flex flex-col">
                    {/* First row: Image on left, Title + Duration on right */}
                    <div className="flex gap-4 mb-4">
                      {/* Image on the left */}
                      <div className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
                        {getImageUrl(formation) ? (
                          <img 
                            src={getImageUrl(formation)!}
                            alt={formation.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              // Show fallback icon
                              const parent = target.parentElement;
                              if (parent && !parent.querySelector('.fallback-icon')) {
                                const fallback = document.createElement('div');
                                fallback.className = 'w-full h-full flex items-center justify-center bg-gray-200 fallback-icon';
                                fallback.innerHTML = `<svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`;
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      {/* Title, Entity and Duration on the right */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-[#FF6B35] transition-colors">
                            {formation.title}
                          </h3>
                          {formation.entity && (
                            <div className="mb-2">
                              <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#0A2540]/10 to-[#1A3F5F]/10 text-[#0A2540] rounded-lg text-xs font-medium border border-[#0A2540]/20">
                                {formation.entity}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-end">
                          <div className="px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white rounded-full text-sm font-medium shadow-lg">
                            {formation.duration}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Second row: Description and "En savoir plus" */}
                    <div className="flex-1 flex flex-col justify-between">
                      <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                        {formation.description}
                      </p>
                      
                      <motion.div 
                        whileHover={{ x: 5 }} 
                        whileTap={{ scale: 0.95 }}
                        className="relative"
                      >
                        <Link
                          href={`/formation/${formation.slug}`}
                          className="inline-flex items-center gap-2 text-primary font-semibold hover:text-[#FF6B35] transition-colors group-hover:gap-3 duration-300 relative"
                        >
                          En savoir plus
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-[#FF6B35]"
                          >
                            →
                          </motion.span>
                        </Link>
                        {/* Underline effect */}
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] group-hover:w-full transition-all duration-300"></div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Additional CTA Section */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-[#0A2540] to-[#1A3F5F] rounded-3xl p-12 text-white relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute inset-0">
                <div className="absolute top-5 right-5 w-20 h-20 bg-[#FF6B35]/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-5 left-5 w-32 h-32 bg-[#E55A2B]/20 rounded-full blur-2xl"></div>
              </div>
              
              <div className="relative z-10">
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Shield className="w-16 h-16 mx-auto text-[#FF6B35] mb-4" />
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Prêt à commencer votre formation ?
                </h3>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                  Rejoignez des centaines de professionnels qui ont choisi ASP CONSULTING pour leur formation en sécurité.
                </p>
                
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      Nous contacter
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/partenaires"
                      className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border border-white/30 hover:bg-white/20 transition-all duration-300"
                    >
                      Nos partenaires
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
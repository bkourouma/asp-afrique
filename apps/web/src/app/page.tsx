"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Award, Users, Clock, ChevronRight, Star, CheckCircle, BookOpen, Target, Eye, GraduationCap, Ship, FileText, Flame, HardHat, Database } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const updateScrollY = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", updateScrollY);
    return () => window.removeEventListener("scroll", updateScrollY);
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Mapping des images de fond pour chaque formation
  const getImageUrl = (id: string): string => {
    const imageMap: Record<string, string> = {
      "as": "AgentSecuriteProfessionnel.jpg",
      "asp": "AgentSecuritePortuaire.jpg",
      "ass": "Agentdintervention.jpg",
      "apr": "AgentdeSecuriteRapprochée.jpg",
      "ai": "Agentdinvestigation.jpg",
      "is": "Administrateurdesûreté.jpg"
    };
    const filename = imageMap[id];
    if (!filename) {
      return '';
    }
    return `/images/${filename}`;
  };
  
  const formations = [
    {
      id: "as",
      title: "Agent de Sécurité Professionnel (AS)",
      duration: "360h",
      description: "Formation complète aux métiers de la sécurité privée avec focus sur la prévention, la surveillance et l'intervention.",
      slug: "agent-securite-professionnel",
      icon: Shield,
      color: "#FF6B35"
    },
    {
      id: "asp",
      title: "Agent de Sécurité Portuaire (ASP)",
      duration: "360h",
      description: "Spécialisation en sécurité portuaire et maritime selon les normes internationales ISPS Code.",
      slug: "agent-securite-portuaire",
      icon: Target,
      color: "#00D9FF"
    },
    {
      id: "ass",
      title: "Agent d'Intervention (ASS)",
      duration: "360h",
      description: "Formation spécialisée dans les opérations tactiques, les interventions d'urgence et les patrouilles de sécurité.",
      slug: "agent-intervention",
      icon: Eye,
      color: "#FFD23F"
    },
    {
      id: "apr",
      title: "Agent de Protection Rapprochée (APR)",
      duration: "360h",
      description: "Formation spécialisée dans la protection des personnalités et la sécurité rapprochée des VIP.",
      slug: "agent-protection-rapprochee",
      icon: Users,
      color: "#9D4EDD"
    },
    {
      id: "ai",
      title: "Agent d'Investigation (AI)",
      duration: "360h",
      description: "Formation en investigation privée, renseignement et surveillance selon les normes légales.",
      slug: "agent-investigation",
      icon: BookOpen,
      color: "#06FFA5"
    },
    {
      id: "is",
      title: "Ingénierie Sécuritaire (IS)",
      duration: "360h",
      description: "Formation supérieure en stratégie de sécurité d'entreprise et gestion des risques corporatifs.",
      slug: "ingenierie-securitaire",
      icon: Award,
      color: "#FF006E"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full">
      {/* Scroll Progress Bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header */}
      <Header currentPath="/" />

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/Section_Hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full particle"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 23) % 100}%`,
                animationDelay: `${(i * 0.3) % 6}s`,
              }}
            />
          ))}
        </div>

        <motion.div
          className="container mx-auto px-4 text-center relative z-10 pt-8 sm:pt-12 md:pt-16 lg:pt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-accent-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            ASP CONSULTING
            <motion.span
              className="block text-accent-1 text-2xl md:text-3xl lg:text-4xl font-normal mt-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Date de création: 2003
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl lg:text-xl mb-8 max-w-2xl mx-auto text-white leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Expertises ivoiro-canadiennes
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/formations"
                className="btn-primary px-8 py-4 rounded-full font-semibold text-white shadow-lg inline-flex items-center gap-2 group"
              >
                Découvrir nos formations
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full font-semibold text-white border-2 border-white/30 hover:border-white/60 transition-colors inline-block glass"
              >
                Nous contacter
              </Link>
            </motion.div>
          </motion.div>

          {/* Les 3 Entités d'ASP CONSULTING */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="w-full max-w-5xl mx-auto mt-12"
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center">
              {/* Entité 1: CABINET FORMATION ET GESTION EN SECURITE */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="text-lg md:text-xl lg:text-2xl font-bold text-white text-center"
              >
                CABINET FORMATION ET GESTION EN SECURITE
              </motion.h3>

              {/* Séparateur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="hidden md:block w-px h-12 bg-white/30"
              />

              {/* Entité 2: EXPERTISE EN SURETE MARITIME */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="text-lg md:text-xl lg:text-2xl font-bold text-white text-center"
              >
                EXPERTISE EN SURETE MARITIME
              </motion.h3>

              {/* Séparateur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7, duration: 0.6 }}
                className="hidden md:block w-px h-12 bg-white/30"
              />

              {/* Entité 3: ECOLE DE POLICE MUNICIPALE */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                className="text-lg md:text-xl lg:text-2xl font-bold text-white text-center"
              >
                ECOLE DE POLICE MUNICIPALE
              </motion.h3>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>


      {/* Statistics Section - NEW */}
      <section className="py-20 bg-gradient-to-r from-primary via-[#1A3F5F] to-primary relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }, (_, i) => {
            // Valeurs fixes pour éviter l'erreur d'hydratation
            const positions = [
              { left: 5, top: 10 }, { left: 15, top: 25 }, { left: 25, top: 40 },
              { left: 35, top: 55 }, { left: 45, top: 70 }, { left: 55, top: 85 },
              { left: 65, top: 15 }, { left: 75, top: 30 }, { left: 85, top: 45 },
              { left: 95, top: 60 }, { left: 10, top: 75 }, { left: 20, top: 90 },
              { left: 30, top: 20 }, { left: 40, top: 35 }, { left: 50, top: 50 },
              { left: 60, top: 65 }, { left: 70, top: 80 }, { left: 80, top: 95 },
              { left: 90, top: 22 }, { left: 12, top: 37 }, { left: 22, top: 52 },
              { left: 32, top: 67 }, { left: 42, top: 82 }, { left: 52, top: 12 },
              { left: 62, top: 27 }, { left: 72, top: 42 }, { left: 82, top: 57 },
              { left: 92, top: 72 }, { left: 17, top: 87 }, { left: 27, top: 17 }
            ];
            const durations = [3.5, 4, 4.5, 3.8, 4.2, 3.6, 4.3, 3.9, 4.1, 3.7];
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${positions[i].left}%`,
                  top: `${positions[i].top}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1],
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-accent-1">
              + de 30 Ans d'Excellence
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Des chiffres qui témoignent de notre engagement envers l'excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: 20000, suffix: "+", label: "Étudiants formés", icon: Users },
              { number: 30, suffix: "+", label: "Ans d'expertise", icon: Award },
              { number: 98, suffix: "%", label: "Taux de réussite", icon: CheckCircle },
              { number: 50, suffix: "+", label: "Partenaires", icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-accent-1/50 transition-all duration-300 hover:scale-105">
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-accent-1 to-[#E55A2B] rounded-2xl flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Animated Number */}
                  <motion.div
                    className="text-5xl font-bold mb-2 text-accent-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      {stat.number}{stat.suffix}
                    </motion.span>
                  </motion.div>

                  {/* Label */}
                  <div className="text-white text-lg font-medium">
                    {stat.label}
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/0 to-[#E55A2B]/0 group-hover:from-[#FF6B35]/10 group-hover:to-[#E55A2B]/10 rounded-2xl transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Domaines d'intervention Section */}
      <section className="py-20 bg-gradient-to-br from-white via-primary/5 to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
              Nos Domaines d'Intervention
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              ASP CONSULTING intervient dans une large gamme de domaines de la sécurité professionnelle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: GraduationCap, 
                title: "Formation aux métiers de la sécurité",
                color: "from-[#FF6B35] to-[#E55A2B]"
              },
              { 
                icon: Shield, 
                title: "Formation Police Municipale",
                color: "from-[#0A2540] to-[#1A3F5F]"
              },
              { 
                icon: Ship, 
                title: "Gestion en sécurité et sûreté maritime",
                color: "from-[#00D9FF] to-[#0099CC]"
              },
              { 
                icon: FileText, 
                title: "Audit - Conseil et Etude en sécurité et en sûreté",
                color: "from-[#9D4EDD] to-[#7B2CBF]"
              },
              { 
                icon: Target, 
                title: "Ingénierie en sécurité professionnelle",
                color: "from-[#FFD23F] to-[#FFC107]"
              },
              { 
                icon: Flame, 
                title: "Sécurité Incendie et Secourisme",
                color: "from-[#FF006E] to-[#CC0059]"
              },
              { 
                icon: HardHat, 
                title: "Sécurité minière, Risques industriels",
                color: "from-[#06FFA5] to-[#00CC84]"
              },
              { 
                icon: Database, 
                title: "Protection des données à caractère personnel",
                color: "from-[#FF6B35] to-[#E55A2B]"
              },
            ].map((domain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 h-full border border-gray-200 hover:border-accent-1/50 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${domain.color} opacity-10 rounded-bl-full`}></div>
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${domain.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <domain.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent-1 transition-colors">
                      {domain.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Formations Section - COMMENTED OUT */}
      {false && (
      <section className="py-20 bg-gradient-to-br from-primary/5 via-white/50 to-accent-1/5 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-accent-1/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-2/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-3/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
              Nos Programmes de Formation
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Découvrez nos formations certifiées en sécurité professionnelle,
              conçues pour répondre aux standards internationaux et aux besoins du marché ivoirien.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formations.map((formation, index) => (
              <motion.div
                key={formation.id}
                className="card-hover group perspective-1000"
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
                <div className="bg-white rounded-2xl p-6 h-full border border-glass-border hover:border-accent-2/30 transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden transform-gpu flex flex-col">
                  <div className="flex gap-4 mb-4">
                    <div className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
                      <img 
                        src={getImageUrl(formation.id) || '/images/placeholder.jpg'}
                        alt={formation.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('.fallback-icon')) {
                            const fallback = document.createElement('div');
                            fallback.className = 'w-full h-full flex items-center justify-center bg-gray-200 fallback-icon';
                            fallback.innerHTML = `<svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`;
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-2">
                          {formation.title}
                        </h3>
                      </div>
                      <div className="flex items-center justify-end">
                        <div className="px-3 py-1 bg-accent-3/20 text-accent-3 rounded-full text-sm font-medium border border-accent-3/30">
                          {formation.duration}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                      {formation.description}
                    </p>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href={`/formation/${formation.slug}`}
                        className="inline-flex items-center gap-2 text-accent-1 font-semibold hover:text-accent-2 transition-colors group/link"
                      >
                        En savoir plus
                        <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Ils nous font confiance */}
      <section className="py-20 bg-gradient-to-r from-white/40 to-primary/5 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
              Ils nous font confiance
            </h2>
          </motion.div>

          {/* Carrousel de logos défilant */}
          <div className="relative">
            {/* Masque de gradient pour l'effet de fondu */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white/40 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white/40 to-transparent z-10 pointer-events-none"></div>

            {/* Conteneur du carrousel */}
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-8"
                animate={{
                  x: [0, -5152], // 23 partenaires * 224px (192px w-48 + 32px gap-8)
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 60, // Durée pour un cycle complet (ajustable)
                    ease: "linear",
                  },
                }}
              >
                {/* Liste complète des partenaires */}
                {[
                  { name: "AZITO ENERGIE", image: "/images/AZITO ENERGIE.png" },
                  { name: "CARENA", image: "/images/carena_logo.jpg" },
                  { name: "BCEAO", image: "/images/BCEAO-logo.png" },
                  { name: "BOLLORE", image: "/images/Logo_Bolloré.png" },
                  { name: "FIDRA", image: "/images/FIDRA.jpg" },
                  { name: "FRATERNITE MATIN", image: "/images/Logo_Fraternité_Matin.png" },
                  { name: "G4S", image: "/images/g4s-logo.png" },
                  { name: "LAVEGARDE", image: "/images/lavegarde_group_logo.jpeg" },
                  { name: "TONGON", image: "/images/logo_TONGON.jpeg" },
                  { name: "NSIA ASSURANCE", image: "/images/Nsia-logo.png" },
                  { name: "ONUCI", image: "/images/un-logo.png" },
                  { name: "AGL", image: "/images/Africa_Global_Logistics_logo.png" },
                  { name: "PETROCI", image: "/images/logo_Petroci.png" },
                  { name: "UVICOCI", image: "/images/logo_UVICOCI.png" },
                  { name: "SICOGI", image: "/images/SICOGI.png" },
                  { name: "SOCIMAT", image: "/images/socimat_logo.png" },
                  { name: "SOGB", image: "/images/SOGB_logo.png" },
                  { name: "SONOCO", image: "/images/sonoco-logo.png" },
                  { name: "UNACOOPEC-CI", image: "/images/COOPEC.png" },
                  { name: "LGL", image: "/images/LGL-logo.png" },
                  { name: "SITARAIL", image: "/images/SITARAIL.png" },
                  { name: "BURKINA FASO", image: "/images/Logo-FBF.png" },
                ]
                  // Dupliquer la liste pour un défilement infini
                  .concat([
                    { name: "AZITO ENERGIE", image: "/images/AZITO ENERGIE.png" },
                    { name: "CARENA", image: "/images/carena_logo.jpg" },
                    { name: "BCEAO", image: "/images/BCEAO-logo.png" },
                    { name: "BOLLORE", image: "/images/Logo_Bolloré.png" },
                    { name: "FIDRA", image: "/images/FIDRA.jpg" },
                    { name: "FRATERNITE MATIN", image: "/images/Logo_Fraternité_Matin.png" },
                    { name: "G4S", image: "/images/g4s-logo.png" },
                    { name: "LAVEGARDE", image: "/images/lavegarde_group_logo.jpeg" },
                    { name: "TONGON", image: "/images/logo_TONGON.jpeg" },
                    { name: "NSIA ASSURANCE", image: "/images/Nsia-logo.png" },
                    { name: "ONUCI", image: "/images/un-logo.png" },
                    { name: "AGL", image: "/images/Africa_Global_Logistics_logo.png" },
                    { name: "PETROCI", image: "/images/logo_Petroci.png" },
                    { name: "UVICOCI", image: "/images/logo_UVICOCI.png" },
                    { name: "SICOGI", image: "/images/SICOGI.png" },
                    { name: "SOCIMAT", image: "/images/socimat_logo.png" },
                    { name: "SOGB", image: "/images/SOGB_logo.png" },
                    { name: "SONOCO", image: "/images/sonoco-logo.png" },
                    { name: "UNACOOPEC-CI", image: "/images/COOPEC.png" },
                    { name: "LGL", image: "/images/LGL-logo.png" },
                    { name: "SITARAIL", image: "/images/SITARAIL.png" },
                    { name: "BURKINA FASO", image: "/images/Logo-FBF.png" },
                  ])
                  .map((partner, index) => (
                    <motion.div
                      key={`${partner.name}-${index}`}
                      className="flex-shrink-0 w-48 h-32 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center p-6 group hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain transition-all duration-300"
                        onError={(e) => {
                          // Fallback si l'image n'existe pas
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `<div class="text-center text-primary font-semibold">${partner.name}</div>`;
                        }}
                      />
                    </motion.div>
                  ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-white/50 to-accent-1/5 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#FF6B35]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#E55A2B]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-1/5 rounded-full blur-3xl"></div>
          
          {Array.from({ length: 15 }, (_, i) => {
            const durations = [4.2, 4.5, 4.8, 4.1, 4.6, 4.3, 4.7, 4.4, 4.9, 4.0];
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#FF6B35]/20 rounded-full"
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
            initial={{ opacity: 0, y: 50 }}
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
              Nos Partenaires Institutionnels
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              L'ASPCI collabore avec les plus grandes institutions internationales et nationales
              pour garantir l'excellence de ses formations et services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                id: "imq",
                name: "Institut Maritime du Québec",
                logoUrl: "/images/québec.jpg"
              },
              {
                id: "acet",
                name: "CTTA\nACET",
                logoUrl: "/images/CTTA_LOGO_MED.jpg"
              },
              {
                id: "unitas",
                name: "UNITAS WORLD",
                logoUrl: "/images/Unitas.png"
              },
              {
                id: "cite-collegiale",
                name: "La Cité Collégiale",
                logoUrl: "/images/La cite.png"
              },
              {
                id: "fdfp",
                name: "FDFP",
                logoUrl: "/images/FDFP.png"
              },
              {
                id: "cgeci",
                name: "CGECI",
                logoUrl: "/images/CGECI.png"
              },
              {
                id: "sitarail",
                name: "SITARAIL",
                logoUrl: "/images/SITARAIL.png"
              },
              {
                id: "coopec",
                name: "COOPEC",
                logoUrl: "/images/COOPEC.png"
              },
              {
                id: "fidra",
                name: "FIDRA",
                logoUrl: "/images/FIDRA.jpg"
              },
              {
                id: "sicogi",
                name: "SICOGI",
                logoUrl: "/images/SICOGI.png"
              }
            ].map((partner, index) => (
              <motion.div
                key={partner.id}
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
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/30 hover:border-[#FF6B35]/30 relative overflow-hidden transform-gpu h-full">
                  {/* Glassmorphism background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-accent-1/10 rounded-3xl"></div>
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 group-hover:via-white/30 to-transparent transition-all duration-500 rounded-3xl"></div>

                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    {Array.from({ length: 3 }, (_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[#FF6B35]/30 rounded-full"
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${20 + i * 20}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10 flex flex-col justify-center h-full py-4">
                    <div className="text-center">
                      {partner.logoUrl ? (
                        <div className="relative mb-4">
                          <img
                            src={partner.logoUrl}
                            alt={partner.name}
                            className="w-auto h-16 object-contain mx-auto"
                          />
                        </div>
                      ) : (
                        <div className="bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <span className="font-bold text-lg">{partner.name.substring(0, 2).toUpperCase()}</span>
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-primary group-hover:text-[#FF6B35] transition-colors whitespace-pre-line">
                        {partner.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-b from-white to-white/60">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
              Notre Histoire
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              + de 30 années d'excellence au service de la sécurité professionnelle en Côte d'Ivoire
            </p>
          </motion.div>

          <div className="relative">
            {/* Enhanced Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent-1 via-accent-2 to-accent-3 hidden md:block rounded-full shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-accent-1/50 to-accent-3/50 rounded-full blur-sm"></div>
            </div>

            <div className="space-y-16">
              {[
                {
                  year: "2003",
                  title: "Création d'ASP CONSULTING",
                  description: "Fondation d'ASP CONSULTING, institution ivoiro-canadienne créée par des professionnels de la sécurité formés au Canada. Première école d'Afrique noire spécialisée dans la formation et la diffusion de l'expertise en sécurité.",
                  side: "left",
                  icon: Shield,
                  color: "from-orange-400 to-orange-600"
                },
                {
                  year: "2005",
                  title: "Première certification internationale",
                  description: "Obtention des premières certifications internationales pour nos programmes de formation en sécurité privée.",
                  side: "right",
                  icon: Award,
                  color: "from-blue-400 to-blue-600"
                },
                {
                  year: "2010",
                  title: "Expansion des formations",
                  description: "Lancement des spécialisations en sécurité portuaire et protection rapprochée des personnalités.",
                  side: "left",
                  icon: Users,
                  color: "from-green-400 to-green-600"
                },
                {
                  year: "2015",
                  title: "Partenariats institutionnels",
                  description: "Établissement de partenariats stratégiques avec les ministères et organisations internationales.",
                  side: "right",
                  icon: CheckCircle,
                  color: "from-purple-400 to-purple-600"
                },
                {
                  year: "2020",
                  title: "Digitalisation des formations",
                  description: "Modernisation de nos méthodes pédagogiques avec l'intégration des technologies numériques.",
                  side: "left",
                  icon: Clock,
                  color: "from-cyan-400 to-cyan-600"
                },
                {
                  year: "2024",
                  title: "Nouveau campus",
                  description: "Inauguration de notre nouveau campus moderne équipé des dernières technologies de formation.",
                  side: "right",
                  icon: Star,
                  color: "from-pink-400 to-pink-600"
                }
              ].map((event, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${event.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-12`}
                  initial={{ opacity: 0, x: event.side === 'left' ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={`flex-1 ${event.side === 'left' ? 'md:text-right' : 'md:text-left'} text-center md:text-left`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative group">
                      {/* Card background with enhanced styling */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm rounded-3xl border border-white/30 shadow-2xl"></div>

                      {/* Decorative elements */}
                      <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-accent-1/20 to-accent-2/20 rounded-full blur-2xl"></div>
                      <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-gradient-to-br from-accent-3/20 to-accent-1/20 rounded-full blur-2xl"></div>

                      <div className="relative p-8">
                        {/* Year badge */}
                        <motion.div
                          className={`inline-flex items-center gap-3 bg-gradient-to-r ${event.color} text-white px-4 py-2 rounded-2xl font-bold text-lg mb-4 shadow-lg`}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: index * 0.3 + 0.2, duration: 0.5, type: "spring" }}
                          viewport={{ once: true }}
                        >
                          <event.icon className="w-5 h-5" />
                          {event.year}
                        </motion.div>

                        {/* Title */}
                        <motion.h3
                          className="text-2xl font-bold text-primary mb-4 group-hover:text-accent-1 transition-colors"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.3 + 0.4, duration: 0.6 }}
                          viewport={{ once: true }}
                        >
                          {event.title}
                        </motion.h3>

                        {/* Description */}
                        <motion.p
                          className="text-gray-700 leading-relaxed text-base"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.3 + 0.6, duration: 0.6 }}
                          viewport={{ once: true }}
                        >
                          {event.description}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Enhanced Timeline dot */}
                  <motion.div
                    className="hidden md:flex items-center justify-center w-6 h-6 bg-gradient-to-r from-accent-1 to-accent-2 rounded-full border-4 border-white shadow-xl z-10 relative"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.3 + 0.8, duration: 0.5, type: "spring" }}
                    viewport={{ once: true }}
                  >
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    {/* Pulsing effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent-1 to-accent-2 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent-2 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-orange-500">
              Prêt à commencer votre carrière en sécurité ?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white">
              Rejoignez l'excellence avec ASP CONSULTING. Nos formations certifiées vous ouvrent les portes
              des meilleures opportunités professionnelles.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/formations"
                  className="btn-primary px-8 py-4 rounded-full font-semibold text-white shadow-lg inline-flex items-center gap-2 group"
                >
                  Voir nos formations
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-full font-semibold text-white border-2 border-white/30 hover:border-white/60 transition-colors inline-block"
                >
                  Nous contacter
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer formations={formations} />
    </div>
  );
}

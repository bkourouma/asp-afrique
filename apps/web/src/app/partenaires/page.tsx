"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Award, Users, Star, CheckCircle, Handshake, Building2, GraduationCap } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface Partner {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  websiteUrl?: string | null;
  description?: string | null;
  isActive: boolean;
}

// Données statiques des partenaires
const partnersData: Partner[] = [
  {
    id: "imq",
    name: "Institut Maritime du Québec",
    slug: "institut-maritime-du-quebec",
    description: "Institut spécialisé dans la formation maritime et la sécurité portuaire.",
    logoUrl: "/images/québec.jpg",
    websiteUrl: null,
    isActive: true
  },
  {
    id: "acet",
    name: "CTTA\nACET",
    slug: "academie-canadienne-entrainement-tactique",
    description: "Académie spécialisée dans l'entraînement tactique et la formation professionnelle.",
    logoUrl: "/images/CTTA_LOGO_MED.jpg",
    websiteUrl: null,
    isActive: true
  },
  {
    id: "unitas",
    name: "UNITAS WORLD",
    slug: "unitas-world",
    description: "Réseau international de formation et certification en sécurité professionnelle.",
    logoUrl: "/images/Unitas.png",
    websiteUrl: null,
    isActive: true
  },
  {
    id: "cite-collegiale",
    name: "La Cité Collégiale",
    slug: "cite-collegiale",
    description: "Établissement d'enseignement supérieur reconnu pour ses programmes de formation professionnelle.",
    logoUrl: "/images/La cite.png",
    websiteUrl: null,
    isActive: true
  },
  {
    id: "fdfp",
    name: "FDFP",
    slug: "fdfp",
    description: "Fonds de Développement de la Formation Professionnelle - Partenaire institutionnel pour le développement des compétences.",
    logoUrl: "/images/FDFP.png",
    websiteUrl: null,
    isActive: true
  },
  {
    id: "cgeci",
    name: "CGECI",
    slug: "cgeci",
    description: "Confédération Générale des Entreprises de Côte d'Ivoire - Organisation patronale représentant le secteur privé.",
    logoUrl: "/images/CGECI.png",
    websiteUrl: null,
    isActive: true
  },
  {
    id: "sitarail",
    name: "SITARAIL",
    slug: "sitarail",
    description: "Société Ivoirienne de Transport Ferroviaire - Partenaire institutionnel pour le transport et la logistique.",
    logoUrl: "/images/SITARAIL.png",
    websiteUrl: null,
    isActive: true
  },
  {
    id: "coopec",
    name: "COOPEC",
    slug: "coopec",
    description: "Coopérative d'Épargne et de Crédit - Partenaire institutionnel pour le financement et l'épargne.",
    logoUrl: "/images/COOPEC.png",
    websiteUrl: null,
    isActive: true
  },
  {
    id: "fidra",
    name: "FIDRA",
    slug: "fidra",
    description: "Fonds Interprofessionnel de Développement Rural et Agricole - Partenaire institutionnel pour le développement rural.",
    logoUrl: "/images/FIDRA.jpg",
    websiteUrl: null,
    isActive: true
  },
  {
    id: "sicogi",
    name: "SICOGI",
    slug: "sicogi",
    description: "Société Immobilière de Construction de Côte d'Ivoire - Partenaire institutionnel pour l'immobilier et la construction.",
    logoUrl: "/images/SICOGI.png",
    websiteUrl: null,
    isActive: true
  }
];

export default function PartenairesPage() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header */}
      <Header currentPath="/partenaires" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0A2540] to-[#1A3F5F] text-white py-20">
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
              <Handshake className="w-12 h-12 mx-auto text-black mb-4" />
            </motion.div>

            <motion.h1
              className="text-5xl font-bold mb-4"
              style={{ color: '#FF6B35' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Nos Partenaires & Reconnaissance
            </motion.h1>

            <motion.p
              className="text-xl text-center text-gray-200 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              ASP CONSULTING collabore avec les plus grandes institutions internationales et nationales
              pour garantir l'excellence de ses formations et services.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
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
                <Handshake className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
              Nos Partenaires Institutionnels
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              ASP CONSULTING collabore avec les plus grandes institutions internationales et nationales
              pour garantir l'excellence de ses formations et services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {partnersData.filter(partner => partner.isActive).map((partner, index) => (
              <motion.div
                key={partner.id}
                id={partner.slug}
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

      {/* Accreditation Section */}
      <section className="py-20 bg-gradient-to-r from-white/40 to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
              Accréditations & Reconnaissance
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Nos certifications et accréditations témoignent de notre engagement envers l'excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              {/* Background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent-2 rounded-3xl shadow-2xl"></div>
              
              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-accent-1/20 to-accent-2/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-gradient-to-br from-accent-3/20 to-accent-1/20 rounded-full blur-2xl"></div>

              <div className="relative p-8 text-white">
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <Award className="w-8 h-8 text-accent-3" />
                  <h3 className="text-2xl font-bold">Organisation Maritime Internationale</h3>
                </motion.div>
                
                <p className="text-lg mb-4 font-semibold text-accent-3">Reconnue comme Organisation de Sécurité Reconnu (RSO)</p>
                <p className="text-white/90 leading-relaxed">
                  ASP CONSULTING est officiellement reconnue par l'OMI pour dispenser des formations
                  en sécurité portuaire et maritime selon les normes internationales ISPS Code.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              {/* Background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-1 to-accent-3 rounded-3xl shadow-2xl"></div>
              
              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent-2/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-gradient-to-br from-accent-2/20 to-primary/20 rounded-full blur-2xl"></div>

              <div className="relative p-8 text-primary">
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <GraduationCap className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">Ministère de la Sécurité</h3>
                </motion.div>
                
                <p className="text-lg mb-4 font-semibold text-primary/80">Agrément officiel du gouvernement ivoirien</p>
                <p className="text-primary/70 leading-relaxed">
                  Nos programmes de formation sont validés par le Ministère de la Sécurité
                  et de la Protection Civile de Côte d'Ivoire.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-white/50 to-accent-1/5 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
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
            className="text-center"
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
                  <Handshake className="w-16 h-16 mx-auto text-[#FF6B35] mb-4" />
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#FF6B35' }}>
                  Rejoignez notre réseau de partenaires
                </h3>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                  Devenez partenaire d'ASP CONSULTING et participez à l'excellence de la formation en sécurité professionnelle.
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
                      Devenir partenaire
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
                      href="/formations"
                      className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border border-white/30 hover:bg-white/20 transition-all duration-300"
                    >
                      Nos formations
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
                  { name: "NEWCREST", image: "/images/Newcrest_logo.svg" },
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
                    { name: "NEWCREST", image: "/images/Newcrest_logo.svg" },
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
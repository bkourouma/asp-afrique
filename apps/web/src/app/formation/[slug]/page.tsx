"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Award, Clock, Users, BookOpen, CheckCircle, ArrowRight, Star, Target, Zap, Globe, Phone, Mail, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { apiGet } from "@/lib/api-client";

interface FormationDetail {
  id: string;
  title: string;
  slug: string;
  duration: string;
  description: string;
  objectives?: string | null;
  syllabus?: string | null;
  imageUrl?: string | null;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function FormationDetailPage({ params }: PageProps) {
  const [formation, setFormation] = useState<FormationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const { slug } = await params;
        const data = await apiGet<FormationDetail>(`/api/v1/formations/slug/${slug}`);
        setFormation({
          id: data.id,
          title: data.title,
          slug: data.slug,
          duration: data.duration,
          description: data.description,
          objectives: data.objectives,
          syllabus: data.syllabus,
          imageUrl: data.imageUrl
        });
      } catch (error) {
        console.error('Error fetching formation:', error);
        // Fallback data for ingénierie sécuritaire
        const { slug } = await params;
        if (slug === 'ingenierie-securitaire') {
          setFormation({
            id: "is",
            title: "Ingénierie Sécuritaire (IS)",
            slug: "ingenierie-securitaire",
            duration: "360h",
            description: "Formation supérieure en stratégie de sécurité d'entreprise et gestion des risques corporatifs. Cette formation d'excellence prépare les professionnels à concevoir, implémenter et gérer des systèmes de sécurité complexes dans des environnements d'entreprise modernes.",
            objectives: "Développer des stratégies de sécurité avancées, évaluer et gérer les risques corporatifs, mettre en place des plans de continuité d'activité, maîtriser les technologies de sécurité modernes, diriger des équipes de sécurité et assurer la conformité réglementaire.",
            syllabus: "Module 1: Management de la sécurité d'entreprise\nModule 2: Analyse et évaluation des risques\nModule 3: Systèmes de sécurité intégrés\nModule 4: Gestion de crise et continuité d'activité\nModule 5: Audit et conformité réglementaire\nModule 6: Technologies de sécurité avancées\nModule 7: Leadership et management d'équipes\nModule 8: Communication et reporting"
          });
        } else {
          notFound();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFormation();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35] mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600 text-lg">Chargement de la formation...</p>
        </motion.div>
      </div>
    );
  }

  if (!formation) {
    notFound();
  }

  const syllabusModules = formation.syllabus?.split('\n').filter(module => module.trim()) || [];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header */}
      <Header currentPath="/formations" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0A2540] to-[#1A3F5F] text-white py-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#FF6B35]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#E55A2B]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <motion.nav 
            className="text-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="text-white/80 hover:text-[#FF6B35] transition-colors">Accueil</Link>
            <span className="mx-2 text-white/60">/</span>
            <Link href="/formations" className="text-white/80 hover:text-[#FF6B35] transition-colors">Formations</Link>
            <span className="mx-2 text-white/60">/</span>
            <span className="text-[#FF6B35] font-semibold">{formation.title}</span>
          </motion.nav>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Image de la formation */}
            {formation.imageUrl && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-6 flex justify-center"
              >
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <img 
                    src={formation.imageUrl}
                    alt={formation.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            )}
            
            {!formation.imageUrl && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-6"
              >
                <Award className="w-16 h-16 mx-auto text-[#FF6B35] mb-4" />
              </motion.div>
            )}

            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ color: '#FF6B35' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {formation.title}
            </motion.h1>

            <motion.p
              className="text-xl text-center text-gray-200 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {formation.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#FF6B35]" />
                <span className="font-semibold">{formation.duration}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#FF6B35]" />
                <span className="font-semibold">Formation certifiée</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-[#FF6B35]" />
                <span className="font-semibold">Niveau supérieur</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-bg-secondary to-accent-1/10 relative overflow-hidden">
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
          <div className="max-w-6xl mx-auto">
            {/* Objectives Section */}
            {formation.objectives && (
              <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
                  <motion.div
                    className="flex items-center gap-4 mb-6"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] p-3 rounded-2xl">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#0A2540]">Objectifs de la Formation</h2>
                  </motion.div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {formation.objectives.split('.').filter(obj => obj.trim()).map((objective, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-gradient-to-r from-[#FF6B35]/5 to-[#E55A2B]/5 rounded-xl"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 5 }}
                      >
                        <CheckCircle className="w-6 h-6 text-[#FF6B35] mt-1 flex-shrink-0" />
                        <p className="text-[#0A2540] font-medium">{objective.trim()}.</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Syllabus Section */}
            {syllabusModules.length > 0 && (
              <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
                  <motion.div
                    className="flex items-center gap-4 mb-8"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-gradient-to-br from-[#0A2540] to-[#1A3F5F] p-3 rounded-2xl">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#0A2540]">Programme Détaillé</h2>
                  </motion.div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {syllabusModules.map((module, index) => (
                      <motion.div
                        key={index}
                        className="group relative"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-[#FF6B35]/30 transition-all duration-300 shadow-lg hover:shadow-xl">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                              {index + 1}
                            </div>
                            <h3 className="text-lg font-bold text-[#0A2540] group-hover:text-[#FF6B35] transition-colors">
                              {module}
                            </h3>
                          </div>
                          <div className="h-2 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* CTA Section */}
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
                    <Zap className="w-16 h-16 mx-auto text-[#FF6B35] mb-4" />
                  </motion.div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    Prêt à commencer votre formation ?
                  </h3>
                  <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                    Rejoignez des centaines de professionnels qui ont choisi ASPCI pour leur formation en sécurité.
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
                        S'inscrire maintenant
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="/formations"
                        className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border border-white/30 hover:bg-white/20 transition-all duration-300"
                      >
                        Voir toutes les formations
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
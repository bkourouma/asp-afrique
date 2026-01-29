"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Users, Award, Briefcase } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotreEquipePage() {
  const teamMembers = [
    {
      name: "Jean Delon AMANI",
      role: "Directeur Général",
      description: "Consultant Senior en ingénierie sécuritaire, sûreté maritime (code ISPS), sondage et audit en sécurité, système d'information et veille sécuritaire. Expert reconnu avec plus de 23 ans d'expérience dans la formation et la sécurité.",
      image: "/images/M. Jean AMANI.png"
    },
    {
      name: "WILSON Sewa",
      role: "DGA & chargé des opérations",
      description: "Directeur Général Adjoint chargé des opérations. Expert en gestion opérationnelle, spécialiste code ISPS, contrôle de foule, techniques de patrouille et communication. Gère l'ensemble des opérations de l'organisme.",
      image: "/images/M. Wilde Sewa WILSON Fernandez.png"
    },
    {
      name: "Julien BAHDOU",
      role: "DGA & chargé des études et des recherches",
      description: "Directeur Général Adjoint chargé des études et des recherches. Spécialiste en ingénierie sécuritaire, code ISPS, gestion de patrouille et techniques d'intervention. Expert en conception et mise en place de stratégies sécuritaires et en audit.",
      image: "/images/M. Julien BADHOU.png"
    },
    {
      name: "TALL Lancina",
      role: "Directeur chargé du partenariat",
      description: "Directeur chargé du partenariat. Juriste spécialisé en entreprises, consultant en renforcement des capacités et conception de référentiels et normes sécuritaires. Développe et gère les partenariats stratégiques.",
      image: "/images/M. Lacina TALL.png"
    },
    {
      name: "WILLSON Nancy",
      role: "Assistante chargée de la formation",
      description: "Assistante chargée de la formation. Spécialiste en organisation et coordination des programmes de formation. Assure le suivi pédagogique et administratif des formations dispensées par l'organisme.",
      image: "/images/WILLSON Nancy.png"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header currentPath="/a-propos/notre-equipe" />

      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-primary hover:text-accent-1 transition-colors">
              Accueil
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/a-propos" className="text-primary hover:text-accent-1 transition-colors">
              À propos
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Notre Équipe</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section 
        className="relative py-20 bg-gradient-to-br from-primary/10 via-bg-secondary to-accent-1/10"
        style={{
          backgroundImage: 'url(/images/Section_Hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Notre Équipe
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Une équipe d'experts dédiés à l'excellence en formation sécuritaire
            </p>
          </motion.div>
        </div>
      </section>

      {/* Back to About */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <Link 
            href="/a-propos" 
            className="inline-flex items-center gap-2 text-primary hover:text-accent-1 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à la page À propos
          </Link>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16 bg-gradient-to-br from-bg-secondary to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">5</h3>
                <p className="text-text-secondary">Membres de l'équipe dirigeante</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-1/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-accent-1" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">23+</h3>
                <p className="text-text-secondary">Années d'expérience collective</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-2/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-accent-2" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">15+</h3>
                <p className="text-text-secondary">Spécialisations différentes</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
              Notre Équipe
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Découvrez les experts qui dirigent l'ASPCI et contribuent à son excellence
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto space-y-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 flex justify-center items-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="relative w-full max-w-xs h-[400px] rounded-xl overflow-hidden shadow-lg bg-white">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h3 className="text-2xl font-bold text-primary mb-4">
                      {member.name}
                    </h3>
                    <p className="text-text-secondary leading-relaxed mb-6">
                      {member.description}
                    </p>
                    <div className="text-right">
                      <p className="text-accent-1 font-semibold text-lg">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-bg-secondary to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
                Nos Valeurs
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Les principes qui guident notre équipe et notre approche de la formation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Excellence</h3>
                <p className="text-text-secondary">
                  Nous nous engageons à maintenir les plus hauts standards de qualité dans toutes nos formations.
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-accent-1/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent-1" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Expertise</h3>
                <p className="text-text-secondary">
                  Notre équipe possède une expertise approfondie dans tous les domaines de la sécurité.
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-accent-2/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-accent-2" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Innovation</h3>
                <p className="text-text-secondary">
                  Nous adaptons nos méthodes pédagogiques aux évolutions du secteur sécuritaire.
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Engagement</h3>
                <p className="text-text-secondary">
                  Nous nous engageons à former les meilleurs professionnels de la sécurité.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer formations={[]} />
    </div>
  );
}

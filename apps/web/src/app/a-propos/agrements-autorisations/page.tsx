"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield, Globe, Award, FileText, CheckCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function AgrementsPage() {
  const nationalAuthorizations = [
    {
      ministry: "Ministère de la Formation Professionnelle",
      description: "Arrêtés d'autorisation :",
      details: [
        "N°2001/122/MJEFP/DFPP/S-DRCP",
        "N° 2002/10/MJEFP/DFPP/S-DRCP/NJ"
      ]
    },
    {
      ministry: "Ministère de la Sécurité",
      description: "Arrêté d'autorisation :",
      details: [
        "792/MEMID/DGAT/DAG/SDPR"
      ]
    },
    {
      ministry: "Fonds de Développement et de la Formation Professionnelle (FDFP)",
      description: "Autorisation de formation professionnelle",
      details: []
    }
  ];

  const internationalAuthorizations = [
    {
      organization: "RSO (Organisme de Sûreté Reconnu)",
      description: "CERTIFICATEUR N° 0447/MT/DGAMP du 06-06-12",
      type: "Certification"
    },
    {
      organization: "UNITAS WORLD",
      description: "Certification de l'expertise aux normes International",
      type: "Certification"
    },
    {
      organization: "Académie Canadienne d'Entraînement Tactique (ACET) & Institut Maritime du Québec (IMQ)",
      description: "Certification du programme pédagogique",
      type: "Certification"
    },
    {
      organization: "La Cité Collégiale (LCC) Ottawa",
      description: "Certification police municipale",
      type: "Certification"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header currentPath="/a-propos/agrements-autorisations" />

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
            <span className="text-gray-600">Agréments et Autorisations</span>
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
              Agréments et Autorisations
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Nos certifications et autorisations nationales et internationales
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

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
              Nos Certifications
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Constituée conformément aux dispositions de l'acte uniforme de l'OHADA, 
              ASP Consulting jouit de plusieurs autorisations et agréments dont les plus importants sont :
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
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
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">3</h3>
                <p className="text-text-secondary">Autorisations nationales</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-1/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-accent-1" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">4</h3>
                <p className="text-text-secondary">Certifications internationales</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-2/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-accent-2" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">23+</h3>
                <p className="text-text-secondary">Années d'expérience certifiée</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Agréments et Autorisations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Autorisations Nationales */}
              <motion.div
                className="bg-gradient-to-br from-primary/5 to-accent-1/5 p-8 rounded-2xl border border-primary/10"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    AUTORISATIONS ET AGRÉMENTS NATIONAUX
                  </h3>
                </div>
                
                <div className="space-y-6">
                  {nationalAuthorizations.map((auth, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="font-semibold text-lg text-primary mb-3">
                        {auth.ministry}
                      </h4>
                      <p className="text-text-secondary mb-2">
                        {auth.description}
                      </p>
                      {auth.details.length > 0 && (
                        <ul className="text-text-secondary space-y-1 ml-4">
                          {auth.details.map((detail, detailIndex) => (
                            <li key={detailIndex}>• {detail}</li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Autorisations Internationales */}
              <motion.div
                className="bg-gradient-to-br from-accent-1/5 to-accent-2/5 p-8 rounded-2xl border border-accent-1/10"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-accent-1/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-accent-1" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    AUTORISATION À CARACTÈRE INTERNATIONAL
                  </h3>
                </div>
                
                <div className="space-y-6">
                  {internationalAuthorizations.map((auth, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-accent-1/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Award className="w-4 h-4 text-accent-1" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg text-primary mb-2">
                            {auth.organization}
                          </h4>
                          <p className="text-text-secondary mb-2">
                            {auth.description}
                          </p>
                          <span className="inline-block px-3 py-1 bg-accent-1/10 text-accent-1 text-sm rounded-full">
                            {auth.type}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
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
                Pourquoi Choisir l'ASPCI ?
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Nos certifications et autorisations garantissent la qualité et la reconnaissance de nos formations
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
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Reconnaissance Officielle</h3>
                <p className="text-text-secondary">
                  Autorisations des ministères compétents et certifications internationales.
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
                  <Award className="w-8 h-8 text-accent-1" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Excellence Pédagogique</h3>
                <p className="text-text-secondary">
                  Programmes certifiés par des institutions internationales reconnues.
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
                  <Globe className="w-8 h-8 text-accent-2" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Standards Internationaux</h3>
                <p className="text-text-secondary">
                  Conformité aux normes internationales de sécurité et de sûreté.
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
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Confiance</h3>
                <p className="text-text-secondary">
                  Plus de 23 ans d'expérience et de confiance des institutions.
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

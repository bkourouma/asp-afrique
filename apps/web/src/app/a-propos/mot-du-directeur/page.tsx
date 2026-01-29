"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, User, Calendar, Award } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function MotDirecteurPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header currentPath="/a-propos/mot-du-directeur" />

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
            <span className="text-gray-600">Mot du Directeur Général</span>
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
              Mot du Directeur Général
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Un message de notre Directeur Général sur l'engagement d'ASP CONSULTING
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

      {/* Mot du Directeur Général */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
                  <Image
                    src="/images/Directeur.jpeg"
                    alt="Directeur Général ASPCI"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-primary/5 to-accent-1/5 p-8 rounded-2xl border border-primary/10 space-y-8">
                  {/* Section Professionnels */}
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">
                      A l'attention des professionnels
                    </h3>
                    <p className="text-lg text-text-secondary leading-relaxed">
                      Nous nous sommes donnés la mission de professionnaliser et valoriser le métier d'agent de sécurité parce que nous ne voyons plus l'agent comme une espèce d'abruti aux muscles bien développés. Le client exige qu'il soit en mesure de prévenir la menace plutôt que de réagir. Les non-initiés vous diront qu'on ne peut résoudre un problème avant que celui-ci n'apparaisse, mais les professionnels savent que le secret pour bien gérer une crise réside dans le fait d'être préparé à faire face à toute éventualité.
                    </p>
                  </div>

                  {/* Section Entreprises */}
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">
                      A l'attention des Entreprises
                    </h3>
                    <p className="text-lg text-text-secondary leading-relaxed mb-4">
                      Les installations industrielles, commerciales, bancaires, portuaires et les habitations ainsi que leurs équipements étant de plus en plus importants et complexes et la mise hors de service des lignes de défense pouvant occasionner des inconvénients et souvent des pertes graves, voir même irréparable, nous proposons d'accompagner les entreprises et les institutions qui sont à la recherche d'une sécurité moderne et dynamique pour accroitre leur compétitivité.
                    </p>
                    <p className="text-lg text-text-secondary leading-relaxed">
                      Notre expertise couvre la conception et la mise en œuvre de politiques de sécurité efficaces et adaptées aux besoins et aux spécificités des entreprises.
                    </p>
                  </div>

                  {/* Citation finale */}
                  <div className="pt-4 border-t border-primary/20">
                    <p className="text-lg text-text-secondary leading-relaxed italic">
                      Nous sommes des spécialistes de la sécurité des personnes et des biens et derrière chacun de nos gestes, se cachent d'immenses heures de formation et d'expertise
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-primary font-semibold text-lg">Jean AMANI</p>
                  <p className="text-accent-1 font-medium">Directeur Général</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Profil du Directeur */}
      <section className="py-20 bg-gradient-to-br from-bg-secondary to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
                Profil du Directeur Général
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary">M. Jean AMANI</h3>
                    <p className="text-accent-1 font-medium">Directeur Général</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-text-secondary">23+ années d'expérience</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-primary" />
                      <span className="text-text-secondary">Expert-Consultant certifié</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary/5 to-accent-1/5 p-6 rounded-xl">
                    <h4 className="font-semibold text-lg text-primary mb-4">Expertise</h4>
                    <ul className="text-text-secondary space-y-2">
                      <li>• Consultant Senior en ingénierie sécuritaire</li>
                      <li>• Spécialiste sûreté maritime (code ISPS)</li>
                      <li>• Expert en sondage et audit en sécurité</li>
                      <li>• Spécialiste système d'information et veille sécuritaire</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer formations={[]} />
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
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
      <Header currentPath="/a-propos" />

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
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              À Propos d'ASP CONSULTING
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Découvrez notre histoire, notre équipe et notre engagement envers l'excellence en sécurité professionnelle
            </p>
          </div>
        </div>
      </section>

      {/* Qui sommes-nous ? */}
      <section className="py-20 bg-gradient-to-br from-white via-primary/5 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
                Qui sommes-nous ?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Points clés avec icônes */}
              <div className="space-y-6">
                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-2xl">✓</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">
                        Seule école agréée
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        ASP consulting est la seule école agréée par les Ministères de la Formation Professionnelle, et de la sécurité offrant une certification en matière de sécurité.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0A2540] to-[#1A3F5F] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-2xl">👥</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">
                        Plus de 30.000 professionnels formés
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        L'Académie a déjà formé plus de 30.000 professionnels en matière de sécurité depuis sa création, dont les responsables sécurité de plusieurs grandes entreprises.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00D9FF] to-[#0099CC] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-2xl">🌐</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">
                        Expertise canadienne
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        ASP Consulting a bénéficié de l'expertise canadienne pour la conception de ses cursus de formation. Ce qui lui vaut aujourd'hui d'être à la pointe en matière de formation dans le domaine de la sécurité. Ainsi, elle intervient régulièrement pour les formations continues de policiers et gendarmes sur la plate-forme portuaire et également pour des personnes en activité sur des plates-formes pétrolières.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-6">
                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#9D4EDD] to-[#7B2CBF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-2xl">🏛️</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">
                        Partenariat public-privé
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        ASP consulting a contribué à l'élaboration du cadre réglementaire de Police Municipale. Par ailleurs, dans un partenariat public-privé, elle bénéficiera d'une concession de gestion de l'école de formation des policiers municipaux, attribuée par l'Etat, pour une durée de 25 ans.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FFD23F] to-[#FFC107] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-2xl">👨‍🏫</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">
                        Équipe d'instructeurs qualifiés
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        ASP consulting présente une équipe d'instructeurs permanents d'au moins 25 personnes, aguerries aux métiers de la sécurité et ayant reçu des formations hautement qualifiantes au canada. Des consultants extérieurs, professionnels du métier, interviennent régulièrement à l'Académie.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#06FFA5] to-[#00CC84] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-2xl">⚙️</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">
                        Dispositif administratif et technique
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        L'Académie en tant qu'école, bénéfice d'un dispositif administratif et technique de coordination éprouvée. La prise en main de projets et de stagiaires est structurée et fonctionne normalement.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mot du Directeur Général */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
                Mot du Directeur Général
              </h2>
              <Link 
                href="/a-propos/mot-du-directeur"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Lire le message complet
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
                  <Image
                    src="/images/Directeur.jpeg"
                    alt="Directeur Général ASPCI"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-primary/5 to-accent-1/5 p-8 rounded-2xl border border-primary/10">
                  <p className="text-lg text-text-secondary leading-relaxed mb-6">
                    Depuis plus de 23 ans, l'Académie de la Sécurité Professionnelle de Côte d'Ivoire (ASPCI) 
                    s'engage à former les meilleurs professionnels de la sécurité en Afrique. Notre mission est 
                    de répondre aux défis sécuritaires contemporains en offrant des formations d'excellence, 
                    certifiées selon les standards internationaux.
                  </p>
                  <p className="text-lg text-text-secondary leading-relaxed mb-6">
                    Fort de notre expertise reconnue dans le domaine de la sûreté maritime et de l'ingénierie 
                    sécuritaire, nous avons formé plus de 500 professionnels qui contribuent aujourd'hui à la 
                    sécurité de nos institutions et entreprises. Notre approche pédagogique innovante, combinée 
                    à un encadrement de qualité, garantit un taux de réussite de 98%.
                  </p>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    L'ASPCI continue d'innover et de s'adapter aux évolutions du secteur sécuritaire, 
                    en maintenant son leadership dans la formation professionnelle en Côte d'Ivoire et 
                    en Afrique de l'Ouest.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-primary font-semibold text-lg">M. Clotcho Sanogo SECONGO</p>
                  <p className="text-accent-1 font-medium">Président Directeur Général</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-20 bg-gradient-to-br from-bg-secondary to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
              Notre Équipe
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
              Une équipe d'experts dédiés à l'excellence en formation sécuritaire
            </p>
            <Link 
              href="/a-propos/notre-equipe"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Découvrir notre équipe
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-200"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agréments et Autorisations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
                Agréments et Autorisations
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
                Constituée conformément aux dispositions de l'acte uniforme de l'OHADA, 
                l'ASPCI jouit de plusieurs autorisations et agréments dont les plus importants sont :
              </p>
              <Link 
                href="/a-propos/agrements-autorisations"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Voir tous nos agréments
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Autorisations Nationales */}
              <div className="bg-gradient-to-br from-primary/5 to-accent-1/5 p-8 rounded-2xl border border-primary/10">
                <h3 className="text-2xl font-bold text-primary mb-6 text-center">
                  AUTORISATIONS ET AGRÉMENTS NATIONAUX
                </h3>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="font-semibold text-lg text-primary mb-3">
                      Ministère de la Formation Professionnelle
                    </h4>
                    <p className="text-text-secondary mb-2">
                      Arrêtés d'autorisation :
                    </p>
                    <ul className="text-text-secondary space-y-1 ml-4">
                      <li>• N°2001/122/MJEFP/DFPP/S-DRCP</li>
                      <li>• N° 2002/10/MJEFP/DFPP/S-DRCP/NJ</li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="font-semibold text-lg text-primary mb-3">
                      Ministère de la Sécurité
                    </h4>
                    <p className="text-text-secondary">
                      Arrêté d'autorisation : 792/MEMID/DGAT/DAG/SDPR
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="font-semibold text-lg text-primary mb-3">
                      Fond de Développement et de la Formation Professionnelle (FDFP)
                    </h4>
                    <p className="text-text-secondary">
                      Autorisation de formation professionnelle
                    </p>
                  </div>
                </div>
              </div>

              {/* Autorisations Internationales */}
              <div className="bg-gradient-to-br from-accent-1/5 to-accent-2/5 p-8 rounded-2xl border border-accent-1/10">
                <h3 className="text-2xl font-bold text-primary mb-6 text-center">
                  AUTORISATION À CARACTÈRE INTERNATIONAL
                </h3>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="font-semibold text-lg text-primary mb-3">
                      RSO (Organisme de Sûreté Reconnu)
                    </h4>
                    <p className="text-text-secondary">
                      CERTIFICATEUR N° 0447/MT/DGAMP du 06-06-12
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="font-semibold text-lg text-primary mb-3">
                      UNITAS WORLD
                    </h4>
                    <p className="text-text-secondary">
                      Certification de l'expertise aux normes International
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="font-semibold text-lg text-primary mb-3">
                      Académie Canadienne d'Entraînement Tactique (ACET) & Institut Maritime du Québec (IMQ)
                    </h4>
                    <p className="text-text-secondary">
                      Certification du programme pédagogique
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="font-semibold text-lg text-primary mb-3">
                      La Cité Collégiale (LCC) Ottawa
                    </h4>
                    <p className="text-text-secondary">
                      Certification police municipale
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer formations={[]} />
    </div>
  );
}

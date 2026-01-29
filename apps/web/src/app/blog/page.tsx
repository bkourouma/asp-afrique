"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { apiGet, API_URL } from "@/lib/api-client";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  readTime: number;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await apiGet<BlogArticle[]>("/api/v1/blog");
      setArticles(data);
    } catch (error) {
      console.error("Failed to fetch blog articles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Extraire les catégories uniques
  const categories = Array.from(new Set(articles.map(a => a.category)));

  // Filtrer les articles
  const filteredArticles = articles.filter(article => {
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-20">
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-600">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header currentPath="/blog" />

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
              <BookOpen className="w-12 h-12 mx-auto text-black mb-4" />
            </motion.div>

            <motion.h1
              className="text-5xl font-bold mb-4"
              style={{ color: '#FF6B35' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Blog & Actualités
            </motion.h1>

            <motion.p
              className="text-xl text-center text-gray-200 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Restez informé des dernières actualités et conseils en sécurité maritime
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filtres et recherche */}
        <div className="mb-12 space-y-6">
          {/* Barre de recherche */}
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-2xl px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:border-[#00D9FF] focus:outline-none transition-colors"
            />
          </div>

          {/* Filtres par catégorie */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory("")}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  !selectedCategory
                    ? "bg-[#00D9FF] text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Tous
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-[#00D9FF] text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grid d'articles avec effets avancés */}
        {filteredArticles.length === 0 ? (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-gray-600">
              {searchTerm || selectedCategory 
                ? "Aucun article ne correspond à vos critères" 
                : "Aucun article publié pour le moment"}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                className="perspective-1000"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/blog/${article.slug}`}
                  className="block group"
                >
                  <motion.div
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform-gpu h-full relative"
                    whileHover={{ 
                      y: -8,
                      rotateY: 3,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Image de couverture avec overlay gradient */}
                    {article.coverImage && (
                      <div className="relative h-56 overflow-hidden">
                        <motion.img
                          src={`${API_URL}${article.coverImage}`}
                          alt={article.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 group-hover:via-white/20 to-transparent transition-all duration-700" />
                        
                        {/* Catégorie badge sur l'image */}
                        <div className="absolute top-4 left-4">
                          <motion.span 
                            className="inline-block px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white text-sm font-bold rounded-full shadow-lg backdrop-blur-sm"
                            whileHover={{ scale: 1.1 }}
                          >
                            {article.category}
                          </motion.span>
                        </div>
                      </div>
                    )}

                    {/* Contenu avec glassmorphism */}
                    <div className="p-6 space-y-4 relative">
                      {/* Background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-accent-1/5 rounded-b-2xl" />
                      
                      <div className="relative z-10">
                        {/* Titre avec effet hover */}
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#FF6B35] transition-colors line-clamp-2 mb-3">
                          {article.title}
                        </h2>

                        {/* Extrait */}
                        <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                          {article.excerpt}
                        </p>

                        {/* Métadonnées avec icônes animées */}
                        <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100 mb-3">
                          <motion.span 
                            className="flex items-center gap-2"
                            whileHover={{ x: 2 }}
                          >
                            <Calendar className="h-4 w-4 text-[#FF6B35]" />
                            {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short'
                            })}
                          </motion.span>
                          <motion.span 
                            className="flex items-center gap-2"
                            whileHover={{ x: 2 }}
                          >
                            <Clock className="h-4 w-4 text-[#FF6B35]" />
                            {article.readTime} min
                          </motion.span>
                        </div>

                        {/* Tags avec effet hover */}
                        {article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {article.tags.slice(0, 3).map((tag) => (
                              <motion.span
                                key={tag}
                                className="text-xs px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 rounded-full border border-gray-200"
                                whileHover={{ 
                                  scale: 1.05,
                                  backgroundColor: '#FF6B35',
                                  color: '#FFFFFF'
                                }}
                              >
                                #{tag}
                              </motion.span>
                            ))}
                          </div>
                        )}

                        {/* Lien "Lire la suite" avec animation */}
                        <motion.div 
                          className="flex items-center gap-2 text-[#FF6B35] font-semibold group-hover:gap-4 transition-all"
                          whileHover={{ x: 5 }}
                        >
                          Lire la suite
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="h-5 w-5" />
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#0b1a39] text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4">ASP CONSULTING</h3>
              <p className="text-gray-300 text-sm md:text-base">
                Date de création: 2003<br />
                Expertises ivoiro-canadiennes
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm md:text-base">Contact</h4>
              <div className="space-y-2 text-gray-300 text-sm md:text-base">
                <p>📍 Cocody Angré</p>
                <p>☎ +225 27 22 50 69 96</p>
                <p>✉ info@aspcici.com</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm md:text-base">Navigation</h4>
              <div className="space-y-2">
                <Link href="/formations" className="block text-gray-300 hover:text-[#cfa34b] text-sm md:text-base">Formations</Link>
                <Link href="/consulting" className="block text-gray-300 hover:text-[#cfa34b] text-sm md:text-base">Consulting</Link>
                <Link href="/partenaires" className="block text-gray-300 hover:text-[#cfa34b] text-sm md:text-base">Partenaires</Link>
                <Link href="/blog" className="block text-gray-300 hover:text-[#cfa34b] text-sm md:text-base">Blog</Link>
                <Link href="/contact" className="block text-gray-300 hover:text-[#cfa34b] text-sm md:text-base">Contact</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 ASPCI - Tous droits réservés</p>
          </div>
        </div>
      </footer>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}


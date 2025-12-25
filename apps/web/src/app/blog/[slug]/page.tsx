"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { apiGet, API_URL } from "@/lib/api-client";
import { Calendar, Clock, ArrowLeft, Tag, User, BookOpen, MessageCircle, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string | null;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  readTime: number;
}

export default function BlogArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (params && params.slug) {
      fetchArticle(params.slug as string);
    }
  }, [params?.slug]);

  const fetchArticle = async (slug: string) => {
    try {
      const data = await apiGet<BlogArticle>(`/api/v1/blog/by-slug/${slug}`);
      setArticle(data);
      
      // Récupérer des articles similaires (même catégorie)
      const allArticles = await apiGet<BlogArticle[]>("/api/v1/blog");
      const related = allArticles
        .filter(a => a.slug !== slug && a.category === data.category)
        .slice(0, 3);
      setRelatedArticles(related);
    } catch (error) {
      console.error("Failed to fetch blog article:", error);
    } finally {
      setLoading(false);
    }
  };

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
          <p className="text-gray-600 text-lg">Chargement de l'article...</p>
        </motion.div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <BookOpen className="w-16 h-16 mx-auto text-[#FF6B35] mb-4" />
          </motion.div>
          <h1 className="text-4xl font-bold text-[#0A2540] mb-4">Article non trouvé</h1>
          <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au blog
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header */}
      <Header currentPath="/blog" />

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
            <Link href="/blog" className="text-white/80 hover:text-[#FF6B35] transition-colors">Blog</Link>
            <span className="mx-2 text-white/60">/</span>
            <span className="text-[#FF6B35] font-semibold">{article.title}</span>
          </motion.nav>

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
              <BookOpen className="w-16 h-16 mx-auto text-[#FF6B35] mb-4" />
            </motion.div>

            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white text-sm font-medium rounded-full shadow-lg">
                {article.category}
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ color: '#FF6B35' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {article.title}
            </motion.h1>

            <motion.p
              className="text-xl text-center text-gray-200 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {article.excerpt}
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2">
                <User className="w-5 h-5 text-[#FF6B35]" />
                <span className="font-semibold">{article.author}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#FF6B35]" />
                <span className="font-semibold">
                  {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#FF6B35]" />
                <span className="font-semibold">{article.readTime} min de lecture</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Image Hero */}
      {article.coverImage && (
        <motion.section
          className="relative h-96 bg-gray-900"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src={`${API_URL}${article.coverImage}`}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.section>
      )}

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
          <div className="max-w-4xl mx-auto">
            {/* Article Content */}
            <motion.article
              className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
                style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.75',
                  color: '#374151'
                }}
              />

              {/* Tags */}
              {article.tags.length > 0 && (
                <motion.div
                  className="flex items-center gap-3 pt-8 border-t border-gray-200 mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Tag className="h-5 w-5 text-[#FF6B35]" />
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <motion.span
                        key={tag}
                        className="px-4 py-2 bg-gradient-to-r from-[#FF6B35]/10 to-[#E55A2B]/10 text-[#FF6B35] rounded-full text-sm font-medium hover:from-[#FF6B35]/20 hover:to-[#E55A2B]/20 transition-all duration-300 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        #{tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

            </motion.article>
          </div>
        </div>
      </section>

      {/* Articles similaires */}
      {relatedArticles.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-primary/5 via-bg-secondary to-accent-1/10 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-[#FF6B35]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#E55A2B]/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-1/5 rounded-full blur-3xl"></div>
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
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
              </motion.div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
                Articles similaires
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Découvrez d'autres articles qui pourraient vous intéresser
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((related, index) => (
                <motion.div
                  key={related.id}
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
                  <Link href={`/blog/${related.slug}`}>
                    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/30 hover:border-[#FF6B35]/30 relative overflow-hidden transform-gpu h-full">
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

                      <div className="relative z-10">
                        {related.coverImage && (
                          <div className="relative h-48 overflow-hidden rounded-t-3xl">
                            <img
                              src={`${API_URL}${related.coverImage}`}
                              alt={related.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                          </div>
                        )}
                        
                        <div className="p-6">
                          <motion.span
                            className="inline-block px-3 py-1 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white text-xs font-medium rounded-full mb-4"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          >
                            {related.category}
                          </motion.span>
                          
                          <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-[#FF6B35] transition-colors line-clamp-2">
                            {related.title}
                          </h3>
                          
                          <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                            {related.excerpt}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(related.publishedAt).toLocaleDateString('fr-FR')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {related.readTime} min
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
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
                  <BookOpen className="w-16 h-16 mx-auto text-[#FF6B35] mb-4" />
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Restez informé de nos actualités
                </h3>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                  Abonnez-vous à notre newsletter pour recevoir les derniers articles et actualités de l'ASPCI.
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
                      href="/blog"
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      Voir tous les articles
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
                      href="/contact"
                      className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border border-white/30 hover:bg-white/20 transition-all duration-300"
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
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        .prose h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #0A2540;
        }
        
        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #0A2540;
        }
        
        .prose p {
          margin-bottom: 1.5rem;
          color: #374151;
        }
        
        .prose ul, .prose ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }
        
        .prose li {
          margin-bottom: 0.5rem;
          color: #374151;
        }
        
        .prose blockquote {
          border-left: 4px solid #FF6B35;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #6b7280;
          background: linear-gradient(135deg, #FF6B35/5, #E55A2B/5);
          padding: 1.5rem;
          border-radius: 0.5rem;
        }
        
        .prose img {
          max-width: 100%;
          height: auto;
          margin: 2rem 0;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .prose a {
          color: #FF6B35;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .prose a:hover {
          color: #E55A2B;
          text-decoration: underline;
        }
        
        .prose strong {
          color: #0A2540;
          font-weight: 700;
        }
        
        .prose code {
          background: linear-gradient(135deg, #FF6B35/10, #E55A2B/10);
          color: #FF6B35;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-weight: 600;
        }
        
        .prose pre {
          background: linear-gradient(135deg, #0A2540, #1A3F5F);
          color: white;
          padding: 1.5rem;
          border-radius: 1rem;
          overflow-x: auto;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .prose pre code {
          background: transparent;
          color: white;
          padding: 0;
        }
      `}</style>

      {/* Footer */}
      <Footer />
    </div>
  );
}


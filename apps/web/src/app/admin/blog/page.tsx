"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileUpload } from "@/components/ui/file-upload";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { apiGet, apiPost, apiPut, apiDelete, API_URL } from "@/lib/api-client";
import { Plus, Edit, Trash2, Eye, Calendar, Clock } from "lucide-react";

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
  status: 'published' | 'draft';
  publishedAt?: string | null;
  readTime: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    coverImage: "",
    category: "",
    tags: [] as string[],
    author: "ASPCI",
    status: "draft" as 'published' | 'draft'
  });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      // Récupérer tous les articles (publié et brouillon) pour l'admin
      const data = await apiGet<BlogArticle[]>("/api/v1/blog");
      setArticles(data);
    } catch (error) {
      console.error("Failed to fetch blog articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = generateSlug(title);

    setFormData(prev => ({
      ...prev,
      title,
      slug
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      coverImage: "",
      category: "",
      tags: [],
      author: "ASPCI",
      status: "draft"
    });
    setTagInput("");
    setEditingArticle(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingArticle) {
        await apiPut(`/api/v1/blog/${editingArticle.id}`, formData);
      } else {
        await apiPost("/api/v1/blog", formData);
      }

      await fetchArticles();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Failed to save blog article:", error);
    }
  };

  const handleEdit = (article: BlogArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      content: article.content,
      excerpt: article.excerpt,
      coverImage: article.coverImage || "",
      category: article.category,
      tags: article.tags,
      author: article.author,
      status: article.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      return;
    }

    try {
      await apiDelete(`/api/v1/blog/${id}`);
      await fetchArticles();
    } catch (error) {
      console.error("Failed to delete blog article:", error);
    }
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion du Blog</h1>
          <p className="text-base text-gray-600 mt-2">Gérer les articles et actualités ASPCI</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Nouvel Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingArticle ? "Modifier l'Article" : "Créer un Article"}
              </DialogTitle>
              <DialogDescription>
                Remplissez les informations de l'article ci-dessous.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt">Résumé (200 caractères max) *</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={200}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.excerpt.length}/200 caractères
                </p>
              </div>

              <div>
                <Label htmlFor="content">Contenu *</Label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                  placeholder="Écrivez votre article ici..."
                />
              </div>

              <FileUpload
                label="Image de couverture"
                currentFileUrl={formData.coverImage}
                onUploadSuccess={(url, fileData) => {
                  setFormData(prev => ({
                    ...prev,
                    coverImage: url
                  }));
                }}
                onUploadError={(error) => {
                  console.error('Upload error:', error);
                }}
                onRemove={() => {
                  setFormData(prev => ({
                    ...prev,
                    coverImage: ""
                  }));
                }}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Catégorie *</Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Ex: Formation, Actualité, Tutoriel"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="author">Auteur</Label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Ajouter un tag et appuyez sur Entrée"
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline">
                    Ajouter
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-blue-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="status">Statut</Label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button type="submit">
                  {editingArticle ? "Modifier" : "Créer"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4 flex-1">
                  {article.coverImage && (
                    <img
                      src={`${API_URL}${article.coverImage}`}
                      alt={article.title}
                      className="w-32 h-24 rounded object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      {article.title}
                      <span className={`text-sm px-2 py-1 rounded ${
                        article.status === 'published' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {article.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(article.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime} min de lecture
                      </span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                        {article.category}
                      </span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/blog/${article.slug}`, '_blank')}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(article)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(article.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {articles.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 mb-4">Aucun article trouvé</p>
              <Button onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Créer le premier article
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}


"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api-client";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

interface Formation {
  id: string;
  title: string;
  slug: string;
  duration: string;
  description: string;
  entity: string;
  objectives?: string | null;
  syllabus?: string | null;
  imageUrl?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminFormationsPage() {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFormation, setEditingFormation] = useState<Formation | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    duration: "",
    description: "",
    entity: "",
    objectives: "",
    syllabus: "",
    isActive: true
  });

  const entities = [
    "CABINET FORMATION ET GESTION EN SECURITE",
    "EXPERTISE EN SURETE MARITIME (CODE ISPS)",
    "ECOLE DE POLICE MUNICIPALE (ENPM)"
  ];

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
      const data = await apiGet<Formation[]>("/api/v1/formations");
      setFormations(data);
    } catch (error) {
      console.warn("Failed to fetch formations:", error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
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

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      duration: "",
      description: "",
      entity: "",
      objectives: "",
      syllabus: "",
      isActive: true
    });
    setEditingFormation(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: entity is required
    if (!formData.entity || formData.entity.trim() === "") {
      alert("Veuillez sélectionner une entité.");
      return;
    }

    try {
      if (editingFormation) {
        await apiPut(`/api/v1/formations/${editingFormation.id}`, formData);
      } else {
        await apiPost("/api/v1/formations", formData);
      }

      await fetchFormations();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.warn("Failed to save formation:", error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const handleEdit = (formation: Formation) => {
    setEditingFormation(formation);
    setFormData({
      title: formation.title,
      slug: formation.slug,
      duration: formation.duration,
      description: formation.description,
      entity: formation.entity,
      objectives: formation.objectives || "",
      syllabus: formation.syllabus || "",
      isActive: formation.isActive
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) {
      return;
    }

    try {
      await apiDelete(`/api/v1/formations/${id}`);
      await fetchFormations();
    } catch (error) {
      console.warn("Failed to delete formation:", error instanceof Error ? error.message : 'Unknown error');
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
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Formations</h1>
          <p className="text-base text-gray-600 mt-2">Gérer les programmes de formation ASPCI</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle Formation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingFormation ? "Modifier la Formation" : "Créer une Formation"}
              </DialogTitle>
              <DialogDescription>
                Remplissez les informations de la formation ci-dessous.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="entity">Entité *</Label>
                <Select
                  value={formData.entity}
                  onValueChange={(value) => handleSelectChange("entity", value)}
                  required
                >
                  <SelectTrigger id="entity">
                    <SelectValue placeholder="Sélectionner une entité" />
                  </SelectTrigger>
                  <SelectContent>
                    {entities.map((entity) => (
                      <SelectItem key={entity} value={entity}>
                        {entity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                <Label htmlFor="duration">Durée *</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="ex: 360h"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="objectives">Objectifs</Label>
                <Textarea
                  id="objectives"
                  name="objectives"
                  value={formData.objectives}
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="syllabus">Programme détaillé</Label>
                <Textarea
                  id="syllabus"
                  name="syllabus"
                  value={formData.syllabus}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Module 1: ...
Module 2: ..."
                />
              </div>


              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="rounded"
                />
                <Label htmlFor="isActive">Formation active</Label>
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
                  {editingFormation ? "Modifier" : "Créer"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {formations.map((formation) => (
          <Card key={formation.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    {formation.title}
                    {!formation.isActive && (
                      <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded">
                        Inactive
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {formation.duration} • {formation.slug}
                    <span className="block text-xs text-gray-500 mt-1">
                      Entité: {formation.entity}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/formation/${formation.slug}`, '_blank')}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(formation)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(formation.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{formation.description}</p>
              {formation.objectives && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">Objectifs:</h4>
                  <p className="text-sm text-gray-600">{formation.objectives}</p>
                </div>
              )}
              <div className="text-sm text-gray-500">
                Créé le {new Date(formation.createdAt).toLocaleDateString('fr-FR')}
              </div>
            </CardContent>
          </Card>
        ))}

        {formations.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 mb-4">Aucune formation trouvée</p>
              <Button onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Créer la première formation
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
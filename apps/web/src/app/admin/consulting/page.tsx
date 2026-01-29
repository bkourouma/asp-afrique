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

interface ConsultingService {
  id: string;
  name: string;
  slug: string;
  description: string;
  entity: string;
  targetSectors?: string | null;
  ctaText?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminConsultingPage() {
  const [services, setServices] = useState<ConsultingService[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<ConsultingService | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    entity: "",
    targetSectors: "",
    ctaText: "",
    isActive: true
  });

  const entities = [
    "CABINET FORMATION ET GESTION EN SECURITE",
    "EXPERTISE EN SURETE MARITIME (CODE ISPS)",
    "ECOLE DE POLICE MUNICIPALE (ENPM)"
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await apiGet<ConsultingService[]>("/api/v1/consulting");
      setServices(data);
    } catch (error) {
      console.warn("Failed to fetch consulting services:", error instanceof Error ? error.message : 'Unknown error');
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

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = generateSlug(name);

    setFormData(prev => ({
      ...prev,
      name,
      slug
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      entity: "",
      targetSectors: "",
      ctaText: "",
      isActive: true
    });
    setEditingService(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingService) {
        await apiPut(`/api/v1/consulting/${editingService.id}`, formData);
      } else {
        await apiPost("/api/v1/consulting", formData);
      }

      await fetchServices();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.warn("Failed to save consulting service:", error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const handleEdit = (service: ConsultingService) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      slug: service.slug,
      description: service.description,
      entity: service.entity,
      targetSectors: service.targetSectors || "",
      ctaText: service.ctaText || "",
      isActive: service.isActive
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce service de consulting ?")) {
      return;
    }

    try {
      await apiDelete(`/api/v1/consulting/${id}`);
      await fetchServices();
    } catch (error) {
      console.warn("Failed to delete consulting service:", error instanceof Error ? error.message : 'Unknown error');
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
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Services de Consulting</h1>
          <p className="text-base text-gray-600 mt-2">Gérer les services de conseil et expertise ASPCI</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingService ? "Modifier le Service" : "Créer un Service"}
              </DialogTitle>
              <DialogDescription>
                Remplissez les informations du service de consulting ci-dessous.
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
                  <Label htmlFor="name">Nom du service *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleNameChange}
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
                <Label htmlFor="targetSectors">Secteurs cibles</Label>
                <Input
                  id="targetSectors"
                  name="targetSectors"
                  value={formData.targetSectors}
                  onChange={handleInputChange}
                  placeholder="ex: Entreprises, Industries, Commerce"
                />
              </div>

              <div>
                <Label htmlFor="ctaText">Texte du CTA</Label>
                <Input
                  id="ctaText"
                  name="ctaText"
                  value={formData.ctaText}
                  onChange={handleInputChange}
                  placeholder="ex: Demander un audit"
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
                <Label htmlFor="isActive">Service actif</Label>
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
                  {editingService ? "Modifier" : "Créer"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    {service.name}
                    {!service.isActive && (
                      <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded">
                        Inactive
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {service.slug}
                    <span className="block text-xs text-gray-500 mt-1">
                      Entité: {service.entity}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/consulting#${service.slug}`, '_blank')}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(service)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{service.description}</p>

              {service.targetSectors && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">Secteurs cibles:</h4>
                  <p className="text-sm text-gray-600">{service.targetSectors}</p>
                </div>
              )}

              {service.ctaText && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">Call-to-action:</h4>
                  <p className="text-sm text-[#cfa34b] font-medium">{service.ctaText}</p>
                </div>
              )}

              <div className="text-sm text-gray-500">
                Créé le {new Date(service.createdAt).toLocaleDateString('fr-FR')}
              </div>
            </CardContent>
          </Card>
        ))}

        {services.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 mb-4">Aucun service de consulting trouvé</p>
              <Button onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Créer le premier service
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
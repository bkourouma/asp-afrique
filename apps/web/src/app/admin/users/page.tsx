"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api-client";
import { Plus, Edit, Trash2, UserPlus } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string | null;
  roles: string[];
  createdAt: string;
  lastLoginAt: string | null;
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    isActive: true
  });

  useEffect(() => {
    // Only fetch users when the session is authenticated
    if (status === "authenticated" && session) {
      console.log('[Users Page] Session authenticated, fetching users...');
      fetchUsers();
    } else if (status === "unauthenticated") {
      console.warn('[Users Page] No authenticated session');
      setLoading(false);
    }
  }, [status, session]);

  const fetchUsers = async () => {
    try {
      const data = await apiGet<User[]>("/api/v1/users");
      setUsers(data);
    } catch (error) {
      console.warn("Failed to fetch users:", error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      email: "",
      name: "",
      password: "",
      isActive: true
    });
    setEditingUser(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.email.trim()) {
      alert("Veuillez saisir un email.");
      return;
    }

    // Password is required for new users
    if (!editingUser && !formData.password) {
      alert("Veuillez saisir un mot de passe pour le nouvel utilisateur.");
      return;
    }

    try {
      if (editingUser) {
        // Update user - only send password if it's provided
        const updateData: any = {
          email: formData.email,
          name: formData.name || null,
          isActive: formData.isActive
        };
        if (formData.password) {
          updateData.password = formData.password;
        }
        await apiPut(`/api/v1/users/${editingUser.id}`, updateData);
      } else {
        // Create user
        await apiPost("/api/v1/users", {
          email: formData.email,
          name: formData.name || null,
          password: formData.password,
          isActive: formData.isActive
        });
      }

      await fetchUsers();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.warn("Failed to save user:", error instanceof Error ? error.message : 'Unknown error');
      alert(`Erreur: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      name: user.name || "",
      password: "", // Don't pre-fill password
      isActive: true // You might want to add isActive to the User interface
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      return;
    }

    try {
      await apiDelete(`/api/v1/users/${id}`);
      await fetchUsers();
    } catch (error) {
      console.warn("Failed to delete user:", error instanceof Error ? error.message : 'Unknown error');
      alert(`Erreur: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
          <p className="text-base text-gray-600 mt-2">Créer et gérer les utilisateurs administrateurs</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Nouvel Utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "Modifier l'Utilisateur" : "Créer un Utilisateur"}
              </DialogTitle>
              <DialogDescription>
                {editingUser 
                  ? "Modifiez les informations de l'utilisateur ci-dessous."
                  : "Remplissez les informations pour créer un nouvel utilisateur administrateur."
                }
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="exemple@aspc-ci.org"
                />
              </div>

              <div>
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nom complet"
                />
              </div>

              <div>
                <Label htmlFor="password">
                  Mot de passe {editingUser ? "(laisser vide pour ne pas modifier)" : "*"}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={!editingUser}
                  placeholder="••••••••"
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
                <Label htmlFor="isActive">Utilisateur actif</Label>
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
                  {editingUser ? "Modifier" : "Créer"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <UserPlus className="h-5 w-5" />
                    {user.name || user.email}
                  </CardTitle>
                  <CardDescription>
                    {user.email}
                    <span className="block text-xs text-gray-500 mt-1">
                      Rôles: {user.roles.join(', ') || 'Aucun'}
                    </span>
                    {user.lastLoginAt && (
                      <span className="block text-xs text-gray-500 mt-1">
                        Dernière connexion: {new Date(user.lastLoginAt).toLocaleDateString('fr-FR')}
                      </span>
                    )}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(user)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500">
                Créé le {new Date(user.createdAt).toLocaleDateString('fr-FR')}
              </div>
            </CardContent>
          </Card>
        ))}

        {users.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 mb-4">Aucun utilisateur trouvé</p>
              <Button onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Créer le premier utilisateur
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

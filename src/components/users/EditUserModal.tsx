import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { User } from '@/types/user';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: User) => void;
  user: User;
}

interface UserFormData {
  email: string;
  nom: string;
  prenom: string;
  role: 'ADMIN' | 'EMPLOYE' | 'CLIENT';
  actif: boolean;
  telephone?: string;
  adresse?: string;
  ville?: string;
  codePostal?: string;
  photo?: string;
  motDePasse?: string;
}

export default function EditUserModal({ isOpen, onClose, onSubmit, user }: EditUserModalProps) {
  const [formData, setFormData] = useState<UserFormData>({
    email: user.email,
    nom: user.nom || '',
    prenom: user.prenom || '',
    role: user.role,
    actif: user.actif,
    telephone: user.telephone || '',
    adresse: user.adresse || '',
    ville: user.ville || '',
    codePostal: user.codePostal || '',
    photo: user.photo || '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setFormData({
      email: user.email,
      nom: user.nom || '',
      prenom: user.prenom || '',
      role: user.role,
      actif: user.actif,
      telephone: user.telephone || '',
      adresse: user.adresse || '',
      ville: user.ville || '',
      codePostal: user.codePostal || '',
      photo: user.photo || '',
    });
  }, [user]);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/users`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          ...formData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();
      onSubmit(updatedUser);
      toast({
        title: "Succès",
        description: "L'utilisateur a été modifié avec succès",
      });
      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour de l'utilisateur",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value as "ADMIN" | "EMPLOYE" | "CLIENT",
    }));
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Modifier l'utilisateur
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                id="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={handleChange}
                className="border-gray-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="motDePasse">
              Mot de passe (laisser vide pour ne pas modifier)
            </Label>
            <Input
              id="motDePasse"
              type="password"
              value={formData.motDePasse || ""}
              onChange={handleChange}
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telephone">Téléphone</Label>
            <Input
              id="telephone"
              type="tel"
              value={formData.telephone}
              onChange={handleChange}
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label>Rôle</Label>
            <Select value={formData.role} onValueChange={handleRoleChange}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Sélectionnez un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Administrateur</SelectItem>
                <SelectItem value="EMPLOYE">Employé</SelectItem>
                <SelectItem value="CLIENT">Client</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="actif"
              checked={formData.actif}
              onCheckedChange={(checked) => setFormData({ ...formData, actif: checked })}
            />
            <Label htmlFor="actif">Compte actif</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adresse">Adresse</Label>
            <Input
              id="adresse"
              value={formData.adresse || ""}
              onChange={handleChange}
              className="border-gray-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ville">Ville</Label>
              <Input
                id="ville"
                value={formData.ville || ""}
                onChange={handleChange}
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codePostal">Code Postal</Label>
              <Input
                id="codePostal"
                value={formData.codePostal || ""}
                onChange={handleChange}
                className="border-gray-300"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-gray-300"
            >
              Annuler
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? 'Modification...' : 'Modifier'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
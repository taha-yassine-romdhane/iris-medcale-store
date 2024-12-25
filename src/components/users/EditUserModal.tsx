import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { User } from '@/types/user';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: User;
}

interface UserFormData {
  email: string;
  nom: string;
  prenom: string;
  role: 'ADMIN' | 'EMPLOYE';
  telephone?: string;
  motDePasse?: string; // Optional for updates
  photo?: File | null;
}

export default function EditUserModal({ isOpen, onClose, onSuccess, user }: EditUserModalProps) {
  const [formData, setFormData] = useState<UserFormData>({
    email: user.email,
    nom: user.nom,
    prenom: user.prenom,
    role: user.role,
    telephone: user.telephone || '',
    photo: null,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Update form data when user prop changes
  useEffect(() => {
    setFormData({
      email: user.email,
      nom: user.nom,
      prenom: user.prenom,
      role: user.role,
      telephone: user.telephone || '',
      photo: null,
    });
  }, [user]);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Create update payload, only including changed fields
    const updatePayload: FormData = new FormData();
    
    // Compare each field with original user data
    if (formData.email !== user.email) updatePayload.append('email', formData.email);
    if (formData.nom !== user.nom) updatePayload.append('nom', formData.nom);
    if (formData.prenom !== user.prenom) updatePayload.append('prenom', formData.prenom);
    if (formData.role !== user.role) updatePayload.append('role', formData.role);
    if (formData.telephone !== user.telephone) updatePayload.append('telephone', formData.telephone || '');
    if (formData.motDePasse) updatePayload.append('motDePasse', formData.motDePasse);
    if (formData.photo) updatePayload.append('photo', formData.photo);

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        body: updatePayload,
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      toast({
        title: "Succès",
        description: "L'utilisateur a été modifié avec succès",
      });
      
      onSuccess();
      handleClose();
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de modifier l'utilisateur",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-md shadow-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Modifier l&apos;utilisateur</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Nouveau mot de passe (laisser vide pour ne pas modifier)
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.motDePasse || ''}
              onChange={(e) => setFormData({...formData, motDePasse: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                required
                value={formData.prenom}
                onChange={(e) => setFormData({...formData, prenom: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                required
                value={formData.nom}
                onChange={(e) => setFormData({...formData, nom: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.telephone || ''}
              onChange={(e) => setFormData({...formData, telephone: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Rôle</Label>
            <Select
              value={formData.role}
              onValueChange={(value: 'ADMIN' | 'EMPLOYE') => 
                setFormData({...formData, role: value})
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EMPLOYE">Employé</SelectItem>
                <SelectItem value="ADMIN">Administrateur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">Photo</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({...formData, photo: e.target.files ? e.target.files[0] : null})}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Modification...' : 'Modifier lutilisateur'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
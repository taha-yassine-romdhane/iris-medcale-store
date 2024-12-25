import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  onSuccess: () => void;
}

export default function DeleteUserModal({ isOpen, onClose, userId, onSuccess }: DeleteUserModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      toast({
        title: "Succès",
        description: "L'utilisateur a été supprimé avec succès",
      });

      onSuccess();
      onClose();
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'utilisateur",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-md shadow-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Supprimer l&apos;utilisateur</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.</p>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Suppression..." : "Supprimer"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
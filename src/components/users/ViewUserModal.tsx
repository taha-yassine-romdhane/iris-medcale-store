import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ViewUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        email: string;
        nom: string;
        prenom: string;
        role: string;
        telephone?: string;
    } | null;
}

export default function ViewUserModal({ isOpen, onClose, user }: ViewUserModalProps) {
    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-md shadow-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Détails de l&apos;utilisateur</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label>Email:</Label>
                        <p className="text-sm text-gray-600">{user.email}</p>
                    </div>

                    <div>
                        <Label>Nom:</Label>
                        <p className="text-sm text-gray-600">{user.nom}</p>
                    </div>

                    <div>
                        <Label>Prénom:</Label>
                        <p className="text-sm text-gray-600">{user.prenom}</p>
                    </div>

                    <div>
                        <Label>Rôle:</Label>
                        <p className="text-sm text-gray-600">{user.role}</p>
                    </div>

                    {user.telephone && (
                        <div>
                            <Label>Téléphone:</Label>
                            <p className="text-sm text-gray-600">{user.telephone}</p>
                        </div>
                    )}
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                    >
                        Fermer
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
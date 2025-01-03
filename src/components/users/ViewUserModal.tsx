import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User } from "@/types/user";
import { format } from "date-fns";
import { fr } from "date-fns/locale";


interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export default function ViewUserModal({ isOpen, onClose, user }: ViewUserModalProps) {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white rounded-lg">
        <DialogHeader className="relative border-b pb-4">
          <DialogTitle className="text-xl font-semibold">
            Détails de l'utilisateur
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* User Header with Photo */}
          <div className="flex items-center mb-6">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
              <span className="text-xl font-medium">
                {user.prenom?.[0]}{user.nom?.[0]}
              </span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">
                {user.prenom} {user.nom}
              </h3>
              <p className="text-sm text-gray-500">ID: {user.id}</p>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <Detail label="Rôle">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.role === "ADMIN"
                    ? "bg-purple-50 text-purple-700"
                    : user.role === "EMPLOYE"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {user.role === "ADMIN"
                  ? "Administrateur"
                  : user.role === "EMPLOYE"
                  ? "Employé"
                  : "Client"}
              </span>
            </Detail>
            <Detail label="Statut">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.actif ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                {user.actif ? "Actif" : "Inactif"}
              </span>
            </Detail>
            <Detail label="Email">{user.email}</Detail>
            <Detail label="Téléphone">{user.telephone || "-"}</Detail>
            <Detail label="Adresse">{user.adresse || "-"}</Detail>
            <Detail label="Ville">{user.ville || "-"}</Detail>
            <Detail label="Code Postal">{user.codePostal || "-"}</Detail>
            <Detail label="Dates">
              <div className="space-y-1">
                <p className="text-sm">
                  Créé le: {format(new Date(user.dateCreation), "dd MMMM yyyy", { locale: fr })}
                </p>
                <p className="text-sm">
                  Mis à jour le: {format(new Date(user.dateMiseAJour), "dd MMMM yyyy", { locale: fr })}
                </p>
              </div>
            </Detail>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-500 mb-1">{label}</h4>
      <div className="text-sm text-gray-900">{children}</div>
    </div>
  );
}

export type RoleUtilisateur = 'ADMIN' | 'EMPLOYE';

export interface User {
  id: string;
  dateCreation: string;
  dateMiseAJour: string;
  email: string;
  motDePasse: string;
  nom: string;
  prenom: string;
  role: RoleUtilisateur;
  actif: boolean;
  telephone?: string;
  photo?: string;
}

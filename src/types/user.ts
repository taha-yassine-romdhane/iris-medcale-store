export interface User {
  id: string;
  dateCreation: string;
  dateMiseAJour: string;
  email: string;
  motDePasse?: string;
  nom: string;
  prenom: string;
  role: RoleUtilisateur;
  adresse?: string;
  ville?: string;
  emailVerified : boolean;
  codePostal?: string;
  actif: boolean;
  telephone?: string;
  photo?: string;
}

export type RoleUtilisateur = 'ADMIN' | 'EMPLOYE' | 'CLIENT';

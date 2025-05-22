import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guide d\'Entretien des Équipements Respiratoires - Elite Médicale',
  description: 'Procédures complètes pour l\'entretien des concentrateurs d\'oxygène et machines CPAP afin d\'assurer longévité et performance optimale.',
  keywords: ['entretien cpap', 'nettoyage concentrateur oxygène', 'maintenance équipement respiratoire', 'remplacement filtres cpap'],
  alternates: {
    canonical: 'https://elitemedicalestore.com/blog/entretien-equipement-respiratoire'
  }
};

export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}

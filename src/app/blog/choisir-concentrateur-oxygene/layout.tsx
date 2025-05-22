import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guide: Choisir un Concentrateur d\'Oxygène - Elite Médicale',
  description: 'Notre guide complet pour sélectionner le concentrateur d\'oxygène adapté à vos besoins médicaux et votre mode de vie.',
  keywords: ['concentrateur oxygène', 'choisir oxygénothérapie', 'équipement respiratoire', 'comparatif concentrateurs'],
  alternates: {
    canonical: 'https://elitemedicalestore.com/blog/choisir-concentrateur-oxygene'
  }
};

export default function OxygenConcentratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}

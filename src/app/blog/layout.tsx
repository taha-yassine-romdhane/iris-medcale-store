import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Elite Médicale Store',
  description: 'Découvrez nos articles sur les équipements médicaux, oxygénothérapie, CPAP et accessoires pour une meilleure santé respiratoire.',
  alternates: {
    canonical: 'https://elitemedicalestore.com/blog'
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {children}
    </div>
  );
}

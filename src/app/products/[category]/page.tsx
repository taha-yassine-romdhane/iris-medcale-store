import { notFound } from 'next/navigation';

interface Props {
  params: {
    category: string;
  };
}

const validCategories = [
  'cpap-ppc',
  'masque',
  'oxygene',
  'bipap-vni',
  'aerosole-therapie',
  'aspirateur-therapie',
  'lit',
];

export default function CategoryPage({ params }: Props) {
  if (!validCategories.includes(params.category)) {
    notFound();
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 text-center capitalize">
        {params.category.replace(/-/g, ' ')}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product list will be populated from database */}
        <div className="text-center p-8">
          Products for this category will be loaded here
        </div>
      </div>
    </div>
  );
}

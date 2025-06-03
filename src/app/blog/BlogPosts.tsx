'use client';
import Link from 'next/link';
import {
  ArrowRight,
} from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string; // Kept in type for data consistency, but not used in render
  date: string; // Kept in type, but not rendered
  category: string;
};

export default function BlogPosts() {
  const { t } = useTranslation(); // Assuming t() is used for future localization

  const posts: BlogPost[] = [
    {
      slug: 'les-solutions-medicales-pour-traiter-les-ronflements',
      title: 'Les différents types d’apnée du sommeil',
      excerpt: 'L\'apnée du sommeil est un phénomène courant qui peut perturber la qualité du sommeil et affecter la santé globale. Il est souvent un signe de troubles respiratoires et peut être associé à...',
      image: '/catalogue photo/ApneesDuSommeil-scaled.jpg',
      date: '21 février 2025',
      category: 'Troubles respiratoires'
    },
    {
      slug: 'comment-loxygenotherapie-peut-aider-les-personnes-souffrant-de-troubles-respiratoires',
      title: 'Comment l\'oxygénothérapie peut aider les personnes souffrant de troubles respiratoires ?',
      excerpt: 'Qu\'est-ce que l\'oxygénothérapie ? L\'oxygénothérapie est une méthode de traitement essentielle pour de nombreux patients souffrant de troubles respiratoires. Cette thérapie consiste en l\'administration d\'oxygène à des patients dont les niveaux d\'oxygène...',
      image: '/catalogue photo/oxygenotherapie-def.jpg',
      date: '18 février 2025',
      category: 'Oxygénothérapie'
    },
    {
      slug: 'quest-ce-quun-trouble-respiratoire',
      title: 'Qu\'est ce qu\'un trouble respiratoire ?',
      excerpt: 'Un trouble respiratoire est une condition médicale qui affecte la respiration normale, souvent entraînant des difficultés à respirer et d\'autres complications de santé. Ces troubles peuvent varier en gravité, allant de...',
      image: '/catalogue photo/troubleres.png',
      date: '14 février 2025',
      category: 'Santé respiratoire'
    },
    {
      slug: 'bpco',
      title: 'La ventilation non invasive',
      excerpt: 'La ventilation non invasive est une thérapie qui aide les patients à respirer correctement et à maintenir un niveau d\'oxygène sain. Elle est utilisée pour traiter diverses conditions respiratoires chroniques...',
      image: '/catalogue photo/Capture d\'écran 2025-06-02 155021.png',
      date: '02 novembre 2022',
      category: 'Problemes VNI'
    },
    {
      slug: 'saos-symptomes-causes-et-traitements',
      title: 'SAOS : symptômes, causes et traitements',
      excerpt: 'Le syndrome d\'apnées obstructives du sommeil (SAOS) compte parmi les troubles respiratoires...',
      image: '/catalogue photo/Formation-Syndrome-dapnee-obstructive-du-sommeil-SAOS-et-ATM.png',
      date: '06 septembre 2022',
      category: 'probleme cpap'
    },
    {
      slug: 'oxygen',
      title: 'Concentrateur d\'oxygène : indications et pathologies',
      excerpt: 'Le concentrateur d\'oxygène est un équipement médical qui permet de fournir de l\'oxygène à des patients souffrant de troubles respiratoires chroniques...',
      image: '/catalogue photo/Formation-Syndrome-dapnee-obstructive-du-sommeil-SAOS-et-ATM.png',
      date: '20 décembre 2023',
      category: 'problem o²'
    },
    {
      slug: 'solution-vni',
      title: 'Nos meilleurs Solutions pour la VNI',
      excerpt: 'Découvrez nos meilleurs produits pour traiter l\'apnée du sommeil et le ronflement.',
      image: '/catalogue photo/Capture d\'écran 2025-05-29 120036.png',
      date: '05 octobre 2022',
      category: 'Solutions VNI'
    },
    {
      slug: 'solution-cpap',
      title: 'Nos meilleurs Solutions pour la CPAP',
      excerpt: 'Découvrez nos meilleurs produits pour traiter l\'apnée du sommeil et le ronflement.',
      image: '/catalogue photo/Capture d\'écran 2025-05-29 120036.png',
      date: '05 octobre 2022',
      category: 'Solution CPAP'
    },
    {
      slug: 'solution-oxygen',
      title: 'Nos meilleurs Solutions pour l\'oxygénothérapie',
      excerpt: 'Découvrez nos meilleurs produits pour traiter l\'apnée du sommeil et le ronflement.',
      image: '/catalogue photo/Capture d\'écran 2025-05-29 120036.png',
      date: '05 octobre 2022',
      category: 'Solution O²'
    }
  ];

  return (
    <section aria-labelledby="blog-heading" className="relative py-16 "> {/* Adjusted padding and bg */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center md:text-left mb-16"> {/* Centered on mobile, left on md+ */}
          <h1 id="blog-heading" className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">
            Toutes nos actualités
          </h1>
          <p className="text-xl text-blue-700"> {/* Adjusted text color for better contrast */}
            Ici vous trouverez des articles sur les troubles respiratoires et les solutions pour les traiter.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden border border-slate-200"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="flex flex-col h-full"
                aria-label={`Lire l'article: ${post.title}`}
              >
                {/* Card Header */}
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="px-6 py-5 flex-grow">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-4 leading-relaxed"> {/* Increased line-clamp for excerpt */}
                    {post.excerpt}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 border-t border-slate-200 mt-auto bg-white"> {/* Added bg-white for consistency if needed */}
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-200">
                    <span className="mr-2 text-sm">Lire la suite</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 duration-200" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
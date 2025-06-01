'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
} from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
};

export default function BlogPosts() {
  const { t } = useTranslation();

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
      slug: 'les-ppc-cpap-de-voyage',
      title: 'Les PPC / CPAP DE VOYAGE',
      excerpt: 'Vous partez en vacances, et vous n\'avez pas envie d\'emporter...',
      image: '/catalogue photo/cpap yuwell YH-680.jpg',
      date: '02 novembre 2022',
      category: 'Équipement'
    },
    {
      slug: 'saos-symptomes-causes-et-traitements',
      title: 'SAOS : symptômes, causes et traitements',
      excerpt: 'Le syndrome d\'apnées obstructives du sommeil (SAOS) compte parmi les troubles respiratoires...',
      image: '/catalogue photo/Formation-Syndrome-dapnee-obstructive-du-sommeil-SAOS-et-ATM.png',
      date: '06 septembre 2022',
      category: 'SAOS'
    },
    {
      slug: 'nos-meilleurs-produits',
      title: 'Nos meilleurs Solutions',
      excerpt: 'Découvrez nos meilleurs produits pour traiter l\'apnée du sommeil et le ronflement.',
      image: '/catalogue photo/Capture d\'écran 2025-05-29 120036.png',
      date: '05 octobre 2022',
      category: 'Apnée du sommeil'
    }
  ];

  return (
    <section aria-labelledby="blog-heading" className="relative py-12 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-left mb-12">
          <h1 id="blog-heading" className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
          Toutes nos actualités
          </h1>


          <h2 className="text-xl  text-blue-800 mb-6">
            Ici vous trouverez des articles sur les troubles respiratoires et les solutions pour les traiter.
          </h2>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="group bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block h-full"
                aria-label={`Lire l'article: ${post.title}`}
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>


                {/* Content Section */}
                <div className="px-6 py-4">
                  <h2 className="text-lg font-bold text-blue-600 mb-3 line-clamp-2 group-hover:text-blue-800 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center text-blue-500 font-medium group-hover:text-blue-700 transition-colors">
                    <span className="mr-2">Lire la suite</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
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
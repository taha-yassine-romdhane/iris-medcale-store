'use client';
import Link from 'next/link';
import { 
  Puzzle, 
  Filter, 
  BookOpen, 
  Stethoscope, 
  Bed,
  ArrowRight
} from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  icon: React.ReactNode;
  color: string;
  date: string;
  readTime: string;
};

export default function BlogPosts() {
  const { t } = useTranslation();
  
  const posts: BlogPost[] = [
    {
      slug: 'oxygenotherapie-cpap',
      title: t('blog.posts.oxygenTherapy.title'),
      excerpt: t('blog.posts.oxygenTherapy.excerpt'),
      icon: <Bed size={48} aria-hidden="true" />,
      color: 'blue',
      date: '2025-05-15',
      readTime: t('common.readTime')
    },
    {
      slug: 'choisir-concentrateur-oxygene',
      title: t('blog.posts.oxygenConcentrator.title'),
      excerpt: t('blog.posts.oxygenConcentrator.excerpt'),
      icon: <Puzzle size={48} aria-hidden="true" />,
      color: 'blue',
      date: '2025-05-10',
      readTime: t('common.readTime')
    },
    {
      slug: 'entretien-equipement-respiratoire',
      title: t('blog.posts.respiratoryEquipment.title'),
      excerpt: t('blog.posts.respiratoryEquipment.excerpt'),
      icon: <Filter size={48} aria-hidden="true" />,
      color: 'blue',
      date: '2025-05-01',
      readTime: t('common.readTime')
    },
    {
      slug: 'avantages-therapie-respiratoire',
      title: t('blog.posts.respiratoryTherapy.title'),
      excerpt: t('blog.posts.respiratoryTherapy.excerpt'),
      icon: <Stethoscope size={48} aria-hidden="true" />,
      color: 'blue',
      date: '2025-05-20',
      readTime: t('common.readTime')
    }
  ];

  return (
    <section aria-labelledby="blog-heading" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 id="blog-heading" className="text-4xl text-center font-bold text-blue-800 mb-8">
          {t('blog.title')}
        </h1>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <article 
              key={post.slug} 
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 flex flex-col h-full"
            >
              <Link 
                href={`/blog/${post.slug}`} 
                className="flex flex-col h-full"
                aria-label={`Lire l'article: ${post.title}`}
              >
                <div className={`bg-${post.color}-50 p-6 flex justify-center items-center group-hover:bg-${post.color}-100 transition-colors duration-300`}>
                  <div className={`text-${post.color}-500 transition-transform duration-300 group-hover:scale-110`}>
                    {post.icon}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold text-blue-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <time 
                      dateTime={post.date} 
                      className="text-sm text-gray-500"
                    >
                      {new Date(post.date).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </time>
                    <div className="flex items-center text-blue-600 group-hover:text-blue-800 transition-colors">
                      <span className="text-sm font-medium mr-1">
                        {t('common.readArticle')}
                      </span>
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
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
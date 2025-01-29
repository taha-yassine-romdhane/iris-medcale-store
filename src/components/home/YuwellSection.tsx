import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const products = [
  {
    name: "CPAP Auto-Pilotée YH-680",
    image: "/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/1)CPAP AUTO-PILOTEE/CPAP AUTO PILOTEE YUWELL/cpap yuwell YH-680.jpg",
    category: "CPAP Machines",
    description: "Système avancé de traitement de l'apnée du sommeil avec ajustement automatique de la pression"
  },
  {
    name: "CPAP Auto-Pilotée YH-450",
    image: "/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/1)CPAP AUTO-PILOTEE/CPAP AUTO PILOTEE YUWELL/cpap yuwell YH-450.jpg",
    category: "CPAP Machines",
    description: "Solution compacte et performante pour un sommeil réparateur"
  },
  {
    name: "Concentrateur d'Oxygène 8F-10",
    image: "/SITE DE VENTE ET LOCATION 1/3)OXYGENE/CONCENTRATEUR D'OXYGENE/OXYGENE YUWELL/concentrateur d'oxygene 8F-10.jpg",
    category: "Concentrateurs d'Oxygène",
    description: "Haute performance avec un débit d'oxygène optimal"
  },
  {
    name: "Concentrateur d'Oxygène 8F-5A",
    image: "/SITE DE VENTE ET LOCATION 1/3)OXYGENE/CONCENTRATEUR D'OXYGENE/OXYGENE YUWELL/concentrateur d'oxygene 8F-5A.jpg",
    category: "Concentrateurs d'Oxygène",
    description: "Design compact avec technologie de pointe"
  }
];

export function YuwellSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section className="py-20 bg-white min-h-screen relative overflow-hidden">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-blue-100 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Partnership Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-20">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Partenariat avec Yuwell</h2>
            <p className="text-gray-600 mb-6">
              Nous sommes fiers de notre partenariat avec Yuwell, un leader mondial dans la fabrication d'équipements médicaux de haute qualité. Yuwell est reconnu pour son innovation et son engagement envers la santé et le bien-être des patients. Ensemble, nous nous engageons à fournir des solutions de santé fiables et efficaces pour améliorer la qualité de vie de nos clients.
            </p>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <Image
              src="/brands/Yuwell.png"
              alt="Yuwell Logo"
              width={200}
              height={100}
              className="object-contain"
            />
          </div>
        </div>

        {/* 3D Product Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {products.map((product , index ) => (
            <motion.div
              key={index}
              className="relative group perspective"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setSelectedProduct(product)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 ease-out"
                animate={{
                  rotateY: hoveredIndex === index ? 15 : 0,
                  rotateX: hoveredIndex === index ? -10 : 0,
                  z: hoveredIndex === index ? 50 : 0,
                }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Product Image Container */}
                <div className="relative h-48 bg-gradient-to-br from-blue-50 to-white p-4">
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                    />
                  </motion.div>
                </div>

                {/* Product Info */}
                <motion.div 
                  className="p-4 bg-white"
                  animate={{
                    backgroundColor: hoveredIndex === index ? '#f8fafc' : '#ffffff'
                  }}
                >
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-2">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  
                  <motion.button
                    className="group inline-flex items-center space-x-2 text-blue-600 font-medium"
                    whileHover={{ x: 10 }}
                  >
                    <span>Découvrir</span>
                    <motion.svg 
                      className="w-4 h-4"
                      animate={{ x: hoveredIndex === index ? 10 : 0 }}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </motion.svg>
                  </motion.button>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -right-4 -top-4 w-16 h-16 bg-blue-500 rounded-full opacity-10"
                  animate={{
                    scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Product Modal */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-96 mb-6">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold mb-4">{selectedProduct.name}</h2>
            <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setSelectedProduct(null)}
            >
              Fermer
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
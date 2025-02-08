import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sun, Moon, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import { heroConfig } from './config';

const kitchens = [
  { 
    id: 1,
    image: "/C1.jpg",
    title: "Cuisine moderne élégante",
    description: "Une cuisine spacieuse au design contemporain, avec des meubles blancs laqués, un plan de travail en granit noir et un éclairage LED subtil."
  },
  {
    id: 2,
    image: "/C2.jpg",
    title: "Cuisine bois et noir",
    description: "Une cuisine chaleureuse et moderne, combinant des finitions en bois naturel, un plan de travail en granit noir et un éclairage suspendu élégant."
  },
  {
    id: 3,
    image: "/C3.jpg",
    title: "Cuisine classique cosy",
    description: "Une cuisine lumineuse et accueillante, avec des meubles blancs, une touche de décoration chaleureuse et un coin repas convivial pour partager de bons moments."
  },
  {
    id: 4,
    image: "/C4.jpg",
    title: "Cuisine moderne épurée",
    description: "Une cuisine minimaliste et élégante, avec des tons bois et noir mat et un îlot central pratique pour un espace fonctionnel et harmonieux."
  }
];

function AnimatedTitle({ children }: { children: string }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <h2 ref={ref} className="section-title">
      {children.split('').map((letter, index) => (
        <motion.span
          key={index}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={inView ? { rotateY: 0, opacity: 1 } : {}}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          style={{ display: 'inline-block' }}
        >
          {letter}
        </motion.span>
      ))}
    </h2>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ['0%', '30%']);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [darkMode]);

  const navLinks = ['Accueil', 'Nos Créations', 'Contact'];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className={`fixed w-full transition-all duration-300 z-50 ${isScrolled ? 'header-scroll' : ''}`}>
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex-1">
              <img 
                src="/Logo.png" 
                alt="Couzinet" 
                className="h-[45px] object-contain mx-auto"
              />
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="nav-link dark:text-white">
                  {link}
                </a>
              ))}
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="parallax-bg"
          style={{ y: backgroundY }}
        >
          <img
            src={heroConfig.backgroundImage}
            alt="Hero Kitchen"
            loading="eager"
            fetchpriority="high"
          />
        </motion.div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center z-10">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-4 text-white"
            >
              {heroConfig.title}
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl mb-8 text-white max-w-2xl mx-auto"
            >
              {heroConfig.description}
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all duration-300"
            >
              {heroConfig.buttonText}
            </motion.button>
          </div>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white z-10"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Our Creations */}
      <section className="py-20 px-4" id="nos-créations">
        <div className="container mx-auto">
          <AnimatedTitle>Nos Créations</AnimatedTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {kitchens.map((kitchen) => (
              <motion.div
                key={kitchen.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="kitchen-card"
              >
                <img src={kitchen.image} alt={kitchen.title} />
                <div className="kitchen-overlay">
                  <h3 className="text-xl font-bold">{kitchen.title}</h3>
                  <p>{kitchen.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-20 px-4" id="contact">
        <div className="container mx-auto">
          <AnimatedTitle>Contactez-nous</AnimatedTitle>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center space-x-4"
                >
                  <Phone className="w-6 h-6 text-primary" />
                  <span className="dark:text-gray-300">+33 1 23 45 67 89</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <Mail className="w-6 h-6 text-primary" />
                  <span className="dark:text-gray-300">contact@couzinet.fr</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center space-x-4"
                >
                  <MapPin className="w-6 h-6 text-primary" />
                  <span className="dark:text-gray-300">123 Avenue des Cuisines, Paris</span>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4">Demander un devis</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all duration-300"
                >
                  Nous contacter
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 SARL Couzinet. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
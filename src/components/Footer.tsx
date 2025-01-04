import Link from "next/link";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Send, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 border-b-2 border-red-500 pb-2">
              Elite Medicale Service
            </h3>
            <p className="text-blue-100 leading-relaxed">
              Votre source de confiance pour les équipements médicaux et les solutions de santé innovantes.
            </p>
            <div className="flex space-x-4 pt-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 transition-colors">
                <Facebook size={24} />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 transition-colors">
                <Twitter size={24} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 transition-colors">
                <Linkedin size={24} />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 transition-colors">
                <Instagram size={24} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 border-b-2 border-red-500 pb-2">
              Liens Rapides
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/categories/cpap/machines" 
                  className="text-blue-100 hover:text-white hover:pl-2 transition-all duration-300"
                >
                  CPAP Machines
                </Link>
              </li>
              <li>
                <Link 
                  href="/a-propos" 
                  className="text-blue-100 hover:text-white hover:pl-2 transition-all duration-300"
                >
                  À Propos
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-blue-100 hover:text-white hover:pl-2 transition-all duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/apnee-du-sommeil" 
                  className="text-blue-100 hover:text-white hover:pl-2 transition-all duration-300"
                >
                  Apnée du Sommeil
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 border-b-2 border-red-500 pb-2">
              Contactez-Nous
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-blue-100">
                <Mail className="mr-3 text-red-500" size={20} />
                <Link href="mailto:eliteMedicaleServices@Gmail.com" className="hover:text-white transition-colors">
                  eliteMedicaleServices@Gmail.com
                </Link>
              </li>
              <li className="flex items-center text-blue-100">
                <Phone className="mr-3 text-red-500" size={20} />
                <Link href="tel:+21655820000" className="hover:text-white transition-colors">
                  (+216) 55 820 000
                </Link>
              </li>
              <li className="flex items-center text-blue-100">
                <MapPin className="mr-3 text-red-500" size={20} />
                <Link href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  O Medicale Store M&#39;saken
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 border-b-2 border-red-600 pb-2">
              Newsletter
            </h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-2 rounded bg-blue-800 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <button
                type="submit"
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors flex items-center justify-center"
              >
                <Send className="mr-2" size={20} />
                S&#39;abonner
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-500 mt-12 pt-8 text-center">
          <p className="text-blue-200">
            &copy; 2024 Elite Medicale Service. Tous droits r&#233;serv&#233;s.
          </p>
        </div>
      </div>
    </footer>
  );
}
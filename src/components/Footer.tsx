'use client';

import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Locate, // Icône pour les zones de couverture
} from "lucide-react";
import { useTranslation } from "@/context/TranslationContext";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 border-b-2 border-red-500 pb-2">
              {t('footer.companyName')}
            </h3>
            <p className="text-blue-100 leading-relaxed">
              {t('footer.description')}
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
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/categories/cpap/machines"
                  className="text-blue-100 hover:text-white hover:pl-2 transition-all duration-300"
                >
                  {t('footer.cpapMachines')}
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="text-blue-100 hover:text-white hover:pl-2 transition-all duration-300"
                >
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-blue-100 hover:text-white hover:pl-2 transition-all duration-300"
                >
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link
                  href="/apnee-du-sommeil"
                  className="text-blue-100 hover:text-white hover:pl-2 transition-all duration-300"
                >
                  {t('footer.sleepApnea')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 border-b-2 border-red-500 pb-2">
              {t('footer.contactUs')}
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
                  011 Rue tayeb el hedi 4070 M&#39;saken
                </Link>
              </li>
            </ul>
          </div>

          {/* Coverage Areas */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 border-b-2 border-red-500 pb-2">
              {t('footer.coverageAreas')}
            </h3>
            <div className="space-y-4">
              {/* North Region */}
              <div>
                <div className="flex items-center space-x-2">
                  <Locate className="text-red-500" size={20} />
                  <h4 className="font-semibold text-white">{t('footer.northRegion')}</h4>
                </div>
                <ul className="mt-2 pl-7 space-y-2 text-blue-100">
                  <li>{t('footer.grandTunis')}</li>
                  <li>{t('footer.capBon')}</li>
                </ul>
              </div>

              {/* Center Region */}
              <div>
                <div className="flex items-center space-x-2">
                  <Locate className="text-red-500" size={20} />
                  <h4 className="font-semibold text-white">{t('footer.centerRegion')}</h4>
                </div>
                <ul className="mt-2 pl-7 space-y-2 text-blue-100">
                  <li>{t('footer.sousse')}</li>
                  <li>{t('footer.monastir')}</li>
                  <li>{t('footer.mahdia')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-500 mt-12 pt-8 text-center">
          <p className="text-blue-200">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
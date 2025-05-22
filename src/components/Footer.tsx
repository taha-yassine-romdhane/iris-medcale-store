'use client';

import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Locate, // Icône pour les zones de couverture
} from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";


export default function Footer() {
  const { t } = useTranslation();

  // Define regions data structure
  const regions = {
    north: [
      "grandTunis",
      "capBon",
      "bizerte",
      "beja",
    ],
    center: [
      "sousse",
      "monastir",
      "mahdia",
      "kairouan",
      "sfax",
      "gafsa"
    ]
  };

  return (
    <footer className="bg-blue-50 text-gray-700 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Company Description */}
        <div>
          <h3 className="text-lg font-semibold text-blue-800 mb-4 pb-2 border-b border-gray-200">
            {t('footer.companyName')}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {t('footer.description')}
          </p>
          <div className="flex space-x-4 pt-4 justify-start">
            <Link href="https://www.facebook.com/share/15zdLven1F/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
              <Facebook size={18} />
              <span className="ml-2">Facebook</span>
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-blue-800 mb-4 pb-2 border-b border-gray-200">
            {t('footer.quickLinks')}
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/services" className="text-gray-600 hover:text-blue-600 hover:pl-2 transition-all duration-300">
                {t('footer.cpapMachines')}
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="text-gray-600 hover:text-blue-600 hover:pl-2 transition-all duration-300">
                {t('footer.aboutUs')}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 hover:pl-2 transition-all duration-300">
                {t('footer.contact')}
              </Link>
            </li>
            <li>
              <Link href="/apnee-du-sommeil" className="text-gray-600 hover:text-blue-600 hover:pl-2 transition-all duration-300">
                {t('footer.sleepApnea')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-blue-800 mb-4 pb-2 border-b border-gray-200">
            {t('footer.contactUs')}
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-600">
              <Mail className="mr-3 text-blue-500" size={18} />
              <Link href="mailto:contact@elitemedicaleservices.tn" className="hover:text-blue-600 transition-colors">
                contact@elitemedicaleservices.tn
              </Link>
            </li>
            <li className="flex items-center text-gray-600">
              <Phone className="mr-3 text-blue-500" size={18} />
              <Link href="tel:+21655820000" className="hover:text-blue-600 transition-colors">
                (+216) 55 820 000
              </Link>
            </li>
            <li className="flex items-center text-gray-600">
              <MapPin className="mr-3 text-blue-500" size={18} />
              <Link href="https://www.google.com/maps/place/Elite+medicale+services/@35.7348885,10.5760534,1049m/data=!3m1!1e3!4m6!3m5!1s0x12fdf50006296803:0x58c40e5f3c989eec!8m2!3d35.734867!4d10.5740649!16s%2Fg%2F11ly_7f5t1?entry=ttu&g_ep=EgoyMDI1MDIwNS4xIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                11 RUE TAIEB MHIRI 4070 MSAKEN SOUSSE
              </Link>
            </li>
          </ul>
        </div>

        {/* Coverage Areas - Split into two columns */}
        <div>
          <h3 className="text-lg font-semibold text-blue-800 mb-4 pb-2 border-b border-gray-200">
            {t('footer.coverageAreas')}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {/* North Region */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Locate className="text-blue-500" size={18} />
                <h4 className="font-semibold text-gray-800">{t('footer.northRegion')}</h4>
              </div>
              <ul className="space-y-2 text-gray-600 text-sm">
                {regions.north.map((region, index) => (
                  <li key={index} className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span>{t(`footer.${region}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Center Region */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Locate className="text-blue-500" size={18} />
                <h4 className="font-semibold text-gray-800">{t('footer.centerRegion')}</h4>
              </div>
              <ul className="space-y-2 text-gray-600 text-sm">
                {regions.center.map((region, index) => (
                  <li key={index} className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span>{t(`footer.${region}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          &copy;  {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}
'use client';

import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Locate,
} from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";


export default function Footer() {
  const { t } = useTranslation();

  // Define regions data structure
  const regions = {
    north: [
      "capBon",
      "zaghouen",
    ],
    center: [
      "sousse",
      "monastir",
      "mehdia",
      "kairouan",
      "sidiBouzid",
    ],
    south: [
      "gafsa",
      "kasserine",
      "touzeur",
      "mednin",
      "jerba",
      "gabes"
    ]
  };

  return (
    <footer className="bg-gray-50 text-gray-700 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t('footer.companyName')}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">
              {t('footer.description')}
            </p>
            <div className="pt-2">
              <Link 
                href="https://www.facebook.com/IrisMedTn" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                <Facebook size={16} />
                <span>Facebook</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t('footer.quickLinks')}
              </h3>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                  {t('footer.cpapMachines')}
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link href="/apnee-du-sommeil" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                  {t('footer.sleepApnea')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t('footer.contactUs')}
              </h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="text-emerald-600 flex-shrink-0 mt-0.5" size={16} />
                <Link href="mailto:contact@iris-med.tn" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                  contact@iris-med.tn
                </Link>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-emerald-600 flex-shrink-0 mt-0.5" size={16} />
                <div className="space-y-1">
                  <Link href="tel:+21673820320" className="block text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                    (+216) 73 820 320
                  </Link>
                  <Link href="tel:+21693945107" className="block text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                    (+216) 93 945 107
                  </Link>
                  <Link href="tel:+21693945118" className="block text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                    (+216) 93 945 118
                  </Link>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-emerald-600 flex-shrink-0 mt-0.5" size={16} />
                <Link 
                  href="https://www.google.com/maps/place/St%C3%A9+Iris+Medical/@35.8347887,10.593591,358m/data=!3m1!1e3!4m14!1m7!3m6!1s0x1302754069145861:0x50714f144aecddc!2sSt%C3%A9+Iris+Medical!8m2!3d35.8351655!4d10.5950461!16s%2Fg%2F11c6sr1tmq!3m5!1s0x1302754069145861:0x50714f144aecddc!8m2!3d35.8351655!4d10.5950461!16s%2Fg%2F11c6sr1tmq?hl=fr&entry=ttu&g_ep=EgoyMDI1MDYxNy4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors text-sm"
                >
                  Rue Yasser Arafet Immeuble Mahdi appartement 201 4054, Sousse
                </Link>
              </li>
            </ul>
          </div>

          {/* Coverage Areas */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t('footer.coverageAreas')}
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {/* North Region */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Locate className="text-emerald-600" size={14} />
                  <h4 className="font-medium text-gray-800 text-sm">{t('footer.northRegion')}</h4>
                </div>
                <ul className="space-y-1 text-gray-600 text-xs pl-5">
                  {regions.north.map((region, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-emerald-500 rounded-full flex-shrink-0"></span>
                      <span>{t(`footer.${region}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Center Region */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Locate className="text-emerald-600" size={14} />
                  <h4 className="font-medium text-gray-800 text-sm">{t('footer.centerRegion')}</h4>
                </div>
                <ul className="space-y-1 text-gray-600 text-xs pl-5">
                  {regions.center.map((region, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-emerald-500 rounded-full flex-shrink-0"></span>
                      <span>{t(`footer.${region}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* South Region */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Locate className="text-emerald-600" size={14} />
                  <h4 className="font-medium text-gray-800 text-sm">{t('footer.southRegion')}</h4>
                </div>
                <ul className="space-y-1 text-gray-600 text-xs pl-5">
                  {regions.south.map((region, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-emerald-500 rounded-full flex-shrink-0"></span>
                      <span>{t(`footer.${region}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-xs">
            &copy; {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
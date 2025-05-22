import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Guide Complet sur l\'Oxygénothérapie et les Machines CPAP',
    description: 'Tout ce que vous devez savoir sur l\'oxygénothérapie, les machines CPAP et leurs accessoires pour améliorer votre santé respiratoire.',
    keywords: ['oxygénothérapie', 'CPAP', 'machine respiratoire', 'santé pulmonaire', 'apnée du sommeil'],
    alternates: {
        canonical: 'https://elitemedicalestore.com/blog/oxygenotherapie-cpap'
    }
};

export default function OxygenTherapyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
'use client';

export default function HeroSection() {

  return (
    <section className="relative w-full overflow-hidden mb-2 sm:mb-8">
      {/* Video for Desktop and Mobile */}
      <div className="w-full">
        {/* Desktop Video */}
        <video
          className="hidden sm:block w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/hero section/Hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Mobile Video */}
        <video
          className="block sm:hidden w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/hero section/HeroMobile.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
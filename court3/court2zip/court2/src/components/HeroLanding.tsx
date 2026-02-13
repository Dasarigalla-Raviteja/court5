import scalesHeroImg from "@/assets/scales-hero.png";

interface HeroLandingProps {
  onEnter: () => void;
}

const HeroLanding = ({ onEnter }: HeroLandingProps) => {
  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-between cursor-pointer relative overflow-hidden"
      onClick={onEnter}
    >
      {/* Background Image - Full Screen */}
      <img 
        src={scalesHeroImg}
        alt="Scales of Justice"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      
      {/* Dark background fallback */}
      <div className="absolute inset-0 -z-10 bg-[#1a1208]" />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Top Text */}
      <div className="relative z-10 pt-16 text-center">
        <p className="text-white/80 text-sm md:text-base tracking-[0.4em] uppercase font-light">
          A Judicial Monitoring Platform
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Access Badge */}
      <div className="relative z-10 pb-12 text-center">
        <div className="inline-block px-12 py-4 border border-[#c9a954]/60 bg-black/40 backdrop-blur-sm">
          <p className="text-[#c9a954]/80 text-xs tracking-[0.3em] uppercase mb-1">
            Click to Enter
          </p>
          <h2 className="text-[#c9a954] text-2xl md:text-3xl tracking-[0.2em] uppercase font-semibold">
            Access System
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HeroLanding;

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface BrokenClockProps {
  scrollProgress?: number;
}

const BrokenClock = ({ scrollProgress = 0 }: BrokenClockProps) => {
  const hourRotation = useTransform(() => -30 + scrollProgress * 30);
  const minuteRotation = useTransform(() => -6 + scrollProgress * 6);
  const clockOpacity = useTransform(() => 0.6 + scrollProgress * 0.4);
  const crackOpacity = useTransform(() => 1 - scrollProgress);

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96">
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, hsl(43 52% 59% / ${0.1 + scrollProgress * 0.1}) 0%, transparent 70%)`,
        }}
      />

      {/* Clock face */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ filter: `drop-shadow(0 0 30px hsl(43 52% 59% / 0.2))` }}
      >
        {/* Outer ring */}
        <motion.circle
          cx="100"
          cy="100"
          r="95"
          fill="none"
          stroke="hsl(43 52% 59%)"
          strokeWidth="2"
          style={{ opacity: clockOpacity }}
        />
        
        {/* Inner ring */}
        <motion.circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="hsl(43 52% 59% / 0.3)"
          strokeWidth="1"
          style={{ opacity: clockOpacity }}
        />

        {/* Clock face background */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="hsl(222 40% 10% / 0.8)"
        />

        {/* Hour markers */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x1 = 100 + 70 * Math.cos(angle);
          const y1 = 100 + 70 * Math.sin(angle);
          const x2 = 100 + 78 * Math.cos(angle);
          const y2 = 100 + 78 * Math.sin(angle);
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="hsl(43 52% 59%)"
              strokeWidth={i % 3 === 0 ? 3 : 1.5}
              style={{ opacity: clockOpacity }}
            />
          );
        })}

        {/* Roman numerals for key hours */}
        <motion.text x="100" y="35" textAnchor="middle" fill="hsl(43 52% 59%)" fontSize="12" fontFamily="Playfair Display" style={{ opacity: clockOpacity }}>XII</motion.text>
        <motion.text x="165" y="105" textAnchor="middle" fill="hsl(43 52% 59%)" fontSize="12" fontFamily="Playfair Display" style={{ opacity: clockOpacity }}>III</motion.text>
        <motion.text x="100" y="175" textAnchor="middle" fill="hsl(43 52% 59%)" fontSize="12" fontFamily="Playfair Display" style={{ opacity: clockOpacity }}>VI</motion.text>
        <motion.text x="35" y="105" textAnchor="middle" fill="hsl(43 52% 59%)" fontSize="12" fontFamily="Playfair Display" style={{ opacity: clockOpacity }}>IX</motion.text>

        {/* Crack lines (fade out as clock repairs) */}
        <motion.g style={{ opacity: crackOpacity }}>
          <line x1="100" y1="100" x2="130" y2="50" stroke="hsl(43 52% 59% / 0.4)" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="100" y1="100" x2="60" y2="140" stroke="hsl(43 52% 59% / 0.3)" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="100" y1="100" x2="150" y2="120" stroke="hsl(43 52% 59% / 0.2)" strokeWidth="1" strokeDasharray="2,4" />
        </motion.g>

        {/* Hour hand - stuck near 12, repairs with scroll */}
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="55"
          stroke="hsl(43 52% 59%)"
          strokeWidth="4"
          strokeLinecap="round"
          style={{
            transformOrigin: "100px 100px",
            rotate: hourRotation,
            opacity: clockOpacity,
          }}
        />

        {/* Minute hand - stuck near 12, repairs with scroll */}
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="35"
          stroke="hsl(43 52% 59%)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            transformOrigin: "100px 100px",
            rotate: minuteRotation,
            opacity: clockOpacity,
          }}
        />

        {/* Center cap */}
        <circle cx="100" cy="100" r="6" fill="hsl(43 52% 59%)" />
        <circle cx="100" cy="100" r="3" fill="hsl(222 47% 7%)" />
      </svg>

      {/* Subtle pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-full border border-primary/10"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default BrokenClock;

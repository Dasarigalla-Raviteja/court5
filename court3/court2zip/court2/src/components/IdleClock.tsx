import { motion } from "framer-motion";

interface IdleClockProps {
  isActivating?: boolean;
}

const IdleClock = ({ isActivating = false }: IdleClockProps) => {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
      {/* Breathing glow - very slow, subtle */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isActivating
            ? [
                "0 0 60px hsl(43 52% 59% / 0.2)",
                "0 0 120px hsl(43 52% 59% / 0.4)",
              ]
            : [
                "0 0 40px hsl(43 52% 59% / 0.08)",
                "0 0 80px hsl(43 52% 59% / 0.15)",
                "0 0 40px hsl(43 52% 59% / 0.08)",
              ],
        }}
        transition={{
          duration: isActivating ? 1 : 6,
          repeat: isActivating ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Clock face */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 0 40px hsl(43 52% 59% / 0.15))" }}
      >
        {/* Outer ring */}
        <circle
          cx="100"
          cy="100"
          r="95"
          fill="none"
          stroke="hsl(43 52% 59%)"
          strokeWidth="1.5"
          opacity="0.8"
        />

        {/* Inner decorative ring */}
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="hsl(43 52% 59% / 0.2)"
          strokeWidth="0.5"
        />

        {/* Clock face background */}
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="hsl(222 47% 5% / 0.9)"
        />

        {/* Hour markers */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x1 = 100 + 72 * Math.cos(angle);
          const y1 = 100 + 72 * Math.sin(angle);
          const x2 = 100 + 80 * Math.cos(angle);
          const y2 = 100 + 80 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="hsl(43 52% 59%)"
              strokeWidth={i % 3 === 0 ? 2.5 : 1}
              opacity={i % 3 === 0 ? 0.9 : 0.5}
            />
          );
        })}

        {/* Minute markers */}
        {Array.from({ length: 60 }, (_, i) => {
          if (i % 5 === 0) return null;
          const angle = (i * 6 - 90) * (Math.PI / 180);
          const x1 = 100 + 77 * Math.cos(angle);
          const y1 = 100 + 77 * Math.sin(angle);
          const x2 = 100 + 80 * Math.cos(angle);
          const y2 = 100 + 80 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="hsl(43 52% 59% / 0.3)"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Roman numerals */}
        <text x="100" y="32" textAnchor="middle" fill="hsl(43 52% 59%)" fontSize="10" fontFamily="Playfair Display" opacity="0.9">XII</text>
        <text x="168" y="104" textAnchor="middle" fill="hsl(43 52% 59%)" fontSize="10" fontFamily="Playfair Display" opacity="0.9">III</text>
        <text x="100" y="178" textAnchor="middle" fill="hsl(43 52% 59%)" fontSize="10" fontFamily="Playfair Display" opacity="0.9">VI</text>
        <text x="32" y="104" textAnchor="middle" fill="hsl(43 52% 59%)" fontSize="10" fontFamily="Playfair Display" opacity="0.9">IX</text>

        {/* Hour hand - idle at 11:59 */}
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="50"
          stroke="hsl(43 52% 59%)"
          strokeWidth="3.5"
          strokeLinecap="round"
          style={{ transformOrigin: "100px 100px" }}
          initial={{ rotate: -30 }}
          animate={{ rotate: isActivating ? -25 : -30 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Minute hand - idle at 11:59 */}
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="30"
          stroke="hsl(43 52% 59%)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ transformOrigin: "100px 100px" }}
          initial={{ rotate: -6 }}
          animate={{ rotate: isActivating ? 0 : -6 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Second hand - only appears on activation */}
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="25"
          stroke="hsl(0 84% 60%)"
          strokeWidth="1"
          strokeLinecap="round"
          style={{ transformOrigin: "100px 100px" }}
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ 
            rotate: isActivating ? 30 : 0,
            opacity: isActivating ? 1 : 0
          }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />

        {/* Center cap */}
        <circle cx="100" cy="100" r="5" fill="hsl(43 52% 59%)" />
        <circle cx="100" cy="100" r="2" fill="hsl(222 47% 7%)" />
      </svg>
    </div>
  );
};

export default IdleClock;

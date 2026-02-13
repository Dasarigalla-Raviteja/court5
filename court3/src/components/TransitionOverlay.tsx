import { motion } from "framer-motion";

const TransitionOverlay = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Radial glow */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0.3] }}
        transition={{ duration: 2, times: [0, 0.5, 1] }}
        style={{
          background: "radial-gradient(circle at center, hsl(43 52% 59% / 0.1) 0%, transparent 60%)"
        }}
      />

      {/* Transition message */}
      <motion.div
        className="relative text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
        transition={{ duration: 2, times: [0, 0.2, 0.8, 1] }}
      >
        <p className="text-foreground font-serif text-2xl md:text-3xl tracking-wide">
          Time is now being observed.
        </p>
        
        {/* Subtle line animation */}
        <motion.div
          className="mt-6 mx-auto h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default TransitionOverlay;

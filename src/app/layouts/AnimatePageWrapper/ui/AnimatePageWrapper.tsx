import { motion } from "framer-motion";

export const AnimatePageWrapper = ({ children }: any) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.98,
        },
        animate: {
          scale: 1,
        },
        exit: {
          scale: 0.98,
        },
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.12 }}
      style={{
        position: "inherit",
        display: "inherit",
        flexDirection: "inherit",
        alignItems: "inherit",
        justifyContent: "inherit",
        boxSizing: "inherit",
        width: "100%",
        height: "100%",
        flex: 1,
      }}
    >
      {children}
    </motion.div>
  );
};

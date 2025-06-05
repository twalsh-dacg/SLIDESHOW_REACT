import { motion } from 'framer-motion';
import React from 'react';

type TransitionWrapperProps = {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
};

export const TransitionWrapper = ({ 
  children, 
  direction = 'left' 
}: TransitionWrapperProps) => {
  const variants = {
    enter: {
      x: direction === 'left' ? 1000 : direction === 'right' ? -1000 : 0,
      y: direction === 'up' ? 1000 : direction === 'down' ? -1000 : 0,
      opacity: 0
    },
    center: {
      x: 0,
      y: 0,
      opacity: 1
    },
    exit: {
      x: direction === 'left' ? -1000 : direction === 'right' ? 1000 : 0,
      y: direction === 'up' ? -1000 : direction === 'down' ? 1000 : 0,
      opacity: 0
    }
  };

  return (
    <motion.div
      initial="enter"
      animate="center"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

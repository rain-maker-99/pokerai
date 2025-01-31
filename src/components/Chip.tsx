import React from 'react';
import { motion } from 'framer-motion';

interface ChipProps {
  value: 1 | 5 | 10 | 25 | 100;
  count?: number;
}

const chipColors = {
  1: 'bg-white border-gray-300',
  5: 'bg-[#ea384c] border-red-700',
  10: 'bg-[#0FA0CE] border-blue-700',
  25: 'bg-[#33C3F0] border-green-700',
  100: 'bg-black border-gray-800'
};

const Chip = ({ value, count = 1 }: ChipProps) => {
  return (
    <motion.div 
      className="relative group"
      whileHover={{ y: -2 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={`w-8 h-8 rounded-full ${chipColors[value]} border-4 flex items-center justify-center text-xs font-bold relative`}>
        <span className={`${value === 1 ? 'text-black' : 'text-white'}`}>
          ${value}
        </span>
        {count > 1 && (
          <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {count}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Chip;
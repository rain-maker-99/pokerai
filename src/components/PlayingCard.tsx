import React from 'react';
import { motion } from 'framer-motion';

interface PlayingCardProps {
  rank: string;
  suit: string;
}

const PlayingCard = ({ rank, suit }: PlayingCardProps) => {
  return (
    <motion.div
      className="relative w-16 h-24 bg-white rounded-lg shadow-xl overflow-hidden"
      whileHover={{ scale: 1.1, rotate: 5 }}
      initial={{ scale: 0, rotateY: 180 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ 
        duration: 0.5,
        scale: {
          type: "spring",
          stiffness: 300
        }
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100">
        <div className="p-2">
          <div className={`text-xl font-bold ${suit === '♥' || suit === '♦' ? 'text-red-500' : 'text-black'}`}>
            {rank}
          </div>
          <div className={`text-2xl ${suit === '♥' || suit === '♦' ? 'text-red-500' : 'text-black'}`}>
            {suit}
          </div>
        </div>
        <div className="absolute bottom-2 right-2 transform rotate-180">
          <div className={`text-xl font-bold ${suit === '♥' || suit === '♦' ? 'text-red-500' : 'text-black'}`}>
            {rank}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayingCard;
import React from "react";
import { motion } from "framer-motion";

interface AIPlayerProps {
  player: {
    id: number;
    name: string;
    avatar: string;
    position: string;
  };
  chips: number;
}

const positionStyles = {
  top: "top-4 left-1/2 -translate-x-1/2",
  right: "right-4 top-1/2 -translate-y-1/2",
  bottom: "bottom-4 left-1/2 -translate-x-1/2",
  left: "left-4 top-1/2 -translate-y-1/2",
};

const AIPlayer = ({ player, chips }: AIPlayerProps) => {
  return (
    <motion.div
      className={`absolute ${positionStyles[player.position as keyof typeof positionStyles]}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: player.id * 0.2 }}
    >
      <motion.div 
        className="relative group"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/50 backdrop-blur-sm bg-black/30">
          <motion.img
            src={player.avatar}
            alt={player.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
          />
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/80 px-3 py-1 rounded-full text-white text-sm whitespace-nowrap">
          {player.name}
        </div>
        <motion.div 
          className="absolute -top-6 left-1/2 -translate-x-1/2 bg-purple-500/80 px-3 py-1 rounded-full text-white text-sm whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {chips} chips
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AIPlayer;
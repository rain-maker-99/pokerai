import React from "react";
import { motion } from "framer-motion";

interface ChatBubbleProps {
  message: string;
  position: string;
  sender: string;
}

const ChatBubble = ({ message, position, sender }: ChatBubbleProps) => {
  return (
    <motion.div
      className={`absolute ${position} max-w-xs`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="bg-white/10 backdrop-blur-md p-3 rounded-lg shadow-lg">
        <p className="text-sm text-white">{message}</p>
        <div className="text-xs text-primary mt-1">{sender}</div>
      </div>
    </motion.div>
  );
};

export default ChatBubble;
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Player {
  id: number;
  name: string;
  wins: number;
  avatar: string;
}

interface LeaderboardProps {
  players: Player[];
}

const Leaderboard = ({ players }: LeaderboardProps) => {
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);

  useEffect(() => {
    // Update local state whenever players prop changes
    const newSortedPlayers = [...players].sort((a, b) => b.wins - a.wins);
    setSortedPlayers(newSortedPlayers);
  }, [players]);

  // Also check localStorage for persisted wins
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('leaderboard');
    if (savedLeaderboard) {
      try {
        const leaderboardData = JSON.parse(savedLeaderboard);
        const updatedPlayers = players.map(player => {
          const savedPlayer = leaderboardData.find(p => p.id === player.id);
          return {
            ...player,
            wins: savedPlayer ? savedPlayer.wins : player.wins
          };
        });
        setSortedPlayers([...updatedPlayers].sort((a, b) => b.wins - a.wins));
      } catch (error) {
        console.error('Error parsing leaderboard data:', error);
      }
    }
  }, []);

  return (
    <motion.div
      className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-purple-500/20"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-white text-lg font-bold mb-2">Leaderboard</h3>
      <div className="space-y-2">
        {sortedPlayers.map((player, index) => (
          <motion.div
            key={player.id}
            className="flex items-center gap-2 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <img
              src={player.avatar}
              alt={player.name}
              className="w-6 h-6 rounded-full"
            />
            <span>{player.name}</span>
            <span className="text-purple-400 ml-auto">{player.wins} wins</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Leaderboard;
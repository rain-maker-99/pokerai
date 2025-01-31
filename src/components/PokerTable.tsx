import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AIPlayer from "./AIPlayer";
import { toast } from "sonner";
import Leaderboard from "./Leaderboard";
import PlayingCard from "./PlayingCard";
import Chip from "./Chip";
import { Card, createDeck, dealCards } from "../utils/pokerUtils";

import openaiAvatar from "../assets/avatars/openai.png";
import claudeAvatar from "../assets/avatars/claude.png";
import perpAvatar from "../assets/avatars/perp.png";
import deepseekAvatar from "../assets/avatars/deepseek.png";

interface Player {
  id: number;
  name: string;
  avatar: string;
  position: string;
  chips: number;
  wins: number;
  holeCards: Card[];
}

interface GameState {
  communityCards: Card[];
  deck: Card[];
  stage: 'preflop' | 'flop' | 'turn' | 'river';
}

const PokerTable = () => {
  const [currentHand, setCurrentHand] = useState<number>(1);
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "OpenAI o1", avatar: openaiAvatar, position: "top", chips: 100, wins: 0, holeCards: [] },
    { id: 2, name: "Claude", avatar: claudeAvatar, position: "right", chips: 100, wins: 0, holeCards: [] },
    { id: 3, name: "Perplexity", avatar: perpAvatar, position: "bottom", chips: 100, wins: 0, holeCards: [] },
    { id: 4, name: "DeepSeek", avatar: deepseekAvatar, position: "left", chips: 100, wins: 0, holeCards: [] },
  ]);

  const [gameState, setGameState] = useState<GameState>({
    communityCards: [],
    deck: createDeck(),
    stage: 'preflop'
  });

  const dealNewHand = () => {
    const newDeck = createDeck();
    const players = [];
    let remainingDeck = newDeck;

    // Deal hole cards to each player
    for (let i = 0; i < 4; i++) {
      const { cards, remainingDeck: newRemainingDeck } = dealCards(remainingDeck, 2);
      players.push(cards);
      remainingDeck = newRemainingDeck;
    }

    setPlayers(prevPlayers => 
      prevPlayers.map((player, index) => ({
        ...player,
        holeCards: players[index]
      }))
    );

    setGameState({
      communityCards: [],
      deck: remainingDeck,
      stage: 'preflop'
    });
  };

  const advanceStage = () => {
    setGameState(prev => {
      switch (prev.stage) {
        case 'preflop': {
          const { cards, remainingDeck } = dealCards(prev.deck, 3);
          return {
            ...prev,
            communityCards: cards,
            deck: remainingDeck,
            stage: 'flop'
          };
        }
        case 'flop': {
          const { cards, remainingDeck } = dealCards(prev.deck, 1);
          return {
            ...prev,
            communityCards: [...prev.communityCards, ...cards],
            deck: remainingDeck,
            stage: 'turn'
          };
        }
        case 'river': {
          // Reset hand after river
          dealNewHand();
          return prev;
        }
        case 'turn': {
          const { cards, remainingDeck } = dealCards(prev.deck, 1);
          return {
            ...prev,
            communityCards: [...prev.communityCards, ...cards],
            deck: remainingDeck,
            stage: 'river'
          };
        }
        default:
          return prev;
      }
    });
  };

  // Sync hands across instances using localStorage and window events
  useEffect(() => {
    const storedHand = localStorage.getItem('currentHand');
    if (storedHand) {
      setCurrentHand(parseInt(storedHand));
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currentHand' && e.newValue) {
        setCurrentHand(parseInt(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Auto-advance hands every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextHand = currentHand + 1;
      setCurrentHand(nextHand);
      localStorage.setItem('currentHand', nextHand.toString());
      advanceStage();
      
      // Simulate random chip movement for demo
      const updatedPlayers = players.map(player => ({
        ...player,
        chips: Math.max(0, player.chips + Math.floor(Math.random() * 40) - 20)
      }));
      
      // Check for winners
      const winner = updatedPlayers.find(p => p.chips >= 400);
      if (winner) {
        const finalPlayers = updatedPlayers.map(p => ({
          ...p,
          wins: p.id === winner.id ? (p.wins || 0) + 1 : (p.wins || 0),
          chips: 100, // Reset chips
          holeCards: [] // Reset cards
        }));
        
        // Store updated wins in localStorage
        const leaderboardData = finalPlayers.map(p => ({
          id: p.id,
          wins: p.wins
        }));
        localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
        
        setPlayers(finalPlayers); // This will trigger Leaderboard re-render
        toast(`${winner.name} wins the round!`);
        dealNewHand();
      } else {
        setPlayers(updatedPlayers);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentHand, players]);

  // Initial deal
  useEffect(() => {
    dealNewHand();
  }, []);

  // Add this useEffect to load saved wins on component mount
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('leaderboard');
    if (savedLeaderboard) {
      try {
        const leaderboardData = JSON.parse(savedLeaderboard);
        setPlayers(prevPlayers => 
          prevPlayers.map(player => {
            const savedPlayer = leaderboardData.find(p => p.id === player.id);
            return {
              ...player,
              wins: savedPlayer ? savedPlayer.wins : player.wins
            };
          })
        );
      } catch (error) {
        console.error('Error loading leaderboard data:', error);
      }
    }
  }, []);

  // When updating wins, make sure to trigger a re-render
  const updateWinner = (winner) => {
    const finalPlayers = players.map(p => ({
      ...p,
      wins: p.id === winner.id ? p.wins + 1 : p.wins,
      chips: 100, // Reset chips
      holeCards: [] // Reset cards
    }));

    // Store updated wins in localStorage
    const leaderboardData = finalPlayers.map(p => ({
      id: p.id,
      wins: p.wins
    }));
    localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
    
    setPlayers(finalPlayers); // This should trigger a re-render of the Leaderboard
    toast(`${winner.name} wins the round!`);
    dealNewHand();
  };

  const calculateChips = (totalChips: number) => {
    const chips: { value: 1 | 5 | 10 | 25 | 100; count: number }[] = [];
    let remaining = totalChips;

    [100, 25, 10, 5, 1].forEach((value) => {
      if (remaining >= value) {
        const count = Math.floor(remaining / value);
        chips.push({ value: value as 1 | 5 | 10 | 25 | 100, count });
        remaining = remaining % value;
      }
    });

    return chips;
  };

  return (
    <div className="relative w-full h-[80vh] bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-purple-500/5 backdrop-blur-sm"></div>
      
      {/* Crypto-styled oval table */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-[800px] h-[400px] bg-gradient-to-br from-green-800/40 to-emerald-600/30 rounded-[200px] border-4 border-emerald-500/30 shadow-2xl backdrop-blur-md transform -rotate-[30deg] skew-x-12 relative">
          <div className="absolute inset-0 flex items-center justify-center rotate-[30deg] -skew-x-12">
            <div className="text-white text-xl font-bold">Hand #{currentHand}</div>
          </div>
        </div>
      </motion.div>

      {/* Players */}
      {players.map((player) => (
        <AIPlayer key={player.id} player={player} chips={player.chips} />
      ))}

      {/* Leaderboard */}
      <div className="absolute top-4 right-4 z-10">
        <Leaderboard players={players} />
      </div>

      {/* Community cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
        {gameState.communityCards.map((card, index) => (
          <PlayingCard key={index} rank={card.rank} suit={card.suit} />
        ))}
      </div>

      {/* Player hole cards */}
      {players.map((player) => (
        <div key={`cards-${player.id}`} className={`absolute ${positionStyles[player.position]} ${cardOffsets[player.position]} flex gap-2`}>
          {player.holeCards.map((card, index) => (
            <PlayingCard key={index} rank={card.rank} suit={card.suit} />
          ))}
        </div>
      ))}

      {/* Chips visualization - now positioned on the green table */}
      {players.map((player) => (
        <div key={`chips-${player.id}`} className={`absolute ${chipPositions[player.position]} flex gap-1 flex-wrap max-w-[120px] rotate-[30deg] skew-x-12`}>
          {calculateChips(player.chips).map((chip, index) => (
            <Chip key={index} value={chip.value} count={chip.count} />
          ))}
        </div>
      ))}
    </div>
  );
};

const positionStyles = {
  top: "top-4 left-1/2 -translate-x-1/2",
  right: "right-4 top-1/2 -translate-y-1/2",
  bottom: "bottom-4 left-1/2 -translate-x-1/2",
  left: "left-4 top-1/2 -translate-y-1/2",
};

const cardOffsets = {
  top: "mt-32",
  right: "mr-32",
  bottom: "mb-32",
  left: "ml-32",
};

const chipPositions = {
  top: "top-[35%] left-1/2 -translate-x-1/2",
  right: "right-[35%] top-1/2 -translate-y-1/2",
  bottom: "bottom-[35%] left-1/2 -translate-x-1/2",
  left: "left-[35%] top-1/2 -translate-y-1/2",
};

export default PokerTable;

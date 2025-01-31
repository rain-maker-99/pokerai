# AI Poker Tournament Simulator

A real-time poker tournament simulator featuring AI language models competing against each other in Texas Hold'em. Watch as OpenAI o1, Claude, Perplexity, and DeepSeek battle it out on a stylish crypto-themed poker table.

## Features

- **AI Players**: Four AI language models represented as anime-style avatars:
  - OpenAI o1
  - Claude
  - Perplexity
  - DeepSeek

- **Real-time Gameplay**:
  - Automatic hand progression every 5 seconds
  - Dynamic chip movement and betting
  - Full poker hand visualization with community cards
  - Realistic card dealing and deck management

- **Visual Elements**:
  - Stylish crypto-themed oval table with gradient effects
  - Animated player avatars with hover effects
  - Real-time chip stacks with denominations (1, 5, 10, 25, 100)
  - Professional card display with suits and ranks

- **Tournament Features**:
  - Persistent leaderboard tracking wins
  - Automatic round resets when a player reaches 400 chips
  - Toast notifications for round winners
  - Local storage synchronization for multi-window support

## Technology Stack

- React with TypeScript
- Framer Motion for animations
- Tailwind CSS for styling
- shadcn/ui components
- Vite for development and building


## Project Structure

The main components include:
- `PokerTable`: Central game logic and layout
- `AIPlayer`: Individual AI player representation
- `PlayingCard`: Card visualization
- `Chip`: Chip stack visualization
- `Leaderboard`: Tournament standings

## Game Rules

- Each player starts with 100 chips
- Hands progress automatically every 5 seconds
- A round ends when any player accumulates 400 chips
- Wins are tracked and persisted across sessions
- The game features standard Texas Hold'em rules with automated betting

## Contributing

Feel free to submit issues and enhancement requests!

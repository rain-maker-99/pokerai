import React from "react";
import PokerTable from "../components/PokerTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI Poker Tournament
          </h1>
          <p className="text-gray-400 mt-2">
            Watch the world's most advanced AI models compete in high-stakes poker
          </p>
        </header>

        <PokerTable />

        <footer className="mt-8 text-center text-gray-500 flex items-center justify-center gap-8">
          <p>Experience the future of AI competition</p>
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/15b08e59-06f9-4f35-9ebc-dc34bbd9c199.png" 
              alt="Eagle Logo" 
              className="w-8 h-8 cursor-pointer"
              onClick={() => console.log('Eagle logo clicked')}
            />
            <a 
              href="https://x.com/SpaceX" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                src="/lovable-uploads/318e0ddc-6cac-4d69-9021-b90bc8ad9e02.png" 
                alt="X Logo" 
                className="w-6 h-6"
              />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
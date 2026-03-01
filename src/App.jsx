import { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, ExternalLink, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => {
              setSelectedGame(null);
              setSearchQuery('');
            }}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Gamepad2 size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">
              Nova<span className="text-indigo-600">Games</span>
            </h1>
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              placeholder="Search games..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-100 border-none rounded-full focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">Popular</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">New</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Categories</a>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <AnimatePresence mode="wait">
          {selectedGame ? (
            <motion.div
              key="player"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="text-sm text-zinc-500 hover:text-indigo-600 flex items-center gap-1 mb-2 transition-colors"
                  >
                    <X size={14} /> Back to Library
                  </button>
                  <h2 className="text-3xl font-bold tracking-tight">{selectedGame.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={toggleFullScreen}
                    className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-600"
                    title="Toggle Fullscreen"
                  >
                    <Maximize2 size={20} />
                  </button>
                  <a 
                    href={selectedGame.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-600"
                    title="Open in New Tab"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              <div className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${isFullScreen ? 'fixed inset-0 z-50 rounded-none' : 'aspect-video'}`}>
                {isFullScreen && (
                  <button 
                    onClick={toggleFullScreen}
                    className="absolute top-4 right-4 z-50 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all"
                  >
                    <X size={24} />
                  </button>
                )}
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allowFullScreen
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-zinc-200">
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-xl font-semibold">About this game</h3>
                  <p className="text-zinc-600 leading-relaxed">
                    {selectedGame.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Controls</h3>
                  <div className="bg-zinc-100 rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Movement</span>
                      <span className="font-mono font-bold">WASD / Arrows</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Action</span>
                      <span className="font-mono font-bold">Space</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Pause</span>
                      <span className="font-mono font-bold">Esc</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-4xl font-bold tracking-tight mb-2">Game Library</h2>
                  <p className="text-zinc-500">Discover and play the best unblocked games.</p>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                  {['All', 'Puzzle', 'Action', 'Arcade', 'Sports'].map((cat) => (
                    <button 
                      key={cat}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${cat === 'All' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white border border-zinc-200 text-zinc-600 hover:border-indigo-300'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredGames.map((game, index) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group bg-white rounded-2xl overflow-hidden border border-zinc-200 game-card-hover cursor-pointer"
                      onClick={() => handleGameSelect(game)}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img 
                          src={game.thumbnail} 
                          alt={game.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            <Play fill="currentColor" size={24} />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-1 group-hover:text-indigo-600 transition-colors">{game.title}</h3>
                        <p className="text-zinc-500 text-sm line-clamp-2">{game.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                    <Search size={32} />
                  </div>
                  <h3 className="text-xl font-semibold">No games found</h3>
                  <p className="text-zinc-500">Try searching for something else or browse our categories.</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Gamepad2 size={18} />
              </div>
              <span className="text-lg font-bold tracking-tight">Nova Games</span>
            </div>
            <p className="text-zinc-500 max-w-sm">
              The ultimate destination for unblocked web games. Play your favorite titles anywhere, anytime, for free.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li><a href="#" className="hover:text-indigo-600">Home</a></li>
              <li><a href="#" className="hover:text-indigo-600">Popular Games</a></li>
              <li><a href="#" className="hover:text-indigo-600">New Releases</a></li>
              <li><a href="#" className="hover:text-indigo-600">Categories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li><a href="#" className="hover:text-indigo-600">Contact Us</a></li>
              <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-600">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-8 mt-8 border-t border-zinc-100 text-center text-sm text-zinc-400">
          © {new Date().getFullYear()} Nova Games. All rights reserved. Built for fun.
        </div>
      </footer>
    </div>
  );
}

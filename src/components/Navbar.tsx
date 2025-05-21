
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, BarChart2, Image } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleUploadClick = () => {
    navigate('/search');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-meme w-8 h-8 rounded-lg flex items-center justify-center mr-2">
                <Search className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-bold gradient-text">MemeIQ</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/search" className="text-foreground/80 hover:text-foreground transition-colors">
              Search
            </Link>
            <Link to="/creator" className="text-foreground/80 hover:text-foreground transition-colors">
              Create
            </Link>
            <Link to="/trends" className="text-foreground/80 hover:text-foreground transition-colors">
              Trends
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
              About
            </Link>
            <Button variant="default" className="meme-btn" onClick={handleUploadClick}>
              Upload Meme
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-gray-300 hover:text-white focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-foreground/90 hover:bg-secondary rounded-md"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/search"
              className="block px-3 py-2 text-foreground/90 hover:bg-secondary rounded-md"
              onClick={toggleMenu}
            >
              Search
            </Link>
            <Link
              to="/creator"
              className="block px-3 py-2 text-foreground/90 hover:bg-secondary rounded-md"
              onClick={toggleMenu}
            >
              Create
            </Link>
            <Link
              to="/trends"
              className="block px-3 py-2 text-foreground/90 hover:bg-secondary rounded-md"
              onClick={toggleMenu}
            >
              Trends
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-foreground/90 hover:bg-secondary rounded-md"
              onClick={toggleMenu}
            >
              About
            </Link>
            <div className="px-3 py-2">
              <Button variant="default" className="meme-btn w-full" onClick={() => {
                handleUploadClick();
                toggleMenu();
              }}>
                Upload Meme
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

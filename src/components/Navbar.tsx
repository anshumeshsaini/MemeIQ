
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, BarChart2, Image, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleUploadClick = () => {
    navigate('/search');
    toast({
      title: "Upload Ready",
      description: "Select an image to analyze it",
    });
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const navItemClass = (path: string) => 
    `relative transition-colors duration-300 ${isActiveRoute(path) 
      ? 'text-foreground font-medium after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-0.5 after:bg-meme-purple after:rounded-full' 
      : 'text-foreground/80 hover:text-foreground'}`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-lg shadow-lg' : 'bg-background/80 backdrop-blur-md'} border-b border-border`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="bg-gradient-meme w-8 h-8 rounded-lg flex items-center justify-center mr-2 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                <Sparkles className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-bold gradient-text">MemeIQ</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={navItemClass('/')}>
              Home
            </Link>
            <Link to="/search" className={navItemClass('/search')}>
              Search
            </Link>
            <Link to="/creator" className={navItemClass('/creator')}>
              Create
            </Link>
            <Link to="/trends" className={navItemClass('/trends')}>
              Trends
            </Link>
            <Link to="/about" className={navItemClass('/about')}>
              About
            </Link>
            <Button variant="gradient" glow="subtle" onClick={handleUploadClick} className="animate-scale-in">
              <Image className="h-4 w-4 mr-1" /> Upload Meme
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-gray-300 hover:text-white focus:outline-none transition-transform active:scale-90"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary/90 backdrop-blur-lg border-b border-border animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 ${isActiveRoute('/') ? 'text-meme-purple font-semibold' : 'text-foreground/90'} hover:bg-secondary rounded-md transition-colors`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={`block px-3 py-2 ${isActiveRoute('/search') ? 'text-meme-purple font-semibold' : 'text-foreground/90'} hover:bg-secondary rounded-md transition-colors`}
              onClick={toggleMenu}
            >
              Search
            </Link>
            <Link
              to="/creator"
              className={`block px-3 py-2 ${isActiveRoute('/creator') ? 'text-meme-purple font-semibold' : 'text-foreground/90'} hover:bg-secondary rounded-md transition-colors`}
              onClick={toggleMenu}
            >
              Create
            </Link>
            <Link
              to="/trends"
              className={`block px-3 py-2 ${isActiveRoute('/trends') ? 'text-meme-purple font-semibold' : 'text-foreground/90'} hover:bg-secondary rounded-md transition-colors`}
              onClick={toggleMenu}
            >
              Trends
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 ${isActiveRoute('/about') ? 'text-meme-purple font-semibold' : 'text-foreground/90'} hover:bg-secondary rounded-md transition-colors`}
              onClick={toggleMenu}
            >
              About
            </Link>
            <div className="px-3 py-2">
              <Button variant="gradient" className="w-full" onClick={() => {
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

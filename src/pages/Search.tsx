
import Navbar from '@/components/Navbar';
import SearchUpload from '@/components/SearchUpload';
import Footer from '@/components/Footer';

const Search = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Analyze</span> Any Meme
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Upload your meme and our AI will find its origin, analyze its components, and track its spread across the internet.
          </p>
        </div>
        
        <SearchUpload />
      </div>
      <Footer />
    </div>
  );
};

export default Search;

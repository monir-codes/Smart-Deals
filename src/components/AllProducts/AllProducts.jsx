import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, LayoutGrid, List, Sparkles, SlidersHorizontal } from 'lucide-react';
import Product from '../Product/Product';
import { Link } from 'react-router';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Backend API call
    fetch(`http://localhost:3000/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // Filter Logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Electronics", "Furniture", "Sports", "Fashion", "Other"];

  return (
    <div className="min-h-screen bg-[#030014] pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-[0.4em] mb-4"
          >
            <Sparkles size={16} /> Global Marketplace
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6"
          >
            Explore <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent italic font-serif">Everything</span>
          </motion.h1>
        </div>

        {/* --- Search & Filter Bar --- */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-white/5 backdrop-blur-2xl border border-white/10 p-4 rounded-[2rem]">
          
          {/* Search Input */}
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by product title..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-500/50 transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <SlidersHorizontal size={18} className="text-slate-500 hidden md:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                  category === cat 
                  ? 'bg-cyan-500 text-[#030014] border-cyan-500 shadow-lg shadow-cyan-500/20' 
                  : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- Products Grid --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full mb-4"
            />
            <p className="text-slate-500 font-bold tracking-widest text-xs uppercase">Syncing Database...</p>
          </div>
        ) : (
          <>
            <motion.div 
              layout
              className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode='popLayout'>
                {filteredProducts.map((product) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={product._id} 
                    className="group relative"
                  >
                    <Link to={`/productDetails/${product._id}`}>
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-violet-500/30 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-500" />
                      <div className="relative h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden transition-colors hover:border-white/20">
                        <Product product={product} />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-40 bg-white/5 rounded-[3rem] border border-dashed border-white/10"
              >
                <p className="text-slate-500 text-lg font-medium italic">"No items found matching your criteria."</p>
                <button 
                  onClick={() => {setSearch(""); setCategory("All")}}
                  className="mt-6 text-cyan-400 font-black text-xs uppercase tracking-widest hover:text-white transition-colors"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
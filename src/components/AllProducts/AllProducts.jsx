import React, { useEffect, useState, useMemo, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, SlidersHorizontal, Loader2, XCircle } from 'lucide-react';
import Product from '../Product/Product';
import { Link } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../Loader/Loader';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useContext(AuthContext);

  // 1. Fetching Logic
  useEffect(() => {
    if (authLoading) return; // Auth initialize na houa porjonto wait korbe

    const controller = new AbortController();
    setLoading(true);

    const getProducts = async () => {
      try {
        // Firebase token retrieve kora (Best Practice)
        // const token = user ? await user.getIdToken() : "";

        const res = await fetch('http://localhost:3000/api/products', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        
        if (!res.ok) throw new Error("Failed to fetch");
        
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    getProducts();

    return () => controller.abort();
  }, [user, authLoading]);

  // 2. Filter Logic (useEffect er baire thakbe)
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.title?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const categories = ["All", "Electronics", "Furniture", "Sports", "Fashion", "Other"];

  // 3. Early Loading State
  if (authLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#030014] pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full animate-pulse" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-cyan-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-6"
          >
            <Sparkles size={14} /> Global Marketplace
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
          >
            Explore <span className="bg-gradient-to-r from-violet-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent italic font-serif">Everything</span>
          </motion.h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Discover premium products from verified sellers across the nation. 
          </p>
        </div>

        {/* --- Search & Filter Bar --- */}
        <div className="sticky top-24 z-50 mb-12 flex flex-col md:flex-row gap-6 items-center justify-between bg-white/5 backdrop-blur-3xl border border-white/10 p-4 rounded-[2.5rem]">
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="text" 
              value={search}
              placeholder="Search products..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white outline-none focus:border-cyan-500/50 transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  category === cat 
                  ? 'bg-cyan-500 text-[#030014] border-cyan-500' 
                  : 'bg-white/5 text-slate-400 border-white/10'
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
            <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mb-6" />
            <p className="text-slate-500 font-bold tracking-[0.3em] text-[10px] uppercase">Connecting to Server...</p>
          </div>
        ) : (
          <>
            <motion.div layout className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode='popLayout'>
                {filteredProducts.map((product) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={product._id} 
                    className="group relative"
                  >
                    <Link to={`/productDetails/${product._id}`}>
                      <div className="relative h-full bg-[#0a0a16]/60 backdrop-blur-md border border-white/10 rounded-[2.5rem] overflow-hidden transition-all group-hover:border-white/20">
                        <Product product={product} />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-32 bg-white/5 rounded-[3.5rem] border border-dashed border-white/10">
                <XCircle size={48} className="mx-auto text-slate-700 mb-6" />
                <h3 className="text-white text-xl font-bold">No Matches Found</h3>
                <button 
                  onClick={() => {setSearch(""); setCategory("All")}}
                  className="mt-6 px-8 py-3 bg-white/10 text-white rounded-2xl text-[10px] uppercase font-black"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
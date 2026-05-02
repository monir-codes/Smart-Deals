import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Product from '../Product/Product';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react'; // Added Loader
import { Link } from 'react-router'; 

const LatestProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        // Optimization: Signal use kora bhalo jate component unmount hole fetch cancel hoy
        const controller = new AbortController();
        
        fetch('http://localhost:3000/api/recent-products', { signal: controller.signal })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    console.error("Fetch error:", err);
                    setLoading(false);
                }
            });

        return () => controller.abort();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <section className="relative py-24 bg-[#030014] overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-violet-600/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-600/5 blur-[100px] rounded-full opacity-50" />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-[0.3em]">
                            <Sparkles size={16} /> New Arrivals
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            Recent <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent italic font-serif">Products</span>
                        </h2>
                    </div>

                    {/* Desktop View All Link */}
                    <Link to="/all-products" className="hidden md:flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors font-bold text-sm uppercase tracking-widest group">
                        View Marketplace <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* --- Loading State --- */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <Loader2 className="animate-spin text-cyan-500 mb-4" size={40} />
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Fetching Latest Drops...</p>
                    </div>
                ) : (
                    <>
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        >
                            {products.slice(0, 8).map((product) => ( // Limiting to 8 items for "Latest"
                                <motion.div 
                                    key={product._id} 
                                    variants={itemVariants}
                                    whileHover={{ y: -10 }}
                                    className="group relative"
                                >
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/30 to-cyan-500/30 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-500" />
                                    
                                    <Link to={`/productDetails/${product._id}`} className="block h-full relative">
                                        <div className="relative h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden transition-colors hover:border-white/20">
                                            <Product product={product} />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* --- Empty State --- */}
                        {!loading && products.length === 0 && (
                            <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
                                <p className="text-slate-500 font-medium italic">"No items have been listed yet. Be the first one!"</p>
                            </div>
                        )}
                    </>
                )}
                
                {/* Mobile View All Button */}
                <div className="mt-12 md:hidden flex justify-center">
                    <Link to="/allProducts" className="w-full text-center py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold uppercase tracking-widest text-xs">
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestProducts;
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Product from '../Product/Product';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router'; // Import Link

const LatestProducts = ({ latestProductsPromise }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        latestProductsPromise.then(data => {
            setProducts(data);
        });
    }, [latestProductsPromise]);

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
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-[0.3em]">
                            <Sparkles size={16} /> New Arrivals
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            Recent <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent italic">Products</span>
                        </h2>
                    </div>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    {products.map((product) => (
                        <motion.div 
                            key={product._id} 
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="group relative"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-500" />
                            
                            {/* --- Wrapped Product with Link --- */}
                            <Link to={`/productDetails/${product._id}`} className="block h-full">
                                <div className="relative h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden cursor-pointer transition-colors hover:border-white/20">
                                    <Product product={product} />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {products.length === 0 && (
                    <div className="text-center py-20 text-slate-500 font-medium">
                        No products found at the moment.
                    </div>
                )}
            </div>
        </section>
    );
};

export default LatestProducts;
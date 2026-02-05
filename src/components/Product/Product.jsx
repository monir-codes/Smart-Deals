import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Tag, ExternalLink } from 'lucide-react';

const Product = ({ product }) => {
    const { title, price_min, price_max, category, image, description } = product;

    return (
        <div className="flex flex-col h-full">
            {/* --- Image Container --- */}
            <div className="relative overflow-hidden group/img h-[250px]">
                {/* Floating Category Tag */}
                <div className="absolute top-4 left-4 z-20">
                    <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
                        <Tag size={12} className="text-cyan-400" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">{category}</span>
                    </div>
                </div>

                {/* Product Image with Hover Zoom */}
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover/img:brightness-75"
                />

                {/* Quick Action Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 z-10">
                    <button className="bg-white text-black p-3 rounded-full hover:bg-cyan-400 transition-colors">
                        <ExternalLink size={20} strokeWidth={3} />
                    </button>
                </div>
            </div>

            {/* --- Content Body --- */}
            <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-white/[0.02]">
                <h2 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-violet-400 transition-colors">
                    {title}
                </h2>
                
                <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed italic">
                    {description || "No description available for this premium product."}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Price Range</span>
                        <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            ${price_min} - ${price_max}
                        </span>
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-violet-600/10 hover:bg-violet-600 border border-violet-500/30 text-violet-400 hover:text-white px-4 py-2 rounded-xl text-sm font-black transition-all shadow-lg shadow-violet-900/20"
                    >
                        <ShoppingCart size={16} /> BUY
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default Product;
import React from "react";
import { useLoaderData, Link } from "react-router"; // useLoaderData import koro
import { motion } from "framer-motion";
import { 
  MapPin, Tag, ShieldCheck, 
  ArrowLeft, Clock, MessageCircle 
} from "lucide-react";

const ProductDetails = () => {
  // Router er loader theke data eikhane chole ashbe
  const product = useLoaderData(); 

  // Jodi loader e error hoy ba product na pay
  if (!product || product.message) {
    return (
      <div className="min-h-screen bg-[#030014] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Product Not Found!</h2>
        <Link to="/" className="text-blue-400 hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] text-white py-24 px-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-all group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold tracking-widest text-[10px] uppercase">Back to Marketplace</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* --- Left Column: Visuals --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="relative group rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="bg-blue-600/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {product.category}
                </span>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md ${product.status === 'sold' ? 'bg-red-500/80' : 'bg-green-500/80'}`}>
                  {product.status}
                </span>
              </div>
            </div>

            {/* Seller Info Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] flex items-center gap-4">
              <img src={product.seller_image} className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500/50" alt="Seller" />
              <div>
                <h4 className="font-bold text-lg">{product.seller_name}</h4>
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <ShieldCheck size={14} className="text-blue-400" />
                  <span>Verified Seller</span>
                </div>
              </div>
              <button className="ml-auto p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10">
                <MessageCircle size={20} className="text-blue-400" />
              </button>
            </div>
          </motion.div>

          {/* --- Right Column: Details --- */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tighter">{product.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-xs font-bold text-slate-300">
                <MapPin size={14} className="text-blue-400" />
                {product.location}
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-xs font-bold text-slate-300">
                <Clock size={14} className="text-violet-400" />
                Usage: {product.usage}
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-base mb-8 border-l-2 border-white/10 pl-6 italic">
              {product.description}
            </p>

            {/* Pricing Section */}
            <div className="bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-white/10 p-8 rounded-[2.5rem] mb-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                <Tag size={120} />
              </div>
              
              <div className="relative z-10">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2">Current Range</p>
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-5xl font-black">${product.price_min}</span>
                  <span className="text-slate-500 font-bold text-2xl">—</span>
                  <span className="text-5xl font-black">${product.price_max}</span>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: "#3b82f6" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-900/40 flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                >
                  Place A Bid Now
                </motion.button>
              </div>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Item Condition</p>
                <p className="font-bold text-sm capitalize">{product.condition}</p>
              </div>
              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Posted On</p>
                <p className="font-bold text-sm">
                  {new Date(product.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
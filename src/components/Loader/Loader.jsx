import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030014] overflow-hidden">
            {/* Background Background Glows */}
            <motion.div 
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3] 
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/20 blur-[120px] rounded-full"
            />
            
            <div className="relative flex flex-col items-center">
                {/* --- The Core Animated Loader --- */}
                <div className="relative w-24 h-24 mb-8">
                    {/* Outer Rotating Ring */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-t-2 border-r-2 border-cyan-500 rounded-full"
                    />
                    
                    {/* Inner Rotating Ring (Reverse) */}
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 border-b-2 border-l-2 border-violet-500 rounded-full opacity-50"
                    />

                    {/* Center Glowing Dot */}
                    <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                    />
                </div>

                {/* --- Text Animation --- */}
                <div className="text-center space-y-2">
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-white font-black text-xl tracking-[0.2em] uppercase"
                    >
                        Syncing <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">Nexus</span>
                    </motion.h2>
                    
                    {/* Progress Bar Line */}
                    <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                        <motion.div 
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                        />
                    </div>
                    
                    <motion.p 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em]"
                    >
                        Initializing Assets...
                    </motion.p>
                </div>
            </div>

            {/* Subtle Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
    );
};

export default Loader;
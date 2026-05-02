import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User, Menu, X, Rocket } from 'lucide-react';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Scroll korle Navbar-er style change korar jonno
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSignOut = () => {
        signOutUser()
            .then(() => console.log('signedOut'))
            .catch((err) => console.log(err));
    };

    const links = [
        { name: 'Home', path: '/' },
        { name: 'All Products', path: '/allProducts' },
        ...(user ? [
            { name: 'My Products', path: '/myProducts' },
            { name: 'My Bids', path: `/myBids?email=${user.email}` },
            { name: 'Add Product', path: '/addProduct' }
        ] : [])
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
                isScrolled 
                ? 'py-3 px-6 md:px-12' 
                : 'py-6 px-4 md:px-8'
            }`}
        >
            <div className={`mx-auto max-w-7xl rounded-[2rem] transition-all duration-500 ${
                isScrolled 
                ? 'bg-white/10 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]' 
                : 'bg-transparent'
            }`}>
                <div className="flex items-center justify-between px-6 py-3">
                    
                    {/* --- Logo --- */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-violet-500/50">
                            <Rocket size={20} className="text-white" />
                        </div>
                        <span className="text-2xl font-black text-white tracking-tighter">
                            Smart<span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">Deals</span>
                        </span>
                    </Link>

                    {/* --- Desktop Links --- */}
                    <ul className="hidden lg:flex items-center gap-8">
                        {links.map((link) => (
                            <li key={link.path}>
                                <NavLink 
                                    to={link.path}
                                    className={({ isActive }) => `
                                        relative text-sm font-bold uppercase tracking-widest transition-all
                                        ${isActive ? 'text-violet-400' : 'text-slate-300 hover:text-white'}
                                    `}
                                >
                                    {({ isActive }) => (
                                        <>
                                            {link.name}
                                            {isActive && (
                                                <motion.div 
                                                    layoutId="nav-glow"
                                                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 to-transparent shadow-[0_0_8px_#8b5cf6]"
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* --- Auth Section --- */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-3 bg-white/5 p-1 pr-4 rounded-full border border-white/10">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-violet-500">
                                    <img src={user?.photoURL || "https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="} alt={user?.displayName || "User"} />
                                </div>
                                <button 
                                    onClick={handleSignOut}
                                    className="flex items-center gap-2 text-xs font-bold text-white hover:text-red-400 transition-colors"
                                >
                                    <LogOut size={14} /> LOGOUT
                                </button>
                            </div>
                        ) : (
                            <Link 
                                to="/register"
                                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-white text-black font-black text-xs rounded-full hover:bg-violet-500 hover:text-white transition-all transform active:scale-95"
                            >
                                JOIN NOW
                            </Link>
                        )}

                        {/* Mobile Toggle */}
                        <button 
                            className="lg:hidden text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Mobile Menu --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden absolute top-24 left-6 right-6 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden z-50 shadow-2xl"
                    >
                        <ul className="flex flex-col p-6 gap-4">
                            {links.map((link) => (
                                <li key={link.path}>
                                    <NavLink 
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        to={link.path}
                                        className="text-xl font-bold text-slate-300 active:text-violet-400 block"
                                    >
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                            {!user && (
                                <Link 
                                    to="/register" 
                                    className="w-full py-4 bg-violet-600 text-center rounded-2xl font-black"
                                >
                                    GET STARTED
                                </Link>
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
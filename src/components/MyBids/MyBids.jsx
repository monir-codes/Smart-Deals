import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Gavel, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const MyBids = () => {
    const { user } = useContext(AuthContext);
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/bids?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setBids(data);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
            case 'accepted': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
            case 'rejected': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
            default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
        }
    };

    if (loading) return <div className="min-h-screen bg-[#030014] flex items-center justify-center text-white">Loading Bids...</div>;

    return (
        <div className="min-h-screen bg-[#030014] py-32 px-6">
            <div className="container mx-auto max-w-6xl">
                
                {/* Header Section */}
                <div className="mb-12">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 text-cyan-400 font-bold text-xs uppercase tracking-[0.3em] mb-4"
                    >
                        <Gavel size={18} /> Activity Tracker
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-white"
                    >
                        My Submitted <span className="text-violet-500 italic">Bids</span>
                    </motion.h2>
                </div>

                {/* Table Container */}
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 text-slate-400 uppercase text-[10px] font-black tracking-widest">
                                    <th className="px-8 py-6">Product Info</th>
                                    <th className="px-8 py-6 text-center">Your Bid</th>
                                    <th className="px-8 py-6">Deadline</th>
                                    <th className="px-8 py-6">Status</th>
                                    <th className="px-8 py-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {bids.map((bid, index) => (
                                    <motion.tr 
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        key={bid._id} 
                                        className="hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
                                                    <Gavel className="text-violet-400" size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors">{bid.product_title}</p>
                                                    <p className="text-slate-500 text-xs">{bid.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className="text-lg font-black text-white">${bid.bid_amount}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-slate-400 text-xs">
                                                <Clock size={14} />
                                                {bid.deadline}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(bid.status)}`}>
                                                {bid.status || 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button 
                                                disabled={bid.status === 'accepted'}
                                                className="text-xs font-bold text-white bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 border border-white/10 px-4 py-2 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                Complete
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Empty State */}
                        {bids.length === 0 && (
                            <div className="text-center py-20">
                                <AlertCircle className="mx-auto text-slate-600 mb-4" size={48} />
                                <p className="text-slate-500 font-medium tracking-wide">You haven't placed any bids yet.</p>
                                <button className="mt-4 text-cyan-400 font-bold text-sm hover:underline">Start Bidding</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyBids;
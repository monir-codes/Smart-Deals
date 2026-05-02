import React, { useState, useContext } from "react";
import { useLoaderData, useNavigate, Link } from "react-router";
import { motion } from "framer-motion";
import { 
  Gavel, ArrowLeft, ShieldCheck, 
  AlertCircle, DollarSign, Timer, Briefcase 
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const BidForm = () => {
  const product = useLoaderData(); // Router loader theke data ashbe
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Submission Handler
  const handleBidSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  
  // Form input theke data nita hobe
  const bid_amount = parseFloat(form.bidAmount.value);

  // Validation
  if (bid_amount <= product?.price_min) {
    return toast.error(`Bid must be higher than $${product.price_min}`);
  }

  const bidData = {
    bidder_name: user?.displayName,     // AuthContext theke
    bidder_email: user?.email,          // AuthContext theke
    bidder_image: user?.photoURL || "https://i.pravatar.cc/150", 
    bid_amount: bid_amount,             // Form input theke
    bid_time: new Date().toISOString(), // Current ISO time
    status: "pending"                   // Initial status
  };

  setIsSubmitting(true);

  try {
    const response = await axiosSecure.post('/bids', bidData);

    if (response.data.success) {
      toast.success("Bid submitted successfully!");
      navigate("/my-bids");
    } else {
      toast.error("Failed to submit bid");
    }
  } catch (err) {
    toast.error("Network error!");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-[#030014] text-white py-24 px-6 relative overflow-hidden flex items-center justify-center">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-3xl relative z-10"
      >
        {/* Navigation */}
        <Link to={`/api/productDetails/${product._id}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-6 group transition-all">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Return to Details</span>
        </Link>

        <div className="bg-[#0a0a16]/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-5 h-full">
            
            {/* Left Info Panel */}
            <div className="md:col-span-2 bg-white/5 p-8 border-r border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
                  <Gavel size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-black mb-2 tracking-tight">Bid Summary</h2>
                <p className="text-slate-500 text-xs leading-relaxed mb-8">
                  You are placing a bid for <span className="text-white font-bold">{product.title}</span>.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                       <DollarSign size={14} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Starting At</p>
                      <p className="font-bold">${product.price_min}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                       <Briefcase size={14} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Category</p>
                      <p className="font-bold">{product.category}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <div className="flex gap-2 text-blue-400 mb-2">
                  <AlertCircle size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Notice</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Bids are binding. Please ensure your details are correct before confirming.
                </p>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="md:col-span-3 p-8 md:p-12">
              <form onSubmit={handleBidSubmit} className="space-y-6">
                
                {/* Bid Amount Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Your Price (USD)</label>
                  <div className="relative group">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input 
                      type="number"
                      name="bidAmount"
                      required
                      placeholder={`More than ${product.price_min}`}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-bold outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                  </div>
                </div>

                {/* Deadline Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Proposed Deadline</label>
                  <div className="relative">
                    <Timer className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
                    <input 
                      type="date"
                      name="deadline"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-bold outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* User Info (Read-only) */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                  <img src={user?.photoURL} className="w-10 h-10 rounded-xl object-cover border border-white/10" alt="" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Bidding as</p>
                    <p className="text-xs font-bold text-slate-200">{user?.displayName || user?.email}</p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 uppercase tracking-widest text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Uploading Bid...
                    </span>
                  ) : (
                    <>Confirm & Place Bid</>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 opacity-30 group">
                   <ShieldCheck size={14} />
                   <span className="text-[8px] font-bold uppercase tracking-[0.3em]">Secure Transaction Protocol</span>
                </div>
              </form>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BidForm;
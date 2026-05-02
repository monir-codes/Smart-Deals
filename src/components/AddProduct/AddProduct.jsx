import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { 
  PackagePlus, DollarSign, MapPin, 
  Phone, Layout, Type, Image as ImageIcon 
} from 'lucide-react';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    
    // Form theke data collect kora
    const productData = {
      title: form.title.value,
      price_min: parseFloat(form.price_min.value),
      price_max: parseFloat(form.price_max.value),
      email: user?.email, // Logged in user email
      category: form.category.value,
      created_at: new Date().toISOString(),
      image: form.image.value,
      status: "pending", // Default status
      location: form.location.value,
      seller_image: user?.photoURL || "https://i.pravatar.cc/150",
      seller_name: user?.displayName,
      condition: form.condition.value,
      usage: form.usage.value,
      description: form.description.value,
      seller_contact: form.seller_contact.value
    };

    try {
      const res = await axiosSecure.post('/products', productData);

      if (res.data.insertedId) {
        toast.success("Product listed successfully! 🚀");
        navigate('/allProducts');
      } else {
        toast.error("Failed to list product.");
      }
    } catch (err) {
      toast.error("Server connection failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] pt-28 pb-20 px-6">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-white">List Your <span className="text-cyan-400">Asset</span></h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">Fill in the details for your marketplace entry</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Title */}
            <div className="lg:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Product Title</label>
              <input required name="title" type="text" placeholder="e.g. Nordic Style Fabric Sofa" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-cyan-500/50" />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Category</label>
              <select name="category" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-cyan-500/50 appearance-none">
                <option value="Furniture" className="bg-[#030014]">Furniture</option>
                <option value="Electronics" className="bg-[#030014]">Electronics</option>
                <option value="Fashion" className="bg-[#030014]">Fashion</option>
              </select>
            </div>

            {/* Prices */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Min Price ($)</label>
              <input required name="price_min" type="number" placeholder="350" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-cyan-500/50" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Max Price ($)</label>
              <input required name="price_max" type="number" placeholder="500" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-cyan-500/50" />
            </div>

            {/* Condition */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Condition</label>
              <select name="condition" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-cyan-500/50 appearance-none">
                <option value="new" className="bg-[#030014]">New</option>
                <option value="used" className="bg-[#030014]">Used</option>
              </select>
            </div>

            {/* Location & Contact */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Location</label>
              <input required name="location" type="text" placeholder="Dhaka, BD" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-cyan-500/50" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Seller Contact</label>
              <input required name="seller_contact" type="text" placeholder="+88017..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-cyan-500/50" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Usage</label>
              <input required name="usage" type="text" placeholder="Brand New / 6 Months" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-cyan-500/50" />
            </div>

            {/* Image URL */}
            <div className="lg:col-span-3 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Image URL</label>
              <input required name="image" type="url" placeholder="https://images.pexels.com/..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-cyan-500/50" />
            </div>

            {/* Description */}
            <div className="lg:col-span-3 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Description</label>
              <textarea required name="description" rows="4" placeholder="Describe your product..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-cyan-500/50 resize-none"></textarea>
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-10 bg-cyan-500 hover:bg-cyan-400 text-[#030014] font-black py-5 rounded-2xl uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3"
          >
            {loading ? "Syncing to Database..." : "Publish Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
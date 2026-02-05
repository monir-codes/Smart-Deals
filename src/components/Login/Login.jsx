import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Chrome, ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import Swal from 'sweetalert2'; // Optional: Sundor alert er jonno

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Email/Password Login
  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        setLoading(false);
        // Success Message
        Swal.fire({
          icon: 'success',
          title: 'Welcome Back!',
          background: '#1a1a2e',
          color: '#fff',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/'); // Login hoye gele home-e niye jabe
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid email or password!',
          background: '#1a1a2e',
          color: '#fff'
        });
      });
  };

  // Google Login
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center px-4 py-20 overflow-hidden relative">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl grid lg:grid-cols-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl z-10"
      >
        
        {/* Left Column: Form Section */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors text-sm font-bold tracking-widest">
            <ArrowLeft size={16} /> BACK TO HOME
          </Link>

          <div className="mb-10">
            <h1 className="text-4xl font-black text-white tracking-tight">Welcome <span className="text-blue-400">Back.</span></h1>
            <p className="text-slate-400 mt-2 font-medium">Log in to manage your products and bids.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSignIn}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  required
                  name="email"
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500/50 transition-all" 
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Password</label>
                <button type="button" className="text-[10px] font-bold text-blue-400 hover:underline">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  required
                  name="password"
                  type="password" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500/50 transition-all" 
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button 
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-sm"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <LogIn size={18} />}
              {loading ? "Authenticating..." : "Login Now"}
            </motion.button>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <span className="relative px-4 text-xs font-bold text-slate-600 bg-[#030014]/80 backdrop-blur-sm">SECURE GATEWAY</span>
          </div>

          <button 
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all"
          >
            <Chrome size={20} className="text-blue-400" />
            <span>Continue with Google</span>
          </button>

          <p className="text-center mt-8 text-sm text-slate-500">
            Don't have an account? <Link to="/register" className="text-blue-400 font-bold hover:underline">Register</Link>
          </p>
        </div>

        {/* Right Column: Branding */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-blue-600/20 to-violet-600/20 items-center justify-center p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <div className="relative z-10 text-center">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] shadow-2xl max-w-xs mx-auto"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/40">
                <ShieldCheck size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-black text-white mb-2 tracking-tighter uppercase">Enterprise Security</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Your credentials are encrypted and never stored in plain text. 
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
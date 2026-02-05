import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, Chrome, UserPlus, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';

const Register = () => {
  const { signInWithGoogle, createUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- DB Connection Function ---
  const saveUserToDb = (name, email, image) => {
    const newUser = { name, email, image };
    return fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newUser),
    }).then((res) => res.json());
  };

  // Email & Password Registration
  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    
    const name = e.target.name.value; // Name field dorkar
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = "https://i.ibb.co/vzS8Lp6/user-placeholder.png"; // Default image

    createUser(email, password)
      .then((result) => {
        // Firebase-e user toiri hoyeche, ekhon DB-te pathabo
        saveUserToDb(name, email, photo)
          .then((data) => {
            setLoading(false);
            Swal.fire({
              icon: 'success',
              title: 'Account Created!',
              text: 'User data synced with database.',
              background: '#1a1a2e',
              color: '#fff',
              timer: 2000,
              showConfirmButton: false
            });
            navigate('/');
          });
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message,
          background: '#1a1a2e',
          color: '#fff'
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        saveUserToDb(result.user.displayName, result.user.email, result.user.photoURL)
          .then(() => navigate('/'));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#030014] overflow-hidden px-4 py-40">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-white">Join <span className="text-violet-400">Us</span></h1>
          </div>

          <form className="space-y-6" onSubmit={handleRegister}>
            {/* Name Field (DB er jonno dorkar) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <input required name="name" type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white outline-none focus:border-violet-500" placeholder="John Doe" />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition-colors" size={18} />
                <input required name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white outline-none focus:border-violet-500" placeholder="name@example.com" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition-colors" size={18} />
                <input required name="password" type="password" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white outline-none focus:border-violet-500" placeholder="••••••••" />
              </div>
            </div>

            <motion.button 
              disabled={loading}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <UserPlus size={18} />}
              {loading ? "Syncing..." : "Create Account"}
            </motion.button>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <span className="relative px-4 text-[10px] font-black text-slate-600 bg-transparent uppercase tracking-[0.3em]">Quick Access</span>
          </div>

          <motion.button 
            type="button"
            whileHover={{ y: -2 }} onClick={handleGoogleSignIn}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all"
          >
            <Chrome size={20} className="text-cyan-400" />
            <span>Google One-Tap</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
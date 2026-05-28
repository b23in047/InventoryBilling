import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../apiConfig";

function Signup() {
  const [data, setData] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");

  const signup = async () => {
    try {
      setError("");
      const res = await axios.post(`${API_URL}/api/auth/register`, data);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      } else {
        setError(res.data.error || "Failed to create account.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Registration failed. Please check your internet or database connection.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-950 p-4 font-sans selection:bg-blue-500/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full -z-10" />
      
      <div className="bg-gray-900/50 backdrop-blur-xl p-10 rounded-3xl shadow-2xl shadow-blue-500/10 w-full max-w-md border border-white/10">

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
            <span className="text-2xl font-bold italic text-white text-shadow-glow">i</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
          <p className="text-gray-400 mt-2">Join the Precision Inventory Network</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 mb-6 rounded-xl text-sm animate-shake">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Full Name</label>
            <input
              type="text"
              placeholder="Your Name"
              onChange={e => setData({ ...data, name: e.target.value })}
              className="bg-gray-800/50 border border-white/10 text-white p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              onChange={e => setData({ ...data, email: e.target.value })}
              className="bg-gray-800/50 border border-white/10 text-white p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Choose Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={e => setData({ ...data, password: e.target.value })}
              className="bg-gray-800/50 border border-white/10 text-white p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-600"
            />
          </div>

          <button
            onClick={signup}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold w-full p-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2 mt-4"
          >
            Create Your Station
            <span className="text-lg">→</span>
          </button>
        </div>

        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-500 text-sm">
            Already have an account? <Link to="/login/user" className="text-blue-400 font-bold hover:text-blue-300 transition-colors">Login</Link>
          </p>
          <div className="pt-4 border-t border-white/5">
            <Link to="/" className="text-gray-600 text-xs hover:text-gray-400 transition-colors inline-flex items-center gap-1">
              <span>←</span> Back to Home
            </Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .text-shadow-glow { text-shadow: 0 0 10px rgba(255,255,255,0.5); }
      `}</style>
    </div>
  );
}

export default Signup;

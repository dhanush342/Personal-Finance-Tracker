import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as apiRegister } from "../services/auth.ts";
import { useAuth } from "../context/AuthContext";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Za-z]/.test(pwd)) return "Password must contain at least one letter";
    if (!/[0-9]/.test(pwd)) return "Password must contain at least one number";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    
    setLoading(true);
    try {
      const data = await apiRegister(name, email, password);
      await login(data.token);
      navigate('/');
    } catch (err: any) {
      const errorMessage = err.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          className="w-full p-2 border rounded" 
          placeholder="Full name" 
          value={name} 
          onChange={e => setName(e.target.value)}
          required
          disabled={loading}
        />
        <input 
          className="w-full p-2 border rounded" 
          placeholder="Email" 
          type="email"
          value={email} 
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <div>
          <input 
            type="password" 
            className="w-full p-2 border rounded" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            At least 6 characters with letters and numbers
          </p>
        </div>
        <button 
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Login</a>
      </p>
    </div>
  );
}

export default RegisterPage;

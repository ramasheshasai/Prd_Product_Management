import React, { useState } from 'react';

interface AuthPageProps {
  onAuthenticate: (data: { name: string; email: string; password: string }) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthenticate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // New state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    onAuthenticate({ name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-900">Create an Account</h2>

        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
        )}

        <label className="block mb-3">
          <span className="text-primary-900 font-semibold">Name</span>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-olive-700" 
            required
          />
        </label>

        <label className="block mb-3">
          <span className="text-primary-900 font-semibold">Email</span>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-olive-700" 
            required
          />
        </label>

        <label className="block mb-3">
          <span className="text-primary-900 font-semibold">Password</span>
          <input 
            type={showPassword ? 'text' : 'password'} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-olive-700" 
            required
          />
        </label>

        <label className="block mb-3">
          <span className="text-primary-900 font-semibold">Confirm Password</span>
          <input 
            type={showPassword ? 'text' : 'password'} 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-olive-700" 
            required
          />
        </label>

        {/* Show password toggle */}
        <label className="inline-flex items-center mb-6 cursor-pointer">
          <input 
            type="checkbox" 
            checked={showPassword} 
            onChange={() => setShowPassword(!showPassword)} 
            className="form-checkbox h-5 w-5 text-olive-700" 
          />
          <span className="ml-2 text-primary-900 font-semibold">Show Password</span>
        </label>

        <button 
          type="submit"
          className="w-full bg-olive-700 text-white py-3 rounded-lg font-semibold hover:bg-olive-800 transition-colors"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default AuthPage;

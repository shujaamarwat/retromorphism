import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/lib/store';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useStore();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          // Create user profile
          const { error: profileError } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              display_name: email.split('@')[0],
              total_xp: 0,
              level: 1,
              streak_count: 0,
            });

          if (profileError) throw profileError;

          // Create default virtuas
          const defaultVirtuas = [
            { name: 'Focus Spirit', domain: 'Focus' },
            { name: 'Fitness Guardian', domain: 'Fitness' },
            { name: 'Learning Sage', domain: 'Learning' },
          ];

          for (const virtua of defaultVirtuas) {
            await supabase.from('virtuas').insert({
              user_id: data.user.id,
              name: virtua.name,
              domain: virtua.domain,
              level: 1,
              xp: 0,
              evolution_stage: 1,
            });
          }
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
      }

      navigate('/dashboard');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primarysolid-10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white-100 p-8 rounded-2xl border-2 border-black-100 shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)]">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-display-32 font-display-32-black text-black-100 mb-2">
              MindForge
            </h1>
            <p className="text-text-16-reg font-text-16-reg text-black-60">
              Transform your goals into epic quests
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                         text-text-16-reg font-text-16-reg text-black-100 placeholder-black-60
                         focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                         text-text-16-reg font-text-16-reg text-black-100 placeholder-black-60
                         focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </Button>
          </form>

          {/* Toggle */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-text-14-reg font-text-14-reg text-secondarysolid-60 hover:text-secondarysolid-70"
            >
              {isSignUp 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
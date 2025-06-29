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
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useStore();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          setError('Account created successfully! Please sign in to continue.');
          setIsSignUp(false);
          setEmail('');
          setPassword('');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            throw new Error('Invalid email or password. Please check your credentials and try again.');
          }
          throw error;
        }

        if (data.user) {
          // Check if user profile exists
          const { data: existingProfile } = await supabase
            .from('users')
            .select('id')
            .eq('id', data.user.id)
            .single();

          // If no profile exists, create one
          if (!existingProfile) {
            const { error: profileError } = await supabase
              .from('users')
              .insert({
                id: data.user.id,
                display_name: email.split('@')[0],
                total_xp: 0,
                level: 1,
                streak_count: 0,
              });

            if (profileError) {
              console.error('Profile creation error:', profileError);
              // Don't throw here, as the user is already signed in
            }

            // Create default virtuas
            const defaultVirtuas = [
              { name: 'Focus Spirit', domain: 'Focus' },
              { name: 'Fitness Guardian', domain: 'Fitness' },
              { name: 'Learning Sage', domain: 'Learning' },
            ];

            for (const virtua of defaultVirtuas) {
              const { error: virtuaError } = await supabase.from('virtuas').insert({
                user_id: data.user.id,
                name: virtua.name,
                domain: virtua.domain,
                level: 1,
                xp: 0,
                evolution_stage: 1,
              });

              if (virtuaError) {
                console.error('Virtua creation error:', virtuaError);
                // Don't throw here, continue with other virtuas
              }
            }
          }

          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      setError(error.message);
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

          {/* Error Message */}
          {error && (
            <div className={`mb-4 p-3 rounded-lg ${
              error.includes('successfully') 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`text-sm ${
                error.includes('successfully') ? 'text-green-600' : 'text-red-600'
              }`}>
                {error}
              </p>
            </div>
          )}

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
                minLength={6}
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
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
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
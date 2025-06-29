import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '@/lib/store';
import { ArrowLeft, Sparkles, Zap, Target, Trophy } from 'lucide-react';

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

          navigate('/app/dashboard');
        }
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primarysolid-10 flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back to Landing */}
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-text-14-reg font-text-14-reg text-black-60 hover:text-black-100 mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="bg-white-100 p-8 rounded-2xl border-2 border-black-100 shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)]">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primarysolid-50 rounded-xl flex items-center justify-center border-2 border-black-100">
                  <Sparkles className="text-black-100" size={20} />
                </div>
                <h1 className="text-title-24 font-title-24-black text-black-100">
                  MindForge
                </h1>
              </div>
              <h2 className="text-title-20 font-title-20-black text-black-100 mb-2">
                {isSignUp ? 'Start Your Adventure' : 'Welcome Back, Adventurer'}
              </h2>
              <p className="text-text-16-reg font-text-16-reg text-black-60">
                {isSignUp 
                  ? 'Create your account and begin your productivity journey'
                  : 'Sign in to continue your epic productivity quest'
                }
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
                {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
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

            {/* Features Preview */}
            <div className="mt-8 pt-6 border-t border-black-20">
              <p className="text-caption-11-med font-caption-11-med text-black-60 text-center mb-4">
                What awaits you in MindForge:
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-8 h-8 bg-primarysolid-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Target className="text-black-100" size={16} />
                  </div>
                  <p className="text-caption-10-reg font-caption-10-reg text-black-60">
                    Epic Quests
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-secondarysolid-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Zap className="text-white-100" size={16} />
                  </div>
                  <p className="text-caption-10-reg font-caption-10-reg text-black-60">
                    AI Virtuas
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-warning-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Trophy className="text-white-100" size={16} />
                  </div>
                  <p className="text-caption-10-reg font-caption-10-reg text-black-60">
                    Achievements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Visual/Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primarysolid-50 to-secondarysolid-50 items-center justify-center p-8">
        <div className="text-center text-black-100 max-w-md">
          <div className="w-24 h-24 bg-white-100 rounded-full border-4 border-black-100 flex items-center justify-center mx-auto mb-8">
            <Sparkles className="text-primarysolid-60" size={40} />
          </div>
          
          <h2 className="text-display-32 font-display-32-black mb-4">
            Level Up Your Life
          </h2>
          
          <p className="text-text-18-reg font-text-18-reg mb-8 opacity-90">
            Transform your daily tasks into epic adventures. Build habits, 
            train digital companions, and unlock your full potential.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white-100 bg-opacity-20 rounded-xl border border-black-100">
              <p className="text-title-20 font-title-20-black">50K+</p>
              <p className="text-caption-11-reg font-caption-11-reg opacity-80">Active Users</p>
            </div>
            <div className="p-4 bg-white-100 bg-opacity-20 rounded-xl border border-black-100">
              <p className="text-title-20 font-title-20-black">2M+</p>
              <p className="text-caption-11-reg font-caption-11-reg opacity-80">Tasks Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
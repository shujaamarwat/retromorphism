import React, { useState } from 'react';
import { 
  Play, 
  Zap, 
  Target, 
  Trophy, 
  Users, 
  Star, 
  ArrowRight, 
  CheckCircle,
  Sparkles,
  TrendingUp,
  Shield,
  Smartphone,
  Globe,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      navigate('/login');
    }
  };

  const features = [
    {
      icon: Target,
      title: 'Epic Quests',
      description: 'Transform your goals into exciting RPG-style adventures with clear objectives and rewards.',
      color: 'bg-primarysolid-50'
    },
    {
      icon: Zap,
      title: 'Digital Companions',
      description: 'Train AI-powered Virtuas that grow stronger as you complete tasks and build habits.',
      color: 'bg-secondarysolid-50'
    },
    {
      icon: Trophy,
      title: 'Achievement System',
      description: 'Collect rare runes and unlock achievements as you master productivity and reach milestones.',
      color: 'bg-warning-50'
    },
    {
      icon: TrendingUp,
      title: 'Smart Analytics',
      description: 'Get AI-powered insights into your productivity patterns and personalized recommendations.',
      color: 'bg-success-50'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Product Manager',
      avatar: '👩‍💼',
      quote: 'MindForge turned my chaotic task list into an engaging game. I\'ve never been more productive!',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Software Developer',
      avatar: '👨‍💻',
      quote: 'The Virtua system is genius. Watching my Focus companion evolve keeps me motivated every day.',
      rating: 5
    },
    {
      name: 'Emily Johnson',
      role: 'Entrepreneur',
      avatar: '👩‍🚀',
      quote: 'Finally, a productivity app that doesn\'t feel like work. The gamification is perfectly balanced.',
      rating: 5
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '2M+', label: 'Tasks Completed' },
    { number: '98%', label: 'User Satisfaction' },
    { number: '4.9★', label: 'App Store Rating' }
  ];

  return (
    <div className="min-h-screen bg-primarysolid-10">
      {/* Navigation */}
      <nav className="bg-white-100 border-b-2 border-black-100 shadow-[0_2px_0_#001428] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primarysolid-50 rounded-xl flex items-center justify-center border-2 border-black-100">
                <Sparkles className="text-black-100" size={16} />
              </div>
              <span className="text-title-20 font-title-20-black text-black-100">
                MindForge
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-text-16-reg font-text-16-reg text-black-70 hover:text-black-100">
                Features
              </a>
              <a href="#how-it-works" className="text-text-16-reg font-text-16-reg text-black-70 hover:text-black-100">
                How It Works
              </a>
              <a href="#testimonials" className="text-text-16-reg font-text-16-reg text-black-70 hover:text-black-100">
                Reviews
              </a>
              <a href="#pricing" className="text-text-16-reg font-text-16-reg text-black-70 hover:text-black-100">
                Pricing
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button onClick={handleGetStarted} className="gap-2">
                Get Started
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-success-20 rounded-full border border-success-50">
                  <Star className="text-success-60" size={16} />
                  <span className="text-caption-11-med font-caption-11-med text-success-70">
                    #1 Gamified Productivity Platform
                  </span>
                </div>
                
                <h1 className="text-display-48 font-display-48-black text-black-100 leading-tight">
                  Transform Your
                  <span className="text-primarysolid-60"> Goals </span>
                  Into Epic
                  <span className="text-secondarysolid-60"> Adventures</span>
                </h1>
                
                <p className="text-text-18-reg font-text-18-reg text-black-70 max-w-lg">
                  MindForge turns productivity into an engaging RPG experience. Complete quests, 
                  train digital companions, and unlock achievements while crushing your real-world goals.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={handleGetStarted}
                  className="gap-3 text-text-18-med font-text-18-med px-8 py-4"
                >
                  <Play size={20} />
                  Start Your Adventure
                </Button>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex -space-x-2">
                  {['👩‍💼', '👨‍💻', '👩‍🚀', '👨‍🎨', '👩‍🔬'].map((avatar, i) => (
                    <div 
                      key={i}
                      className="w-10 h-10 bg-white-100 rounded-full border-2 border-black-100 flex items-center justify-center text-lg"
                    >
                      {avatar}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-text-14-med font-text-14-med text-black-100">
                    Join 50,000+ productive adventurers
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-warning-50 fill-current" size={14} />
                    ))}
                    <span className="text-caption-11-reg font-caption-11-reg text-black-60 ml-1">
                      4.9/5 rating
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="relative bg-white-100 rounded-2xl border-2 border-black-100 shadow-[0_8px_0_#001428,0_12px_16px_rgba(0,20,40,0.3)] p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primarysolid-50 rounded-full flex items-center justify-center">
                      <Target className="text-black-100" size={16} />
                    </div>
                    <h3 className="text-title-16 font-title-16-black text-black-100">
                      Daily Quest: Morning Routine
                    </h3>
                  </div>
                  
                  <div className="space-y-2">
                    {[
                      { task: 'Drink water', completed: true },
                      { task: 'Exercise for 30 minutes', completed: true },
                      { task: 'Meditate', completed: false },
                      { task: 'Plan the day', completed: false }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 bg-primarysolid-10 rounded-lg">
                        <CheckCircle 
                          className={item.completed ? 'text-success-60' : 'text-black-30'} 
                          size={16} 
                        />
                        <span className={`text-text-14-reg font-text-14-reg ${item.completed ? 'text-black-60 line-through' : 'text-black-100'}`}>
                          {item.task}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-black-20">
                    <span className="text-caption-11-reg font-caption-11-reg text-black-60">
                      Progress: 2/4 tasks
                    </span>
                    <div className="flex items-center gap-1">
                      <Zap className="text-primarysolid-60" size={12} />
                      <span className="text-caption-11-med font-caption-11-med text-primarysolid-60">
                        +50 XP
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-warning-50 rounded-full border-2 border-black-100 flex items-center justify-center animate-bounce">
                <Trophy className="text-white-100" size={24} />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-success-50 rounded-full border-2 border-black-100 flex items-center justify-center animate-pulse">
                <Star className="text-white-100" size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white-100 border-y-2 border-black-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-display-32 font-display-32-black text-primarysolid-60 mb-2">
                  {stat.number}
                </p>
                <p className="text-text-16-reg font-text-16-reg text-black-60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display-32 font-display-32-black text-black-100 mb-4">
              Productivity Meets Gaming
            </h2>
            <p className="text-text-18-reg font-text-18-reg text-black-70 max-w-2xl mx-auto">
              Experience the perfect blend of productivity tools and gaming mechanics 
              that make achieving your goals genuinely fun and engaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="p-6 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428] hover:shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] hover:transform hover:-translate-y-1 transition-all duration-200"
                >
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="text-white-100" size={24} />
                  </div>
                  <h3 className="text-title-18 font-title-18-black text-black-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-14-reg font-text-14-reg text-black-60">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-secondarysolid-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display-32 font-display-32-black text-black-100 mb-4">
              Your Adventure Starts Here
            </h2>
            <p className="text-text-18-reg font-text-18-reg text-black-70 max-w-2xl mx-auto">
              Get started in minutes and transform your productivity journey into an epic adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Create Your Profile',
                description: 'Sign up and customize your productivity adventure. Choose your first Virtua companion.',
                icon: Users
              },
              {
                step: '02',
                title: 'Set Epic Quests',
                description: 'Transform your goals into engaging quests with clear objectives and rewards.',
                icon: Target
              },
              {
                step: '03',
                title: 'Level Up & Achieve',
                description: 'Complete tasks, earn XP, unlock achievements, and watch your Virtuas evolve.',
                icon: Trophy
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-primarysolid-50 rounded-full border-2 border-black-100 flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-black-100" size={24} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-warning-50 rounded-full border-2 border-black-100 flex items-center justify-center">
                      <span className="text-text-12-med font-text-12-med text-black-100">
                        {step.step}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-title-18 font-title-18-black text-black-100 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-14-reg font-text-14-reg text-black-60">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display-32 font-display-32-black text-black-100 mb-4">
              Loved by Productive Adventurers
            </h2>
            <p className="text-text-18-reg font-text-18-reg text-black-70 max-w-2xl mx-auto">
              Join thousands of users who have transformed their productivity with MindForge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-warning-50 fill-current" size={16} />
                  ))}
                </div>
                <p className="text-text-16-reg font-text-16-reg text-black-70 mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primarysolid-50 rounded-full border-2 border-black-100 flex items-center justify-center">
                    <span className="text-lg">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="text-text-14-med font-text-14-med text-black-100">
                      {testimonial.name}
                    </p>
                    <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-primarysolid-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display-32 font-display-32-black text-black-100 mb-4">
              Choose Your Adventure
            </h2>
            <p className="text-text-18-reg font-text-18-reg text-black-70 max-w-2xl mx-auto">
              Start free and upgrade when you're ready for more advanced features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Adventurer',
                price: 'Free',
                description: 'Perfect for getting started',
                features: [
                  'Up to 3 Virtuas',
                  'Basic quests & tasks',
                  'Achievement system',
                  'Mobile app access'
                ],
                cta: 'Start Free',
                popular: false
              },
              {
                name: 'Hero',
                price: '$9/month',
                description: 'For serious productivity gamers',
                features: [
                  'Unlimited Virtuas',
                  'Advanced analytics',
                  'Habit chains',
                  'Priority support',
                  'Custom themes'
                ],
                cta: 'Start Free Trial',
                popular: true
              },
              {
                name: 'Legend',
                price: '$19/month',
                description: 'For teams and power users',
                features: [
                  'Everything in Hero',
                  'Team collaboration',
                  'Advanced AI insights',
                  'Custom integrations',
                  'White-label options'
                ],
                cta: 'Contact Sales',
                popular: false
              }
            ].map((plan, index) => (
              <div 
                key={index}
                className={`
                  p-6 bg-white-100 rounded-2xl border-2 relative
                  ${plan.popular 
                    ? 'border-primarysolid-50 shadow-[0_6px_0_#FFDD00,0_8px_12px_rgba(255,221,0,0.3)] transform scale-105' 
                    : 'border-black-100 shadow-[-2px_4px_0px_#001428]'
                  }
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-1 bg-primarysolid-50 rounded-full border-2 border-black-100">
                      <span className="text-caption-11-med font-caption-11-med text-black-100">
                        Most Popular
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-title-20 font-title-20-black text-black-100 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-display-32 font-display-32-black text-primarysolid-60 mb-2">
                    {plan.price}
                  </p>
                  <p className="text-text-14-reg font-text-14-reg text-black-60">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="text-success-60" size={16} />
                      <span className="text-text-14-reg font-text-14-reg text-black-70">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={handleGetStarted}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primarysolid-50 to-secondarysolid-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-display-32 font-display-32-black text-black-100 mb-4">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-text-18-reg font-text-18-reg text-black-70 mb-8 max-w-2xl mx-auto">
            Join thousands of productive adventurers who have gamified their way to success. 
            Start your epic journey today!
          </p>
          
          <form onSubmit={handleEmailSignup} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white-100 border-2 border-black-100 rounded-xl 
                       text-text-16-reg font-text-16-reg text-black-100 placeholder-black-60
                       focus:outline-none focus:ring-2 focus:ring-black-100"
              required
            />
            <Button type="submit" className="gap-2 px-6">
              Start Adventure
              <ArrowRight size={16} />
            </Button>
          </form>
          
          <p className="text-caption-11-reg font-caption-11-reg text-black-60">
            Free to start • No credit card required • 14-day premium trial
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black-100 text-white-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primarysolid-50 rounded-xl flex items-center justify-center">
                  <Sparkles className="text-black-100" size={16} />
                </div>
                <span className="text-title-18 font-title-18-black">
                  MindForge
                </span>
              </div>
              <p className="text-text-14-reg font-text-14-reg text-white-100 opacity-80">
                Transform your productivity into an epic adventure.
              </p>
            </div>

            <div>
              <h4 className="text-title-14 font-title-14-black mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-text-14-reg font-text-14-reg opacity-80 hover:opacity-100">Features</a></li>
                <li><a href="#" className="text-text-14-reg font-text-14-reg opacity-80 hover:opacity-100">Pricing</a></li>
                <li><a href="#" className="text-text-14-reg font-text-14-reg opacity-80 hover:opacity-100">Mobile App</a></li>
                <li><a href="#" className="text-text-14-reg font-text-14-reg opacity-80 hover:opacity-100">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-title-14 font-title-14-black mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-text-14-reg font-text-14-reg opacity-80 hover:opacity-100">About</a></li>
                <li><a href="#" className="text-text-14-reg font-text-14-reg opacity-80 hover:opacity-100">Blog</a></li>
                <li><a href="#" className="text-text-14-reg font-text-14-reg opacity-80 hover:opacity-100">Careers</a></li>
                <li><a href="#" className="text-text-14-reg font-text-14-reg opacity-80 hover:opacity-100">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-title-14 font-title-14-black mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-text-14-reg font-text-14-reg opacity-80 hover:opacity-100">Help Center</a></li>
                <li><a href="#" className="text-text-14-reg font-text-14-reg opacity-80 hover:opacity-100">Community</a></li>
                <li><a href="#" className="text-text-14-reg font-text-14-reg opacity-80 hover:opacity-100">Privacy</a></li>
                <li><a href="#" className="text-text-14-reg font-text-14-reg opacity-80 hover:opacity-100">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white-100 border-opacity-20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-caption-11-reg font-caption-11-reg opacity-60">
              © 2025 MindForge. All rights reserved. Created by Alak Studios
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <Shield size={16} className="opacity-60" />
                <span className="text-caption-11-reg font-caption-11-reg opacity-60">
                  SOC 2 Compliant
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={16} className="opacity-60" />
                <span className="text-caption-11-reg font-caption-11-reg opacity-60">
                  Available Worldwide
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
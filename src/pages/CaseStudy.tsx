import React from 'react';

export const CaseStudy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primarysolid-10 to-secondarysolid-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-display-48 font-display-48-black text-black-100 leading-tight">
                MindForge
              </h1>
              <p className="text-title-24 font-title-24-black text-secondarysolid-60">
                A Gamified Productivity App
              </p>
              <p className="text-text-18-reg font-text-18-reg text-black-70 max-w-2xl mx-auto">
                Transforming real-life goals into epic RPG-style adventures through 
                digital companions, achievement systems, and habit chains.
              </p>
            </div>
            
            {/* Hero Mockup */}
            <div className="mt-12">
              <div className="relative mx-auto max-w-4xl">
                <div className="bg-white-100 rounded-3xl shadow-[0_20px_60px_rgba(0,20,40,0.15)] border-2 border-black-100 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-primarysolid-20 to-secondarysolid-20 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 bg-primarysolid-50 rounded-2xl mx-auto flex items-center justify-center border-2 border-black-100">
                        <span className="text-4xl">🎯</span>
                      </div>
                      <h3 className="text-title-20 font-title-20-black text-black-100">
                        Dashboard Preview
                      </h3>
                      <p className="text-text-14-reg font-text-14-reg text-black-60">
                        Main application interface mockup
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 bg-white-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display-32 font-display-32-black text-black-100 mb-6">
              Project Overview
            </h2>
            <div className="space-y-6">
              <p className="text-text-18-reg font-text-18-reg text-black-70 leading-relaxed">
                MindForge addresses the common struggle of maintaining productivity and building 
                lasting habits by gamifying the entire experience. Traditional productivity apps 
                often feel like work themselves, leading to abandonment and failed goals.
              </p>
              <p className="text-text-18-reg font-text-18-reg text-black-70 leading-relaxed">
                Our solution transforms mundane tasks into engaging quests, introduces AI-powered 
                digital companions that evolve with user progress, and creates a comprehensive 
                achievement system that makes productivity genuinely fun and rewarding.
              </p>
            </div>
          </div>

          {/* Key Goals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-primarysolid-10 rounded-2xl border-2 border-black-100">
              <div className="w-16 h-16 bg-primarysolid-50 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="text-title-16 font-title-16-black text-black-100 mb-2">
                Gamify Productivity
              </h3>
              <p className="text-text-14-reg font-text-14-reg text-black-60">
                Transform boring tasks into engaging RPG-style quests with rewards and progression
              </p>
            </div>

            <div className="text-center p-6 bg-secondarysolid-10 rounded-2xl border-2 border-black-100">
              <div className="w-16 h-16 bg-secondarysolid-50 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-title-16 font-title-16-black text-black-100 mb-2">
                AI Companions
              </h3>
              <p className="text-text-14-reg font-text-14-reg text-black-60">
                Introduce digital Virtuas that grow and evolve based on user achievements and habits
              </p>
            </div>

            <div className="text-center p-6 bg-success-10 rounded-2xl border-2 border-black-100">
              <div className="w-16 h-16 bg-success-50 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-title-16 font-title-16-black text-black-100 mb-2">
                Long-term Engagement
              </h3>
              <p className="text-text-14-reg font-text-14-reg text-black-60">
                Build sustainable habits through streak tracking and progressive difficulty scaling
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-20 bg-primarysolid-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-display-32 font-display-32-black text-black-100 mb-6">
              Design Challenges
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-4px_8px_0px_#001428]">
                <h3 className="text-title-18 font-title-18-black text-error-60 mb-3">
                  User Pain Points
                </h3>
                <ul className="space-y-3 text-text-16-reg font-text-16-reg text-black-70">
                  <li className="flex items-start gap-3">
                    <span className="text-error-50 mt-1">•</span>
                    Productivity apps feel like additional work rather than helpful tools
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-error-50 mt-1">•</span>
                    Lack of motivation to maintain long-term habits and goals
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-error-50 mt-1">•</span>
                    No emotional connection or sense of progress in traditional task managers
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-error-50 mt-1">•</span>
                    Overwhelming interfaces that increase cognitive load instead of reducing it
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-4px_8px_0px_#001428]">
                <h3 className="text-title-18 font-title-18-black text-secondarysolid-60 mb-3">
                  Market Gaps
                </h3>
                <ul className="space-y-3 text-text-16-reg font-text-16-reg text-black-70">
                  <li className="flex items-start gap-3">
                    <span className="text-secondarysolid-50 mt-1">•</span>
                    Limited gamification that goes beyond simple point systems
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondarysolid-50 mt-1">•</span>
                    No AI-powered personalization that adapts to individual user patterns
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondarysolid-50 mt-1">•</span>
                    Lack of comprehensive analytics and insights for productivity patterns
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondarysolid-50 mt-1">•</span>
                    Missing social elements and achievement sharing capabilities
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-20 bg-white-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display-32 font-display-32-black text-black-100 mb-6">
              Design Process
            </h2>
            <p className="text-text-18-reg font-text-18-reg text-black-70 max-w-3xl mx-auto">
              From initial wireframes to polished interfaces, here's how we approached 
              the challenge of making productivity genuinely engaging.
            </p>
          </div>

          {/* Tools Used */}
          <div className="mb-16">
            <h3 className="text-title-20 font-title-20-black text-black-100 text-center mb-8">
              Tools & Methods
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['Figma', 'Notion', 'User Interviews', 'Prototyping', 'A/B Testing'].map((tool) => (
                <div key={tool} className="px-4 py-2 bg-secondarysolid-10 rounded-xl border border-black-100">
                  <span className="text-text-14-med font-text-14-med text-black-100">{tool}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Design Iterations */}
          <div className="space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-title-24 font-title-24-black text-black-100 mb-4">
                  Initial Wireframes
                </h3>
                <p className="text-text-16-reg font-text-16-reg text-black-70 mb-6">
                  Started with low-fidelity wireframes to establish core user flows and 
                  information architecture. Focus was on simplicity and clear navigation patterns.
                </p>
                <ul className="space-y-2 text-text-14-reg font-text-14-reg text-black-60">
                  <li>• Task creation and management flows</li>
                  <li>• Virtua companion interaction patterns</li>
                  <li>• Achievement and progress visualization</li>
                  <li>• Mobile-first responsive considerations</li>
                </ul>
              </div>
              <div className="bg-black-10 rounded-2xl border-2 border-black-100 p-8 aspect-square flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-black-30 rounded-lg mx-auto"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-black-30 rounded w-24 mx-auto"></div>
                    <div className="h-3 bg-black-30 rounded w-16 mx-auto"></div>
                  </div>
                  <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                    Wireframe Mockup
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-primarysolid-10 rounded-2xl border-2 border-black-100 p-8 aspect-square flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-primarysolid-50 rounded-2xl mx-auto flex items-center justify-center border-2 border-black-100">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-primarysolid-50 rounded w-32 mx-auto"></div>
                      <div className="h-3 bg-primarysolid-30 rounded w-24 mx-auto"></div>
                    </div>
                    <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                      High-Fidelity Mockup
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-title-24 font-title-24-black text-black-100 mb-4">
                  Visual Design System
                </h3>
                <p className="text-text-16-reg font-text-16-reg text-black-70 mb-6">
                  Developed a comprehensive design system with bold colors, elevated shadows, 
                  and retro-morphic aesthetics that make productivity feel like play.
                </p>
                <ul className="space-y-2 text-text-14-reg font-text-14-reg text-black-60">
                  <li>• 6 complete color ramps with semantic meanings</li>
                  <li>• Typography scale from display to caption sizes</li>
                  <li>• Consistent 8px spacing grid system</li>
                  <li>• Elevated shadow system for depth and hierarchy</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-title-24 font-title-24-black text-black-100 mb-4">
                  Interactive Prototypes
                </h3>
                <p className="text-text-16-reg font-text-16-reg text-black-70 mb-6">
                  Created interactive prototypes to test user flows and validate design decisions. 
                  Focused on micro-interactions and gamification elements.
                </p>
                <ul className="space-y-2 text-text-14-reg font-text-14-reg text-black-60">
                  <li>• Task completion animations and XP rewards</li>
                  <li>• Virtua evolution and level-up sequences</li>
                  <li>• Achievement unlock celebrations</li>
                  <li>• Habit chain progression visualizations</li>
                </ul>
              </div>
              <div className="bg-secondarysolid-10 rounded-2xl border-2 border-black-100 p-8 aspect-square flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-secondarysolid-50 rounded-2xl mx-auto flex items-center justify-center border-2 border-black-100">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-secondarysolid-50 rounded w-28 mx-auto"></div>
                    <div className="h-3 bg-secondarysolid-30 rounded w-20 mx-auto"></div>
                  </div>
                  <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                    Interactive Prototype
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Flows */}
      <section className="py-20 bg-secondarysolid-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display-32 font-display-32-black text-black-100 mb-6">
              User Journey
            </h2>
            <p className="text-text-18-reg font-text-18-reg text-black-70 max-w-3xl mx-auto">
              Mapping the complete user experience from onboarding to mastery, 
              ensuring every step feels rewarding and purposeful.
            </p>
          </div>

          {/* Flow Diagram */}
          <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { step: '01', title: 'Sign Up', desc: 'Create account & choose first Virtua', icon: '👤' },
                { step: '02', title: 'Dashboard', desc: 'View personalized productivity overview', icon: '📊' },
                { step: '03', title: 'Create Quest', desc: 'Transform goals into epic adventures', icon: '🎯' },
                { step: '04', title: 'Complete Tasks', desc: 'Earn XP and level up Virtuas', icon: '✅' },
                { step: '05', title: 'Unlock Achievements', desc: 'Collect runes and celebrate progress', icon: '🏆' }
              ].map((item, index) => (
                <div key={item.step} className="text-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-primarysolid-50 rounded-2xl mx-auto flex items-center justify-center border-2 border-black-100 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondarysolid-50 rounded-full border-2 border-black-100 flex items-center justify-center">
                      <span className="text-caption-10-med font-caption-10-med text-white-100">{item.step}</span>
                    </div>
                    {index < 4 && (
                      <div className="hidden md:block absolute top-8 left-full w-6 h-0.5 bg-black-100 transform -translate-y-1/2"></div>
                    )}
                  </div>
                  <h3 className="text-title-14 font-title-14-black text-black-100 mb-2">{item.title}</h3>
                  <p className="text-caption-11-reg font-caption-11-reg text-black-60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key User Flows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-6">
              <h3 className="text-title-18 font-title-18-black text-black-100 mb-4">
                Quest Creation Flow
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-primarysolid-10 rounded-xl">
                  <div className="w-6 h-6 bg-primarysolid-50 rounded-full flex items-center justify-center text-caption-10-med font-caption-10-med text-black-100">1</div>
                  <span className="text-text-14-reg font-text-14-reg text-black-70">Choose quest category and assign Virtua</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-primarysolid-10 rounded-xl">
                  <div className="w-6 h-6 bg-primarysolid-50 rounded-full flex items-center justify-center text-caption-10-med font-caption-10-med text-black-100">2</div>
                  <span className="text-text-14-reg font-text-14-reg text-black-70">Set goals, deadlines, and difficulty level</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-primarysolid-10 rounded-xl">
                  <div className="w-6 h-6 bg-primarysolid-50 rounded-full flex items-center justify-center text-caption-10-med font-caption-10-med text-black-100">3</div>
                  <span className="text-text-14-reg font-text-14-reg text-black-70">Break down into actionable tasks</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-primarysolid-10 rounded-xl">
                  <div className="w-6 h-6 bg-primarysolid-50 rounded-full flex items-center justify-center text-caption-10-med font-caption-10-med text-black-100">4</div>
                  <span className="text-text-14-reg font-text-14-reg text-black-70">Launch quest and start earning XP</span>
                </div>
              </div>
            </div>

            <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-6">
              <h3 className="text-title-18 font-title-18-black text-black-100 mb-4">
                Achievement System
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-warning-10 rounded-xl">
                  <div className="w-6 h-6 bg-warning-50 rounded-full flex items-center justify-center text-caption-10-med font-caption-10-med text-white-100">1</div>
                  <span className="text-text-14-reg font-text-14-reg text-black-70">Complete tasks to meet rune criteria</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-warning-10 rounded-xl">
                  <div className="w-6 h-6 bg-warning-50 rounded-full flex items-center justify-center text-caption-10-med font-caption-10-med text-white-100">2</div>
                  <span className="text-text-14-reg font-text-14-reg text-black-70">Unlock rune with celebration animation</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-warning-10 rounded-xl">
                  <div className="w-6 h-6 bg-warning-50 rounded-full flex items-center justify-center text-caption-10-med font-caption-10-med text-white-100">3</div>
                  <span className="text-text-14-reg font-text-14-reg text-black-70">Gain XP bonus and bragging rights</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-warning-10 rounded-xl">
                  <div className="w-6 h-6 bg-warning-50 rounded-full flex items-center justify-center text-caption-10-med font-caption-10-med text-white-100">4</div>
                  <span className="text-text-14-reg font-text-14-reg text-black-70">Share achievement on social platforms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final UI Screens */}
      <section className="py-20 bg-white-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display-32 font-display-32-black text-black-100 mb-6">
              Final Interface Design
            </h2>
            <p className="text-text-18-reg font-text-18-reg text-black-70 max-w-3xl mx-auto">
              The polished interface that brings gamified productivity to life, 
              featuring bold colors, intuitive navigation, and delightful interactions.
            </p>
          </div>

          {/* Screen Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Dashboard', desc: 'Overview of daily progress and active quests', color: 'primarysolid' },
              { title: 'Quest Management', desc: 'Create and manage epic productivity adventures', color: 'secondarysolid' },
              { title: 'Virtua Companions', desc: 'Train and evolve AI-powered digital companions', color: 'success' },
              { title: 'Achievement Gallery', desc: 'Collect and showcase earned runes and milestones', color: 'warning' },
              { title: 'Analytics Dashboard', desc: 'Deep insights into productivity patterns and trends', color: 'info' },
              { title: 'Habit Chains', desc: 'Build powerful habits through connected sequences', color: 'error' }
            ].map((screen, index) => (
              <div key={index} className="group">
                <div className="bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-4px_8px_0px_#001428] group-hover:shadow-[0_12px_0_#001428,0_16px_20px_rgba(0,20,40,0.3)] group-hover:transform group-hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                  <div className={`aspect-[4/3] bg-${screen.color}-10 flex items-center justify-center border-b-2 border-black-100`}>
                    <div className="text-center space-y-4">
                      <div className={`w-20 h-20 bg-${screen.color}-50 rounded-2xl mx-auto flex items-center justify-center border-2 border-black-100`}>
                        <span className="text-3xl">
                          {index === 0 && '📊'}
                          {index === 1 && '🎯'}
                          {index === 2 && '🤖'}
                          {index === 3 && '🏆'}
                          {index === 4 && '📈'}
                          {index === 5 && '🔗'}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className={`h-4 bg-${screen.color}-50 rounded w-32 mx-auto`}></div>
                        <div className={`h-3 bg-${screen.color}-30 rounded w-24 mx-auto`}></div>
                        <div className={`h-3 bg-${screen.color}-30 rounded w-28 mx-auto`}></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-title-16 font-title-16-black text-black-100 mb-2">
                      {screen.title}
                    </h3>
                    <p className="text-text-14-reg font-text-14-reg text-black-60">
                      {screen.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Responsive Showcase */}
          <div className="mt-20">
            <h3 className="text-title-24 font-title-24-black text-black-100 text-center mb-12">
              Mobile Experience
            </h3>
            <div className="flex justify-center">
              <div className="bg-black-100 rounded-3xl p-2 shadow-[0_20px_60px_rgba(0,20,40,0.3)]">
                <div className="bg-white-100 rounded-2xl overflow-hidden" style={{ width: '280px', height: '600px' }}>
                  <div className="bg-primarysolid-10 h-full flex items-center justify-center">
                    <div className="text-center space-y-6">
                      <div className="w-16 h-16 bg-primarysolid-50 rounded-2xl mx-auto flex items-center justify-center border-2 border-black-100">
                        <span className="text-2xl">📱</span>
                      </div>
                      <div className="space-y-3">
                        <div className="h-4 bg-primarysolid-50 rounded w-32 mx-auto"></div>
                        <div className="h-3 bg-primarysolid-30 rounded w-24 mx-auto"></div>
                        <div className="h-3 bg-primarysolid-30 rounded w-28 mx-auto"></div>
                      </div>
                      <p className="text-caption-11-reg font-caption-11-reg text-black-60 px-4">
                        Mobile-optimized interface with touch-friendly interactions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-20 bg-gradient-to-br from-primarysolid-50 to-secondarysolid-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-display-48 font-display-48-black text-black-100">
              THANK YOU
            </h2>
            <p className="text-text-18-reg font-text-18-reg text-black-70 max-w-2xl mx-auto">
              This case study represents months of research, design iteration, and user testing 
              to create a productivity experience that truly makes work feel like play.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="px-6 py-3 bg-white-100 rounded-xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
                <span className="text-text-16-med font-text-16-med text-black-100">
                  View Live Prototype
                </span>
              </div>
              <div className="px-6 py-3 bg-white-100 rounded-xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
                <span className="text-text-16-med font-text-16-med text-black-100">
                  Connect on LinkedIn
                </span>
              </div>
            </div>

            <div className="pt-8 border-t border-black-100 border-opacity-20">
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Designed with ❤️ using Figma, React, TypeScript, and Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
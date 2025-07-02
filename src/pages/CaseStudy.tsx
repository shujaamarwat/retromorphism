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
            
            {/* Hero Mockup - Dashboard */}
            <div className="mt-12">
              <div className="relative mx-auto max-w-6xl">
                <div className="bg-white-100 rounded-3xl shadow-[0_20px_60px_rgba(0,20,40,0.15)] border-2 border-black-100 overflow-hidden">
                  <div className="p-8 bg-primarysolid-10">
                    {/* Mock Dashboard Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primarysolid-50 rounded-xl flex items-center justify-center border-2 border-black-100">
                          <span className="text-xl">✨</span>
                        </div>
                        <div>
                          <h3 className="text-title-20 font-title-20-black text-black-100">Welcome back, Alex!</h3>
                          <p className="text-text-14-reg font-text-14-reg text-black-60">Ready for today's adventure?</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="px-4 py-2 bg-success-50 rounded-xl border-2 border-black-100 text-white-100">
                          <span className="text-text-14-med font-text-14-med">Level 12</span>
                        </div>
                        <div className="px-4 py-2 bg-warning-50 rounded-xl border-2 border-black-100 text-white-100">
                          <span className="text-text-14-med font-text-14-med">2,450 XP</span>
                        </div>
                      </div>
                    </div>

                    {/* Mock Stats Grid */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                      <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-success-50 rounded-lg mx-auto mb-2 flex items-center justify-center">
                            <span className="text-white-100 text-sm">✓</span>
                          </div>
                          <p className="text-title-16 font-title-16-black text-black-100">8/12</p>
                          <p className="text-caption-11-reg font-caption-11-reg text-black-60">Tasks Today</p>
                        </div>
                      </div>
                      <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-error-50 rounded-lg mx-auto mb-2 flex items-center justify-center">
                            <span className="text-white-100 text-sm">🔥</span>
                          </div>
                          <p className="text-title-16 font-title-16-black text-black-100">15</p>
                          <p className="text-caption-11-reg font-caption-11-reg text-black-60">Day Streak</p>
                        </div>
                      </div>
                      <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-primarysolid-50 rounded-lg mx-auto mb-2 flex items-center justify-center">
                            <span className="text-black-100 text-sm">⚡</span>
                          </div>
                          <p className="text-title-16 font-title-16-black text-black-100">3</p>
                          <p className="text-caption-11-reg font-caption-11-reg text-black-60">Active Virtuas</p>
                        </div>
                      </div>
                      <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-warning-50 rounded-lg mx-auto mb-2 flex items-center justify-center">
                            <span className="text-white-100 text-sm">🏆</span>
                          </div>
                          <p className="text-title-16 font-title-16-black text-black-100">12</p>
                          <p className="text-caption-11-reg font-caption-11-reg text-black-60">Runes Earned</p>
                        </div>
                      </div>
                    </div>

                    {/* Mock Task List */}
                    <div className="space-y-3">
                      <h4 className="text-title-16 font-title-16-black text-black-100">Today's Focus</h4>
                      {[
                        { task: "Complete morning routine", completed: true, xp: 25 },
                        { task: "Review project proposals", completed: true, xp: 50 },
                        { task: "30-minute workout session", completed: false, xp: 35 },
                        { task: "Plan tomorrow's priorities", completed: false, xp: 20 }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white-100 rounded-xl border-2 border-black-100">
                          <div className={`w-6 h-6 rounded-full border-2 border-black-100 flex items-center justify-center ${item.completed ? 'bg-success-50' : 'bg-white-100'}`}>
                            {item.completed && <span className="text-white-100 text-xs">✓</span>}
                          </div>
                          <span className={`flex-1 text-text-14-reg font-text-14-reg ${item.completed ? 'text-black-60 line-through' : 'text-black-100'}`}>
                            {item.task}
                          </span>
                          <div className="px-2 py-1 bg-primarysolid-20 rounded-lg border border-black-100">
                            <span className="text-caption-10-med font-caption-10-med text-black-100">+{item.xp} XP</span>
                          </div>
                        </div>
                      ))}
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

      {/* Design System Section */}
      <section className="py-20 bg-black-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display-32 font-display-32-black text-black-100 mb-6">
              Design System
            </h2>
            <p className="text-text-18-reg font-text-18-reg text-black-70 max-w-3xl mx-auto">
              A comprehensive design system built for scalability, accessibility, and visual consistency 
              across all touchpoints of the MindForge experience.
            </p>
          </div>

          {/* Color System */}
          <div className="mb-20">
            <h3 className="text-title-24 font-title-24-black text-black-100 text-center mb-12">
              Color Palette
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Primary Colors */}
              <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-6">
                <h4 className="text-title-18 font-title-18-black text-black-100 mb-6">Primary & Secondary</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-text-14-med font-text-14-med text-black-100 mb-2">Primary (Yellow/Orange)</p>
                    <div className="flex gap-2">
                      {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((shade) => (
                        <div key={shade} className="flex-1">
                          <div className={`h-12 bg-primarysolid-${shade} rounded-lg border border-black-100`}></div>
                          <p className="text-caption-10-reg font-caption-10-reg text-black-60 mt-1 text-center">{shade}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-text-14-med font-text-14-med text-black-100 mb-2">Secondary (Blue)</p>
                    <div className="flex gap-2">
                      {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((shade) => (
                        <div key={shade} className="flex-1">
                          <div className={`h-12 bg-secondarysolid-${shade} rounded-lg border border-black-100`}></div>
                          <p className="text-caption-10-reg font-caption-10-reg text-black-60 mt-1 text-center">{shade}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Semantic Colors */}
              <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-6">
                <h4 className="text-title-18 font-title-18-black text-black-100 mb-6">Semantic Colors</h4>
                <div className="space-y-4">
                  {[
                    { name: 'Success (Green)', prefix: 'success' },
                    { name: 'Warning (Amber)', prefix: 'warning' },
                    { name: 'Error (Red)', prefix: 'error' },
                    { name: 'Info (Cyan)', prefix: 'info' }
                  ].map((color) => (
                    <div key={color.prefix}>
                      <p className="text-text-14-med font-text-14-med text-black-100 mb-2">{color.name}</p>
                      <div className="flex gap-2">
                        {[10, 30, 50, 70, 90].map((shade) => (
                          <div key={shade} className="flex-1">
                            <div className={`h-8 bg-${color.prefix}-${shade} rounded-lg border border-black-100`}></div>
                            <p className="text-caption-10-reg font-caption-10-reg text-black-60 mt-1 text-center">{shade}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Neutral Colors */}
            <div className="mt-8 bg-white-100 rounded-2xl border-2 border-black-100 p-6">
              <h4 className="text-title-18 font-title-18-black text-black-100 mb-6">Neutral Scale</h4>
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="h-16 bg-white-100 rounded-lg border-2 border-black-100"></div>
                  <p className="text-caption-10-reg font-caption-10-reg text-black-60 mt-1 text-center">White</p>
                </div>
                {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((shade) => (
                  <div key={shade} className="flex-1">
                    <div className={`h-16 bg-black-${shade} rounded-lg border border-black-100`}></div>
                    <p className="text-caption-10-reg font-caption-10-reg text-black-60 mt-1 text-center">{shade}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Typography System */}
          <div className="mb-20">
            <h3 className="text-title-24 font-title-24-black text-black-100 text-center mb-12">
              Typography Scale
            </h3>
            
            <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Display & Titles */}
                <div>
                  <h4 className="text-title-18 font-title-18-black text-black-100 mb-6">Display & Titles</h4>
                  <div className="space-y-6">
                    <div>
                      <p className="text-display-48 font-display-48-black text-black-100">Display 48</p>
                      <p className="text-caption-11-reg font-caption-11-reg text-black-60">48px • 900 weight • -0.02em spacing</p>
                    </div>
                    <div>
                      <p className="text-display-32 font-display-32-black text-black-100">Display 32</p>
                      <p className="text-caption-11-reg font-caption-11-reg text-black-60">32px • 900 weight • -0.01em spacing</p>
                    </div>
                    <div>
                      <p className="text-title-24 font-title-24-black text-black-100">Title 24</p>
                      <p className="text-caption-11-reg font-caption-11-reg text-black-60">24px • 900 weight • 0px spacing</p>
                    </div>
                    <div>
                      <p className="text-title-18 font-title-18-black text-black-100">Title 18</p>
                      <p className="text-caption-11-reg font-caption-11-reg text-black-60">18px • 900 weight • 0px spacing</p>
                    </div>
                    <div>
                      <p className="text-title-14 font-title-14-black text-black-100">Title 14</p>
                      <p className="text-caption-11-reg font-caption-11-reg text-black-60">14px • 900 weight • 0px spacing</p>
                    </div>
                  </div>
                </div>

                {/* Body & Caption */}
                <div>
                  <h4 className="text-title-18 font-title-18-black text-black-100 mb-6">Body & Caption</h4>
                  <div className="space-y-6">
                    <div>
                      <p className="text-text-18-reg font-text-18-reg text-black-100">Body Text 18 Regular</p>
                      <p className="text-caption-11-reg font-caption-11-reg text-black-60">18px • 400 weight • 26px line height</p>
                    </div>
                    <div>
                      <p className="text-text-16-med font-text-16-med text-black-100">Body Text 16 Medium</p>
                      <p className="text-caption-11-reg font-caption-11-reg text-black-60">16px • 500 weight • 24px line height</p>
                    </div>
                    <div>
                      <p className="text-text-14-reg font-text-14-reg text-black-100">Body Text 14 Regular</p>
                      <p className="text-caption-11-reg font-caption-11-reg text-black-60">14px • 400 weight • 20px line height</p>
                    </div>
                    <div>
                      <p className="text-text-12-med font-text-12-med text-black-100">Body Text 12 Medium</p>
                      <p className="text-caption-11-reg font-caption-11-reg text-black-60">12px • 500 weight • 16px line height</p>
                    </div>
                    <div>
                      <p className="text-caption-11-reg font-caption-11-reg text-black-100">Caption 11 Regular</p>
                      <p className="text-caption-11-reg font-caption-11-reg text-black-60">11px • 400 weight • 14px line height</p>
                    </div>
                    <div>
                      <p className="text-caption-10-med font-caption-10-med text-black-100">Caption 10 Medium</p>
                      <p className="text-caption-11-reg font-caption-11-reg text-black-60">10px • 500 weight • 12px line height</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Component System */}
          <div>
            <h3 className="text-title-24 font-title-24-black text-black-100 text-center mb-12">
              Component Library
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Buttons */}
              <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-6">
                <h4 className="text-title-18 font-title-18-black text-black-100 mb-6">Buttons</h4>
                <div className="space-y-4">
                  <div className="flex gap-3 flex-wrap">
                    <button className="px-4 py-2 bg-primarysolid-50 text-black-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428] text-text-16-med font-text-16-med">
                      Primary
                    </button>
                    <button className="px-4 py-2 bg-secondarysolid-50 text-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428] text-text-16-med font-text-16-med">
                      Secondary
                    </button>
                    <button className="px-4 py-2 bg-white-100 text-black-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428] text-text-16-med font-text-16-med">
                      Outline
                    </button>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <button className="px-3 py-1 bg-success-50 text-white-100 rounded-xl border-2 border-black-100 text-text-14-med font-text-14-med">
                      Small
                    </button>
                    <button className="px-6 py-3 bg-warning-50 text-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428] text-text-18-med font-text-18-med">
                      Large
                    </button>
                  </div>
                </div>
              </div>

              {/* Cards */}
              <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-6">
                <h4 className="text-title-18 font-title-18-black text-black-100 mb-6">Cards</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-primarysolid-10 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
                    <h5 className="text-title-14 font-title-14-black text-black-100 mb-2">Elevated Card</h5>
                    <p className="text-text-12-reg font-text-12-reg text-black-60">With shadow and border</p>
                  </div>
                  <div className="p-4 bg-white-100 rounded-xl border border-black-100">
                    <h5 className="text-title-14 font-title-14-black text-black-100 mb-2">Simple Card</h5>
                    <p className="text-text-12-reg font-text-12-reg text-black-60">Minimal styling</p>
                  </div>
                </div>
              </div>

              {/* Icons & Badges */}
              <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-6">
                <h4 className="text-title-18 font-title-18-black text-black-100 mb-6">Icons & Badges</h4>
                <div className="space-y-4">
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 bg-primarysolid-50 rounded-lg flex items-center justify-center border border-black-100">
                      <span className="text-black-100">⚡</span>
                    </div>
                    <div className="w-10 h-10 bg-secondarysolid-50 rounded-xl flex items-center justify-center border-2 border-black-100">
                      <span className="text-white-100">🎯</span>
                    </div>
                    <div className="w-12 h-12 bg-success-50 rounded-2xl flex items-center justify-center border-2 border-black-100">
                      <span className="text-white-100 text-lg">🏆</span>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="px-2 py-1 bg-warning-50 text-white-100 rounded-lg border border-black-100 text-caption-10-med font-caption-10-med">
                      Badge
                    </span>
                    <span className="px-3 py-1 bg-error-20 text-error-70 rounded-xl border border-error-50 text-caption-11-med font-caption-11-med">
                      Status
                    </span>
                  </div>
                </div>
              </div>

              {/* Spacing System */}
              <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-6">
                <h4 className="text-title-18 font-title-18-black text-black-100 mb-6">8px Grid System</h4>
                <div className="space-y-3">
                  {[8, 16, 24, 32, 48, 64].map((size) => (
                    <div key={size} className="flex items-center gap-4">
                      <div className={`bg-primarysolid-50 rounded`} style={{ width: `${size}px`, height: '16px' }}></div>
                      <span className="text-text-12-reg font-text-12-reg text-black-60">{size}px</span>
                    </div>
                  ))}
                </div>
              </div>
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
            {/* Dashboard Mockup */}
            <div className="group">
              <div className="bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-4px_8px_0px_#001428] group-hover:shadow-[0_12px_0_#001428,0_16px_20px_rgba(0,20,40,0.3)] group-hover:transform group-hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className="aspect-[4/3] bg-primarysolid-10 p-4 border-b-2 border-black-100">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-primarysolid-50 rounded-lg border border-black-100"></div>
                        <div className="h-3 bg-primarysolid-50 rounded w-16"></div>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-8 h-4 bg-success-50 rounded border border-black-100"></div>
                        <div className="w-8 h-4 bg-warning-50 rounded border border-black-100"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-8 bg-white-100 rounded-lg border border-black-100"></div>
                      <div className="h-8 bg-white-100 rounded-lg border border-black-100"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-primarysolid-30 rounded w-full"></div>
                      <div className="h-3 bg-primarysolid-30 rounded w-3/4"></div>
                      <div className="h-3 bg-primarysolid-30 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-title-16 font-title-16-black text-black-100 mb-2">
                    Dashboard
                  </h3>
                  <p className="text-text-14-reg font-text-14-reg text-black-60">
                    Overview of daily progress and active quests
                  </p>
                </div>
              </div>
            </div>

            {/* Quest Management Mockup */}
            <div className="group">
              <div className="bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-4px_8px_0px_#001428] group-hover:shadow-[0_12px_0_#001428,0_16px_20px_rgba(0,20,40,0.3)] group-hover:transform group-hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className="aspect-[4/3] bg-secondarysolid-10 p-4 border-b-2 border-black-100">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-secondarysolid-50 rounded-xl border-2 border-black-100 flex items-center justify-center">
                        <span className="text-white-100 text-sm">🎯</span>
                      </div>
                      <div className="h-4 bg-secondarysolid-50 rounded w-20"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="p-2 bg-white-100 rounded-lg border border-black-100">
                        <div className="h-2 bg-secondarysolid-30 rounded w-full mb-1"></div>
                        <div className="h-2 bg-secondarysolid-30 rounded w-2/3"></div>
                      </div>
                      <div className="p-2 bg-white-100 rounded-lg border border-black-100">
                        <div className="h-2 bg-secondarysolid-30 rounded w-3/4 mb-1"></div>
                        <div className="h-2 bg-secondarysolid-30 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="h-6 bg-secondarysolid-50 rounded-lg border-2 border-black-100"></div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-title-16 font-title-16-black text-black-100 mb-2">
                    Quest Management
                  </h3>
                  <p className="text-text-14-reg font-text-14-reg text-black-60">
                    Create and manage epic productivity adventures
                  </p>
                </div>
              </div>
            </div>

            {/* Virtua Companions Mockup */}
            <div className="group">
              <div className="bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-4px_8px_0px_#001428] group-hover:shadow-[0_12px_0_#001428,0_16px_20px_rgba(0,20,40,0.3)] group-hover:transform group-hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className="aspect-[4/3] bg-success-10 p-4 border-b-2 border-black-100">
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-success-50 rounded-2xl mx-auto mb-2 border-2 border-black-100 flex items-center justify-center">
                        <span className="text-white-100 text-lg">🤖</span>
                      </div>
                      <div className="h-3 bg-success-50 rounded w-16 mx-auto mb-1"></div>
                      <div className="h-2 bg-success-30 rounded w-12 mx-auto"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-success-30 rounded w-full"></div>
                      <div className="h-2 bg-success-30 rounded w-3/4"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="h-4 bg-white-100 rounded border border-black-100"></div>
                      <div className="h-4 bg-white-100 rounded border border-black-100"></div>
                      <div className="h-4 bg-white-100 rounded border border-black-100"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-title-16 font-title-16-black text-black-100 mb-2">
                    Virtua Companions
                  </h3>
                  <p className="text-text-14-reg font-text-14-reg text-black-60">
                    Train and evolve AI-powered digital companions
                  </p>
                </div>
              </div>
            </div>

            {/* Achievement Gallery Mockup */}
            <div className="group">
              <div className="bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-4px_8px_0px_#001428] group-hover:shadow-[0_12px_0_#001428,0_16px_20px_rgba(0,20,40,0.3)] group-hover:transform group-hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className="aspect-[4/3] bg-warning-10 p-4 border-b-2 border-black-100">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-3 bg-warning-50 rounded w-20"></div>
                      <div className="h-3 bg-warning-30 rounded w-12"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="aspect-square bg-white-100 rounded-lg border border-black-100 flex items-center justify-center">
                          <span className="text-xs">{i <= 3 ? '🏆' : '🔒'}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <div className="h-4 bg-warning-50 rounded w-8"></div>
                      <div className="h-4 bg-warning-30 rounded w-8"></div>
                      <div className="h-4 bg-warning-20 rounded w-8"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-title-16 font-title-16-black text-black-100 mb-2">
                    Achievement Gallery
                  </h3>
                  <p className="text-text-14-reg font-text-14-reg text-black-60">
                    Collect and showcase earned runes and milestones
                  </p>
                </div>
              </div>
            </div>

            {/* Analytics Dashboard Mockup */}
            <div className="group">
              <div className="bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-4px_8px_0px_#001428] group-hover:shadow-[0_12px_0_#001428,0_16px_20px_rgba(0,20,40,0.3)] group-hover:transform group-hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className="aspect-[4/3] bg-info-10 p-4 border-b-2 border-black-100">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-6 bg-info-50 rounded border border-black-100"></div>
                      <div className="h-6 bg-info-30 rounded border border-black-100"></div>
                    </div>
                    <div className="h-8 bg-white-100 rounded-lg border border-black-100 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-1/4 h-full bg-info-50"></div>
                      <div className="absolute bottom-0 left-1/4 w-1/4 h-3/4 bg-info-40"></div>
                      <div className="absolute bottom-0 left-2/4 w-1/4 h-1/2 bg-info-30"></div>
                      <div className="absolute bottom-0 left-3/4 w-1/4 h-2/3 bg-info-50"></div>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 21 }, (_, i) => (
                        <div key={i} className={`aspect-square rounded ${i % 3 === 0 ? 'bg-info-50' : i % 5 === 0 ? 'bg-info-30' : 'bg-info-10'} border border-black-100`}></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-title-16 font-title-16-black text-black-100 mb-2">
                    Analytics Dashboard
                  </h3>
                  <p className="text-text-14-reg font-text-14-reg text-black-60">
                    Deep insights into productivity patterns and trends
                  </p>
                </div>
              </div>
            </div>

            {/* Habit Chains Mockup */}
            <div className="group">
              <div className="bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-4px_8px_0px_#001428] group-hover:shadow-[0_12px_0_#001428,0_16px_20px_rgba(0,20,40,0.3)] group-hover:transform group-hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className="aspect-[4/3] bg-error-10 p-4 border-b-2 border-black-100">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-error-50 rounded-lg border border-black-100 flex items-center justify-center">
                        <span className="text-white-100 text-xs">🔗</span>
                      </div>
                      <div className="h-3 bg-error-50 rounded w-16"></div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <React.Fragment key={i}>
                          <div className={`w-6 h-6 rounded-full border-2 border-black-100 flex items-center justify-center ${i <= 3 ? 'bg-error-50' : 'bg-white-100'}`}>
                            {i <= 3 && <span className="text-white-100 text-xs">✓</span>}
                          </div>
                          {i < 5 && <div className="w-2 h-0.5 bg-black-100"></div>}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 bg-error-30 rounded w-full"></div>
                      <div className="h-2 bg-error-30 rounded w-3/5"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="h-4 bg-white-100 rounded border border-black-100"></div>
                      <div className="h-4 bg-white-100 rounded border border-black-100"></div>
                      <div className="h-4 bg-white-100 rounded border border-black-100"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-title-16 font-title-16-black text-black-100 mb-2">
                    Habit Chains
                  </h3>
                  <p className="text-text-14-reg font-text-14-reg text-black-60">
                    Build powerful habits through connected sequences
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Responsive Showcase */}
          <div className="mt-20">
            <h3 className="text-title-24 font-title-24-black text-black-100 text-center mb-12">
              Mobile Experience
            </h3>
            <div className="flex justify-center">
              <div className="bg-black-100 rounded-3xl p-2 shadow-[0_20px_60px_rgba(0,20,40,0.3)]">
                <div className="bg-white-100 rounded-2xl overflow-hidden" style={{ width: '280px', height: '600px' }}>
                  <div className="bg-primarysolid-10 h-full p-4">
                    <div className="space-y-4">
                      {/* Mobile Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primarysolid-50 rounded-xl border border-black-100"></div>
                          <div className="h-3 bg-primarysolid-50 rounded w-16"></div>
                        </div>
                        <div className="w-6 h-6 bg-secondarysolid-50 rounded-lg border border-black-100"></div>
                      </div>

                      {/* Mobile Stats */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-white-100 rounded-xl border border-black-100 text-center">
                          <div className="w-6 h-6 bg-success-50 rounded-lg mx-auto mb-1"></div>
                          <div className="h-2 bg-success-30 rounded w-8 mx-auto"></div>
                        </div>
                        <div className="p-3 bg-white-100 rounded-xl border border-black-100 text-center">
                          <div className="w-6 h-6 bg-warning-50 rounded-lg mx-auto mb-1"></div>
                          <div className="h-2 bg-warning-30 rounded w-8 mx-auto"></div>
                        </div>
                      </div>

                      {/* Mobile Task List */}
                      <div className="space-y-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-white-100 rounded-xl border border-black-100">
                            <div className={`w-4 h-4 rounded-full border border-black-100 ${i <= 2 ? 'bg-success-50' : 'bg-white-100'}`}></div>
                            <div className="flex-1">
                              <div className="h-2 bg-primarysolid-30 rounded w-full mb-1"></div>
                              <div className="h-2 bg-primarysolid-20 rounded w-2/3"></div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Mobile Navigation */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-2">
                          <div className="flex justify-around">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <div key={i} className="w-8 h-8 bg-primarysolid-20 rounded-xl border border-black-100"></div>
                            ))}
                          </div>
                        </div>
                      </div>
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
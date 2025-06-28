import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { ContentCard } from "../../components/ui/content-card";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Checkbox } from "../../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Switch } from "../../components/ui/switch";
import { Slider } from "../../components/ui/slider";
import { Progress } from "../../components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";
import { 
  ArrowRightIcon, 
  ArrowLeftIcon, 
  SearchIcon, 
  HeartIcon, 
  StarIcon, 
  BellIcon,
  InfoIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlayIcon,
  PauseIcon,
  DownloadIcon,
  ShareIcon,
  SettingsIcon,
  BookmarkIcon,
  EyeIcon,
  VolumeIcon,
  Volume2Icon,
  UserIcon,
  MailIcon,
  LockIcon,
  PhoneIcon
} from "lucide-react";

export const ComponentShowcase = (): JSX.Element => {
  const [sliderValue, setSliderValue] = useState([50]);
  const [volumeValue, setVolumeValue] = useState([75]);
  const [brightnessValue, setBrightnessValue] = useState([30]);
  const [progressValue, setProgressValue] = useState(65);
  const [switchChecked, setSwitchChecked] = useState(false);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-primarysolid-10 via-white-100 to-secondarysolid-10 p-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-title-24-black text-black-100">
              RetroMorphism Design System
            </h1>
            <p className="text-lg font-text-16-med text-black-60 max-w-2xl mx-auto">
              A comprehensive collection of retro-styled UI components with bold shadows, 
              vibrant colors, and tactile interactions.
            </p>
          </div>

          {/* Color Palette Showcase */}
          <Card className="bg-white-100 border-2 border-[#001428] shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] rounded-2xl">
            <CardHeader>
              <CardTitle className="font-title-24-black text-black-100">Complete Color System</CardTitle>
              <CardDescription className="font-text-16-med text-black-60">
                Full color palette with primary, secondary, semantic colors, and neutral tones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Primary Colors */}
              <div className="space-y-4">
                <h4 className="font-title-16-black text-black-100">Primary Colors (Yellow/Orange)</h4>
                <div className="grid grid-cols-5 md:grid-cols-9 gap-3">
                  {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((shade) => (
                    <div key={shade} className="text-center">
                      <div 
                        className={`w-16 h-16 rounded-xl border-2 border-[#001428] mb-2`}
                        style={{ backgroundColor: `var(--primarysolid-${shade})` }}
                      />
                      <div className="text-xs font-text-12-med text-black-60">{shade}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Colors */}
              <div className="space-y-4">
                <h4 className="font-title-16-black text-black-100">Secondary Colors (Blue)</h4>
                <div className="grid grid-cols-5 md:grid-cols-9 gap-3">
                  {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((shade) => (
                    <div key={shade} className="text-center">
                      <div 
                        className={`w-16 h-16 rounded-xl border-2 border-[#001428] mb-2`}
                        style={{ backgroundColor: `var(--secondarysolid-${shade})` }}
                      />
                      <div className="text-xs font-text-12-med text-black-60">{shade}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Semantic Colors */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Success Colors */}
                <div className="space-y-3">
                  <h5 className="font-title-16-black text-black-100">Success (Green)</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {[10, 50, 90].map((shade) => (
                      <div key={shade} className="text-center">
                        <div 
                          className={`w-12 h-12 rounded-lg border border-[#001428] mb-1`}
                          style={{ backgroundColor: `var(--success-${shade})` }}
                        />
                        <div className="text-xs font-text-12-med text-black-60">{shade}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Error Colors */}
                <div className="space-y-3">
                  <h5 className="font-title-16-black text-black-100">Error (Red)</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {[10, 50, 90].map((shade) => (
                      <div key={shade} className="text-center">
                        <div 
                          className={`w-12 h-12 rounded-lg border border-[#001428] mb-1`}
                          style={{ backgroundColor: `var(--error-${shade})` }}
                        />
                        <div className="text-xs font-text-12-med text-black-60">{shade}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warning Colors */}
                <div className="space-y-3">
                  <h5 className="font-title-16-black text-black-100">Warning (Amber)</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {[10, 50, 90].map((shade) => (
                      <div key={shade} className="text-center">
                        <div 
                          className={`w-12 h-12 rounded-lg border border-[#001428] mb-1`}
                          style={{ backgroundColor: `var(--warning-${shade})` }}
                        />
                        <div className="text-xs font-text-12-med text-black-60">{shade}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info Colors */}
                <div className="space-y-3">
                  <h5 className="font-title-16-black text-black-100">Info (Cyan)</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {[10, 50, 90].map((shade) => (
                      <div key={shade} className="text-center">
                        <div 
                          className={`w-12 h-12 rounded-lg border border-[#001428] mb-1`}
                          style={{ backgroundColor: `var(--info-${shade})` }}
                        />
                        <div className="text-xs font-text-12-med text-black-60">{shade}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Neutral Colors */}
              <div className="space-y-4">
                <h4 className="font-title-16-black text-black-100">Neutral Colors (Black Scale)</h4>
                <div className="grid grid-cols-5 md:grid-cols-11 gap-3">
                  {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((shade) => (
                    <div key={shade} className="text-center">
                      <div 
                        className={`w-16 h-16 rounded-xl border-2 border-[#001428] mb-2`}
                        style={{ backgroundColor: `var(--black-${shade})` }}
                      />
                      <div className="text-xs font-text-12-med text-black-60">{shade}</div>
                    </div>
                  ))}
                  <div className="text-center">
                    <div 
                      className={`w-16 h-16 rounded-xl border-2 border-[#001428] mb-2`}
                      style={{ backgroundColor: `var(--white-100)` }}
                    />
                    <div className="text-xs font-text-12-med text-black-60">W100</div>
                  </div>
                </div>
              </div>

              {/* Color Usage Demo */}
              <div className="p-6 bg-secondarysolid-10 rounded-2xl border-2 border-[#001428]">
                <h4 className="font-title-16-black text-black-100 mb-4">Color Usage Examples</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-primarysolid-50 rounded-xl border-2 border-[#001428]">
                    <div className="font-title-16-black text-black-100 mb-2">Primary Action</div>
                    <div className="text-sm font-text-16-med text-black-60">Main CTA buttons</div>
                  </div>
                  <div className="p-4 bg-secondarysolid-50 rounded-xl border-2 border-[#001428]">
                    <div className="font-title-16-black text-white-100 mb-2">Secondary Action</div>
                    <div className="text-sm font-text-16-med text-white-100">Secondary buttons</div>
                  </div>
                  <div className="p-4 bg-success-50 rounded-xl border-2 border-[#001428]">
                    <div className="font-title-16-black text-white-100 mb-2">Success State</div>
                    <div className="text-sm font-text-16-med text-white-100">Positive feedback</div>
                  </div>
                  <div className="p-4 bg-error-50 rounded-xl border-2 border-[#001428]">
                    <div className="font-title-16-black text-white-100 mb-2">Error State</div>
                    <div className="text-sm font-text-16-med text-white-100">Error messages</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Cards Section */}
          <Card className="bg-white-100 border-2 border-[#001428] shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] rounded-2xl">
            <CardHeader>
              <CardTitle className="font-title-24-black text-black-100">Content Cards</CardTitle>
              <CardDescription className="font-text-16-med text-black-60">
                Elevated content cards with images, text, and action buttons using the proper color system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ContentCard
                  title="Mountain Adventure"
                  description="Discover breathtaking mountain landscapes and hiking trails that will take your breath away. Perfect for outdoor enthusiasts."
                  imageUrl="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
                  imageAlt="Mountain landscape"
                  badge="Featured"
                  badgeVariant="default"
                  primaryAction={{
                    label: "Explore",
                    onClick: () => console.log("Explore clicked")
                  }}
                  secondaryAction={{
                    label: "Save",
                    onClick: () => console.log("Save clicked")
                  }}
                />

                <ContentCard
                  title="Ocean Waves"
                  description="Experience the calming sounds of ocean waves and pristine beaches. A perfect escape from the daily hustle."
                  imageUrl="https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
                  imageAlt="Ocean waves"
                  badge="Popular"
                  badgeVariant="secondary"
                  primaryAction={{
                    label: "View Details",
                    onClick: () => console.log("View Details clicked")
                  }}
                  secondaryAction={{
                    label: "Share",
                    onClick: () => console.log("Share clicked")
                  }}
                />

                <ContentCard
                  title="City Lights"
                  description="Explore vibrant city nightlife and stunning urban architecture. The perfect blend of modern and classic."
                  imageUrl="https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
                  imageAlt="City at night"
                  badge="New"
                  badgeVariant="destructive"
                  primaryAction={{
                    label: "Discover",
                    onClick: () => console.log("Discover clicked")
                  }}
                />

                <ContentCard
                  title="Forest Trail"
                  description="Walk through peaceful forest paths surrounded by ancient trees and wildlife. Nature at its finest."
                  imageUrl="https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
                  imageAlt="Forest trail"
                  primaryAction={{
                    label: "Start Journey",
                    onClick: () => console.log("Start Journey clicked")
                  }}
                  secondaryAction={{
                    label: "Learn More",
                    onClick: () => console.log("Learn More clicked")
                  }}
                />

                <ContentCard
                  title="Desert Sunset"
                  description="Witness spectacular desert sunsets with golden sand dunes stretching to the horizon."
                  imageUrl="https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
                  imageAlt="Desert sunset"
                  badge="Limited"
                  badgeVariant="outline"
                  primaryAction={{
                    label: "Book Now",
                    onClick: () => console.log("Book Now clicked")
                  }}
                />

                <ContentCard
                  title="Snowy Peaks"
                  description="Adventure awaits in snow-covered mountain peaks. Perfect for winter sports and cozy retreats."
                  imageUrl="https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
                  imageAlt="Snowy mountain peaks"
                  primaryAction={{
                    label: "Plan Trip",
                    onClick: () => console.log("Plan Trip clicked")
                  }}
                  secondaryAction={{
                    label: "Gallery",
                    onClick: () => console.log("Gallery clicked")
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Buttons Section */}
          <Card className="bg-white-100 border-2 border-[#001428] shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] rounded-2xl">
            <CardHeader>
              <CardTitle className="font-title-24-black text-black-100">Enhanced RetroMorphic Buttons</CardTitle>
              <CardDescription className="font-text-16-med text-black-60">
                Raised buttons with tactile press animations and elevation effects using the proper color system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Button Variants */}
              <div className="space-y-4">
                <h4 className="font-title-16-black text-black-100">Button Variants</h4>
                <div className="flex flex-wrap gap-4">
                  <Button>Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="destructive">Destructive Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="link">Link Button</Button>
                  <Button disabled>Disabled Button</Button>
                </div>
              </div>
              
              {/* Button Sizes */}
              <div className="space-y-4">
                <h4 className="font-title-16-black text-black-100">Button Sizes</h4>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              {/* Buttons with Icons */}
              <div className="space-y-4">
                <h4 className="font-title-16-black text-black-100">Buttons with Icons</h4>
                <div className="flex flex-wrap gap-4">
                  <Button>
                    <PlayIcon className="w-4 h-4 mr-2" />
                    Play Video
                  </Button>
                  <Button variant="secondary">
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline">
                    Share Content
                    <ShareIcon className="w-4 h-4 ml-2" />
                  </Button>
                  <Button size="icon">
                    <HeartIcon className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="secondary">
                    <SettingsIcon className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <BellIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Interactive Demo */}
              <div className="space-y-4">
                <h4 className="font-title-16-black text-black-100">Interactive Demo</h4>
                <div className="p-6 bg-primarysolid-10 rounded-2xl border-2 border-[#001428]">
                  <p className="font-text-16-med text-black-60 mb-4">
                    Click and hold the buttons below to see the press animation in action:
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button>
                      <PauseIcon className="w-4 h-4 mr-2" />
                      Press & Hold Me
                    </Button>
                    <Button variant="secondary">
                      Try This One Too
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="outline" size="lg">
                      Large Button
                    </Button>
                  </div>
                </div>
              </div>

              {/* Color System Demo */}
              <div className="space-y-4">
                <h4 className="font-title-16-black text-black-100">Color System in Action</h4>
                <div className="p-6 bg-secondarysolid-10 rounded-2xl border-2 border-[#001428]">
                  <p className="font-text-16-med text-black-60 mb-6">
                    See how the proper color system creates consistent, accessible, and visually appealing button designs:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h5 className="font-title-16-black text-black-100">Primary Actions (Yellow)</h5>
                      <div className="space-y-3">
                        <Button className="w-full">Get Started</Button>
                        <Button className="w-full">
                          <StarIcon className="w-4 h-4 mr-2" />
                          Add to Favorites
                        </Button>
                        <Button size="lg" className="w-full">
                          <PlayIcon className="w-4 h-4 mr-2" />
                          Start Experience
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h5 className="font-title-16-black text-black-100">Secondary Actions (Blue)</h5>
                      <div className="space-y-3">
                        <Button variant="secondary" className="w-full">Learn More</Button>
                        <Button variant="secondary" className="w-full">
                          <BookmarkIcon className="w-4 h-4 mr-2" />
                          Save for Later
                        </Button>
                        <Button variant="secondary" size="lg" className="w-full">
                          <EyeIcon className="w-4 h-4 mr-2" />
                          Preview Content
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t-2 border-[#001428]">
                    <h5 className="font-title-16-black text-black-100 mb-4">Semantic Actions</h5>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="destructive">
                        <XCircleIcon className="w-4 h-4 mr-2" />
                        Delete Item
                      </Button>
                      <Button variant="outline">
                        <CheckCircleIcon className="w-4 h-4 mr-2" />
                        Confirm Action
                      </Button>
                      <Button variant="ghost">
                        <InfoIcon className="w-4 h-4 mr-2" />
                        More Info
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clean Form Elements */}
          <Card className="bg-white-100 border-2 border-[#001428] shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] rounded-2xl">
            <CardHeader>
              <CardTitle className="font-title-24-black text-black-100">Clean RetroMorphic Form Fields</CardTitle>
              <CardDescription className="font-text-16-med text-black-60">
                Clean, flat input fields with bold borders and rounded corners - no shadows, just pure retro styling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-title-16-black text-black-100 mb-3">Basic Text Input</label>
                    <Input placeholder="Enter your text..." />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-title-16-black text-black-100 mb-3">Search Input</label>
                    <div className="relative">
                      <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black-60 z-10" />
                      <Input placeholder="Search for anything..." className="pl-12" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-title-16-black text-black-100 mb-3">Email Input</label>
                    <div className="relative">
                      <MailIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black-60 z-10" />
                      <Input type="email" placeholder="your.email@example.com" className="pl-12" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-title-16-black text-black-100 mb-3">Password Input</label>
                    <div className="relative">
                      <LockIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black-60 z-10" />
                      <Input type="password" placeholder="Enter your password" className="pl-12" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-title-16-black text-black-100 mb-3">Phone Number</label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black-60 z-10" />
                      <Input type="tel" placeholder="+1 (555) 123-4567" className="pl-12" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-title-16-black text-black-100 mb-3">Select Dropdown</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Mountain Adventure</SelectItem>
                        <SelectItem value="option2">Ocean Waves</SelectItem>
                        <SelectItem value="option3">City Lights</SelectItem>
                        <SelectItem value="option4">Forest Trail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-title-16-black text-black-100 mb-3">Message Textarea</label>
                    <Textarea placeholder="Enter your message here..." rows={6} />
                  </div>

                  <div>
                    <label className="block text-sm font-title-16-black text-black-100 mb-3">Disabled Input</label>
                    <Input placeholder="This input is disabled" disabled />
                  </div>

                  <div>
                    <label className="block text-sm font-title-16-black text-black-100 mb-3">Number Input</label>
                    <Input type="number" placeholder="Enter a number" min="0" max="100" />
                  </div>

                  <div>
                    <label className="block text-sm font-title-16-black text-black-100 mb-3">Date Input</label>
                    <Input type="date" />
                  </div>
                </div>
              </div>

              {/* Clean Design Demo Section */}
              <div className="mt-8 p-6 bg-secondarysolid-10 rounded-2xl border-2 border-[#001428]">
                <h4 className="font-title-16-black text-black-100 mb-4">Clean Retro Design Demo</h4>
                <p className="font-text-16-med text-black-60 mb-6">
                  Experience the clean, flat design approach that emphasizes bold borders and rounded corners. 
                  These fields maintain the retro aesthetic without shadows, creating a crisp, modern feel 
                  that contrasts beautifully with the raised buttons and elevated cards.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h5 className="font-title-16-black text-black-100">Clean Design Features:</h5>
                    <ul className="space-y-2 text-sm font-text-16-med text-black-60">
                      <li>• No shadows - clean flat appearance</li>
                      <li>• Bold 2px borders for definition</li>
                      <li>• Rounded corners (16px radius)</li>
                      <li>• White background with high contrast</li>
                      <li>• Focus ring for accessibility</li>
                      <li>• Smooth 200ms transitions</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h5 className="font-title-16-black text-black-100">Interaction States:</h5>
                    <ul className="space-y-2 text-sm font-text-16-med text-black-60">
                      <li>• Default: Clean border and background</li>
                      <li>• Hover: Primary color border highlight</li>
                      <li>• Focus: Primary ring with offset</li>
                      <li>• Disabled: Reduced opacity + light background</li>
                      <li>• Icon integration with proper positioning</li>
                      <li>• Consistent typography and spacing</li>
                    </ul>
                  </div>
                </div>

                {/* Live Demo */}
                <div className="mt-6 p-4 bg-white-100 rounded-xl border border-[#001428]">
                  <h6 className="font-title-16-black text-black-100 mb-3">Try the Clean Design:</h6>
                  <div className="space-y-3">
                    <Input placeholder="Click here to see the clean retro styling..." />
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black-60 z-10" />
                      <Input placeholder="With icon integration..." className="pl-12" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Elements */}
          <Card className="bg-white-100 border-2 border-[#001428] shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] rounded-2xl">
            <CardHeader>
              <CardTitle className="font-title-24-black text-black-100">Interactive Elements</CardTitle>
              <CardDescription className="font-text-16-med text-black-60">
                Checkboxes, radio buttons, switches, and sliders with retro-morphic styling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-title-16-black text-black-100">Checkboxes</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="check1" />
                        <label htmlFor="check1" className="text-sm font-text-16-med text-black-100">Option 1</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="check2" defaultChecked />
                        <label htmlFor="check2" className="text-sm font-text-16-med text-black-100">Option 2 (checked)</label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-title-16-black text-black-100">Radio Group</h4>
                    <RadioGroup defaultValue="radio1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="radio1" id="radio1" />
                        <label htmlFor="radio1" className="text-sm font-text-16-med text-black-100">Radio 1</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="radio2" id="radio2" />
                        <label htmlFor="radio2" className="text-sm font-text-16-med text-black-100">Radio 2</label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-title-16-black text-black-100">Switch</h4>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={switchChecked} 
                        onCheckedChange={setSwitchChecked}
                      />
                      <label className="text-sm font-text-16-med text-black-100">
                        {switchChecked ? "Enabled" : "Disabled"}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-title-16-black text-black-100">RetroMorphic Sliders</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-text-16-med text-black-100">Volume</label>
                          <span className="text-sm font-text-16-med text-black-60">{volumeValue[0]}%</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <VolumeIcon className="w-4 h-4 text-black-60" />
                          <Slider
                            value={volumeValue}
                            onValueChange={setVolumeValue}
                            max={100}
                            step={1}
                            className="flex-1"
                          />
                          <Volume2Icon className="w-4 h-4 text-black-60" />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-text-16-med text-black-100">Brightness</label>
                          <span className="text-sm font-text-16-med text-black-60">{brightnessValue[0]}%</span>
                        </div>
                        <Slider
                          value={brightnessValue}
                          onValueChange={setBrightnessValue}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-text-16-med text-black-100">General Setting</label>
                          <span className="text-sm font-text-16-med text-black-60">{sliderValue[0]}%</span>
                        </div>
                        <Slider
                          value={sliderValue}
                          onValueChange={setSliderValue}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-title-16-black text-black-100">Progress</h4>
                    <Progress value={progressValue} className="w-full" />
                    <p className="text-sm font-text-16-med text-black-60">Progress: {progressValue}%</p>
                  </div>
                </div>
              </div>

              {/* Slider Demo Section */}
              <div className="mt-8 p-6 bg-secondarysolid-10 rounded-2xl border-2 border-[#001428]">
                <h4 className="font-title-16-black text-black-100 mb-4">Interactive Slider Demo</h4>
                <p className="font-text-16-med text-black-60 mb-4">
                  Try dragging the sliders above to see the retro-morphic design in action. Notice the elevated track, 
                  gradient fill, and tactile thumb interactions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-white-100 rounded-xl border border-[#001428]">
                    <div className="text-2xl font-title-24-black text-primarysolid-60 mb-1">{volumeValue[0]}%</div>
                    <div className="text-sm font-text-16-med text-black-60">Volume Level</div>
                  </div>
                  <div className="p-4 bg-white-100 rounded-xl border border-[#001428]">
                    <div className="text-2xl font-title-24-black text-primarysolid-60 mb-1">{brightnessValue[0]}%</div>
                    <div className="text-sm font-text-16-med text-black-60">Brightness</div>
                  </div>
                  <div className="p-4 bg-white-100 rounded-xl border border-[#001428]">
                    <div className="text-2xl font-title-24-black text-primarysolid-60 mb-1">{sliderValue[0]}%</div>
                    <div className="text-sm font-text-16-med text-black-60">General</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Display Elements */}
          <Card className="bg-white-100 border-2 border-[#001428] shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] rounded-2xl">
            <CardHeader>
              <CardTitle className="font-title-24-black text-black-100">Display Elements</CardTitle>
              <CardDescription className="font-text-16-med text-black-60">
                Badges, avatars, and other display components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-title-16-black text-black-100 mb-3">Badges</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Error</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-title-16-black text-black-100 mb-3">Avatars</h4>
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1" />
                      <AvatarFallback>LG</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Card className="bg-white-100 border-2 border-[#001428] shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] rounded-2xl">
            <CardHeader>
              <CardTitle className="font-title-24-black text-black-100">Tabs</CardTitle>
              <CardDescription className="font-text-16-med text-black-60">
                Tabbed navigation component
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="mt-4">
                  <p className="text-sm font-text-16-med text-black-60">Content for Tab 1. This is where you would put your tab content.</p>
                </TabsContent>
                <TabsContent value="tab2" className="mt-4">
                  <p className="text-sm font-text-16-med text-black-60">Content for Tab 2. Each tab can have different content.</p>
                </TabsContent>
                <TabsContent value="tab3" className="mt-4">
                  <p className="text-sm font-text-16-med text-black-60">Content for Tab 3. Tabs are great for organizing information.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="bg-white-100 border-2 border-[#001428] shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] rounded-2xl">
            <CardHeader>
              <CardTitle className="font-title-24-black text-black-100">Alerts</CardTitle>
              <CardDescription className="font-text-16-med text-black-60">
                Alert messages for different states
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  This is an informational alert message.
                </AlertDescription>
              </Alert>

              <Alert variant="warning">
                <AlertTriangleIcon className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  This is a warning alert message.
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <XCircleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  This is an error alert message.
                </AlertDescription>
              </Alert>

              <Alert variant="success">
                <CheckCircleIcon className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  This is a success alert message.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Tooltips */}
          <Card className="bg-white-100 border-2 border-[#001428] shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] rounded-2xl">
            <CardHeader>
              <CardTitle className="font-title-24-black text-black-100">Tooltips</CardTitle>
              <CardDescription className="font-text-16-med text-black-60">
                Hover tooltips for additional information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a tooltip!</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="outline">
                      <BellIcon className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="outline">
                      <StarIcon className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to favorites</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center py-8">
            <p className="text-sm text-black-60 font-text-16-med">
              RetroMorphism Design System - Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
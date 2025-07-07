// (removed duplicate TypingLoopText definition from top of file)
import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Mail, ExternalLink, Github, Linkedin, Sparkles, Code2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
// @ts-ignore
import emailjs from '@emailjs/browser';


const Index = () => {
  // Academic chip triggers profile image background glow
  const [showProfileGlow, setShowProfileGlow] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("KoP5M4-6Z5iEj-Zpp");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const templateParams = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      message: formData.get('message'),
      to_name: 'Priyunshu Saha',
    };

    try {
      await emailjs.send(
        'service_qpx4ntv',
        'template_3qisbgp',
        templateParams
      );
      
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon!"
      });
      
      form.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'services', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = [{
    name: 'Python',
    level: 90
  }, {
    name: 'C++',
    level: 85
  }, {
    name: 'C',
    level: 80
  }, {
    name: 'Flutter/Dart',
    level: 85
  }, {
    name: 'Flask',
    level: 80
  }, {
    name: 'Firebase',
    level: 85
  }, {
    name: 'AI/ML & NLP',
    level: 75
  }, {
    name: 'Git/GitHub',
    level: 90
  }];

  const projects = [{
    title: 'BHAV – Bengali AI Chatbot',
    description: 'AI-powered chatbot for Bengali interaction with complete website & mobile app integration.',
    tech: ['NLP', 'LLM', 'Flutter', 'Flask'],
    color: 'from-purple-500 to-pink-500',
    link: 'https://bhav-ai.carrd.co/'
  }, {
    title: 'Smart Attendance System',
    description: 'Geofencing-based attendance tracker with real-time Firebase sync and location verification.',
    tech: ['Flutter', 'Firebase', 'Geolocation'],
    color: 'from-blue-500 to-cyan-500'
  }, {
    title: 'Automint',
    description: 'Decentralized smart invoice platform for B2B transactions with complete design-to-deployment pipeline.',
    tech: ['Backend', 'API', 'UI/UX', 'Database'],
    color: 'from-green-500 to-teal-500'
  }];

  const services = [{
    title: 'Mobile App Development',
    description: 'Cross-platform apps with Flutter focusing on performance and user experience',
    icon: '📱'
  }, {
    title: 'AI Integration & Automation',
    description: 'Custom AI solutions, chatbots, and intelligent automation systems',
    icon: '🤖'
  }, {
    title: 'Backend API Development',
    description: 'Scalable REST APIs and database architecture with Flask and Firebase',
    icon: '⚡'
  }, {
    title: 'UI/UX Ideation',
    description: 'User-centered design concepts and interactive prototypes (continuous learning)',
    icon: '🎨'
  }];


  // Glow pulse state for GPA badge
  const [showGlow, setShowGlow] = useState(false);

  // Easter egg state
  const [showEgg, setShowEgg] = useState(false);

  // Automated vertical skill carousel
  const skillChips = ['Python', 'Flutter', 'AI/ML', 'Firebase'];
  const [currentSkill, setCurrentSkill] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skillChips.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Hide glow after animation
  useEffect(() => {
    if (showGlow) {
      const timeout = setTimeout(() => setShowGlow(false), 700);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [showGlow]);

  // Hide easter egg after 2.5s
  useEffect(() => {
    if (showEgg) {
      const timeout = setTimeout(() => setShowEgg(false), 2500);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [showEgg]);

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="text-xl md:text-2xl font-bold text-primary">
              PSaha.
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'services', 'contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 font-medium text-sm hover:scale-105 ${
                    activeSection === item
                      ? 'text-accent font-semibold'
                      : 'text-muted-foreground hover:text-accent'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Download CV Button */}
            <Button 
              className="hidden md:flex bg-gradient-to-r from-accent to-secondary hover:shadow-lg shadow-accent/25 text-accent-foreground rounded-full px-6 py-2 font-semibold transition-all duration-300 hover:scale-105"
            >
              Download CV
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-primary hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-border shadow-lg">
              <div className="p-4 space-y-4">
                {['home', 'about', 'skills', 'projects', 'services', 'contact'].map(item => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left py-3 px-4 capitalize text-muted-foreground hover:text-accent hover:bg-muted rounded-lg transition-all duration-200 font-medium"
                  >
                    {item}
                  </button>
                ))}
                <Button 
                  className="w-full mt-4 bg-gradient-to-r from-accent to-secondary text-accent-foreground rounded-full py-3 font-semibold"
                >
                  Download CV
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 md:pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-3/4 left-1/3 w-20 h-20 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[85vh] px-2 sm:px-0">
              
              {/* Right Content - Profile & Stats (now first column, image larger) */}
              <div className="order-1 lg:order-1 flex flex-col items-center space-y-8 animate-fadeInRight">
                {/* Enhanced Profile Image (bigger) */}
                <div className="relative flex flex-col items-center group w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] mb-8 mt-16">
                  {/* Rotating Ring */}
                  <div className="absolute inset-0 w-full h-full rounded-full border-2 border-accent/30 animate-spin-slow"></div>
                  {/* Profile Glow on B.Tech CSE click */}
                  {showProfileGlow && (
                    <div className="absolute inset-0 rounded-full pointer-events-none animate-profile-glow bg-gradient-to-r from-accent/40 to-secondary/40 opacity-80 z-10"></div>
                  )}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-card shadow-elegant bg-card hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer flex items-center justify-center">
                      <img 
                        src="https://i.postimg.cc/qvgLpnkv/PSX-20240716-171349.jpg" 
                        alt="Priyunshu Saha"
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 rounded-full"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                    </div>
                    {/* Interactive GPA Badge - visually below the image and centered */}
                    <div
                      className="absolute left-1/2 -bottom-10 transform -translate-x-1/2 bg-gradient-to-r from-accent to-secondary text-accent-foreground rounded-full w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center text-base font-bold shadow-elegant hover:shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer hover:rotate-12 group z-10"
                      onClick={() => setShowGlow(true)}
                      style={{ outline: 'none' }}
                    >
                      {/* Glow pulse ring */}
                      {showGlow && (
                        <div className="absolute -inset-4 md:-inset-5 rounded-full pointer-events-none animate-gpa-glow bg-gradient-to-r from-accent/40 to-secondary/40 opacity-80 z-0"></div>
                      )}
                      <span className="text-lg md:text-xl group-hover:animate-pulse z-10">8.8</span>
                      <span className="text-xs md:text-sm z-10">GPA</span>
                    </div>
                  </div>
                  {/* Animated Decorative Elements */}
                  <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-accent to-secondary rounded-full shadow-soft animate-pulse hover:animate-bounce cursor-pointer"></div>
                  <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-12 h-12 md:w-16 md:h-16 border-2 border-primary rounded-full bg-background shadow-soft animate-pulse delay-1000 hover:animate-spin cursor-pointer"></div>
                </div>
                {/* Floating Academic Badge (lowered and changed) */}
                {/* Cool floating chip with icon and animation */}
                {/* Animated floating chip moved to top-left, away from text and image */}
                <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 z-20 animate-float">
                  <div
                    className="flex items-center gap-3 bg-gradient-to-r from-accent to-secondary text-accent-foreground rounded-full px-5 py-2 md:px-7 md:py-3 shadow-elegant border-2 border-accent/30 backdrop-blur-md hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer relative"
                    onClick={() => {
                      setShowProfileGlow(true);
                      setTimeout(() => setShowProfileGlow(false), 1200);
                    }}
                  >
                    <span className="text-2xl md:text-3xl animate-bounce">🎓</span>
                    <span className="font-bold text-base md:text-lg tracking-wide">B.Tech CSE</span>
                    <span className="text-xs md:text-sm font-medium tracking-widest bg-background/60 rounded-full px-3 py-1 ml-2 animate-pulse">2023–2027</span>
                  </div>
                </div>
                {/* Animated Professional Title */}
                <div className="flex flex-col items-center justify-center animate-slideUp delay-1000 mb-8">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-light text-muted-foreground italic hover:text-accent transition-colors cursor-pointer text-center">Creative</div>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary hover:text-accent transition-colors cursor-pointer text-center">Developer.</div>
                </div>
                {/* Enhanced Status Card */}
                <div className="bg-card rounded-2xl p-4 md:p-6 shadow-soft border border-border backdrop-blur-sm hover:shadow-elegant transition-all duration-300 hover:scale-105 cursor-pointer animate-slideUp delay-1200">
                  <div className="flex items-center space-x-3 text-base md:text-lg text-muted-foreground">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
                    <span className="font-medium">Available for projects</span>
                    <div className="w-2 h-2 bg-accent rounded-full animate-ping"></div>
                  </div>
                </div>
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-xs animate-slideUp delay-1400">
                  <div className="text-center p-3 bg-card rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-105 cursor-pointer">
                    <div className="text-2xl font-bold text-accent">3</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center p-3 bg-card rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-105 cursor-pointer">
                    <div className="text-2xl font-bold text-accent">8</div>
                    <div className="text-xs text-muted-foreground">Technologies</div>
                  </div>
                </div>
              </div>

              {/* Left Content (now second column) */}
              <div className="order-2 lg:order-2 space-y-6 md:space-y-8 text-center lg:text-left animate-fadeInLeft">
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground animate-slideUp">
                    Hi! I Am
                  </h2>

                  {/* 3D/Striking Name Effect */}
                  <h1
                    className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight animate-slideUp delay-300 cursor-pointer text-center select-none relative"
                    style={{
                      fontFamily: 'Poppins, Montserrat, Arial, sans-serif',
                      fontWeight: 900,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                      textShadow: '0 2px 16px var(--accent), 0 1px 0 #fff8, 0 8px 32px var(--secondary)',
                      filter: 'drop-shadow(0 8px 32px var(--secondary))',
                    }}
                  >
                    {/* PRIYUNSHU on first line, SAHA on second, both animated */}
                    <span style={{ display: 'block', lineHeight: 1.1 }}>
                      {Array.from('PRIYUNSHU').map((char, i) => (
                        <span
                          key={i}
                          style={{
                            display: 'inline-block',
                            animation: `floatLetter 2.2s ease-in-out ${0.08 * i}s infinite`,
                            color: 'var(--accent)',
                            textShadow: '0 2px 16px var(--accent), 0 1px 0 #fff8, 0 8px 32px var(--secondary)',
                            filter: 'drop-shadow(0 8px 32px var(--secondary))',
                            transition: 'transform 0.2s',
                          }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                    <span style={{ display: 'block', lineHeight: 1.1 }}>
                      {Array.from('SAHA').map((char, i) => (
                        <span
                          key={i}
                          style={{
                            display: 'inline-block',
                            animation: `floatLetter 2.2s ease-in-out ${0.08 * (i + 8)}s infinite`,
                            color: 'var(--accent)',
                            textShadow: '0 2px 16px var(--accent), 0 1px 0 #fff8, 0 8px 32px var(--secondary)',
                            filter: 'drop-shadow(0 8px 32px var(--secondary))',
                            transition: 'transform 0.2s',
                          }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                    <style>{`
                      @keyframes floatLetter {
                        0%, 100% { transform: translateY(0); }
                        20% { transform: translateY(-12px) scale(1.08) rotate(-2deg); }
                        40% { transform: translateY(0) scale(1); }
                        60% { transform: translateY(8px) scale(0.98) rotate(2deg); }
                        80% { transform: translateY(0); }
                      }
                    `}</style>
                  </h1>
                </div>
                <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light max-w-lg mx-auto lg:mx-0 leading-relaxed animate-slideUp delay-500">
                  I build beautifully functional apps, and I love what I do.
                </p>
                {/* Typing Animation */}
                <div className="text-accent font-semibold text-lg animate-slideUp delay-700">
                  <span
                    className="animate-typing whitespace-nowrap overflow-x-auto block text-base md:text-lg lg:text-xl"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                  >
                    { "< Developer | AI Enthusiast | Flutter Expert />" }
                  </span>
                </div>
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start animate-slideUp delay-900">
                  <Button
                    onClick={() => scrollToSection('projects')}
                    className="group bg-gradient-to-r from-accent to-secondary hover:from-secondary hover:to-accent hover:shadow-xl shadow-accent/25 text-accent-foreground px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 transform hover:rotate-1 w-full sm:w-auto"
                  >
                    <Sparkles className="mr-2 w-5 h-5 group-hover:animate-spin" />
                    View Projects
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    onClick={() => scrollToSection('contact')}
                    variant="outline"
                    className="group border-2 border-border hover:border-accent text-foreground hover:bg-accent hover:text-accent-foreground px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 transform hover:-rotate-1 w-full sm:w-auto"
                  >
                    <Zap className="mr-2 w-5 h-5 group-hover:animate-pulse" />
                    Let's Connect
                  </Button>
                </div>
                {/* Enhanced Social Links */}
                <div className="flex space-x-4 pt-6 justify-center lg:justify-start animate-slideUp delay-1100 text-[0.9rem] sm:text-base">
                  <a href="https://github.com/PRIYUNSHU21" target="_blank" rel="noopener noreferrer" 
                     className="group w-12 h-12 bg-accent/10 hover:bg-accent hover:text-accent-foreground rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-soft hover:shadow-lg hover:rotate-12">
                    <Github className="w-5 h-5 text-accent group-hover:text-accent-foreground group-hover:scale-110 transition-all" />
                  </a>
                  <a href="https://www.linkedin.com/in/priyunshu-saha/" target="_blank" rel="noopener noreferrer"
                     className="group w-12 h-12 bg-accent/10 hover:bg-accent hover:text-accent-foreground rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-soft hover:shadow-lg hover:-rotate-12">
                    <Linkedin className="w-5 h-5 text-accent group-hover:text-accent-foreground group-hover:scale-110 transition-all" />
                  </a>
                  <a href="mailto:priyunshu.cse123096@bppimt.ac.in"
                     className="group w-12 h-12 bg-accent/10 hover:bg-accent hover:text-accent-foreground rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-soft hover:shadow-lg hover:rotate-12">
                    <Mail className="w-5 h-5 text-accent group-hover:text-accent-foreground group-hover:scale-110 transition-all" />
                  </a>
                </div>
                {/* Interactive Skills Preview with innovative effect */}
                <div className="flex items-center justify-center my-12 animate-slideUp delay-1300">
                  <div
                    key={skillChips[currentSkill]}
                    className={`transition-all duration-700 ease-in-out transform-gpu cursor-pointer relative group ${showEgg ? 'animate-wiggle' : ''}`}
                    style={{
                      margin: '2.5rem',
                      padding: '2.5rem',
                      borderRadius: '2rem',
                      background: 'rgba(255,255,255,0.18)',
                      boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18), 0 2px 8px 0 rgba(56,189,248,0.10)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1.5px solid rgba(255,255,255,0.25)',
                      minWidth: '13rem',
                      minHeight: '4.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '1.5rem',
                      opacity: 1,
                      scale: 1.08,
                    }}
                    onClick={() => setShowEgg(true)}
                    onMouseDown={e => e.currentTarget.classList.add('scale-95')}
                    onMouseUp={e => e.currentTarget.classList.remove('scale-95')}
                    onMouseLeave={e => e.currentTarget.classList.remove('scale-95')}
                  >
                    <Code2 className="inline w-9 h-9 text-accent drop-shadow-lg animate-pulse" />
                    <span className="font-extrabold text-3xl text-primary tracking-wide" style={{letterSpacing:'0.04em'}}>{skillChips[currentSkill]}</span>
                    {/* Innovative effect: Matrix-style code rain */}
                    {showEgg && (
                      <>
                        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center animate-matrix-fade">
                          <div className="matrix-rain w-full h-full flex flex-row items-end justify-center">
                            {[...Array(12)].map((_, i) => (
                              <span key={i} className="matrix-char text-accent/80 text-lg md:text-2xl select-none" style={{animationDelay: `${i * 0.08}s`}}>
                                {String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="absolute left-1/2 -top-12 transform -translate-x-1/2 z-50 bg-background/90 text-primary px-4 py-2 rounded-lg shadow-lg border border-accent/30 animate-fadeIn text-sm font-semibold flex items-center gap-2 whitespace-nowrap">
                          <span role="img" aria-label="matrix">🟩</span>
                          Welcome to the Matrix of Skills!
                        </div>
                      </>
                    )}
                    {/* Click ripple effect */}
                    <span className="absolute inset-0 rounded-2xl group-active:scale-90 group-active:bg-accent/10 transition-transform duration-150 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern About Section */}
      <section id="about" className="py-16 md:py-24 px-4 md:px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <div className="text-sm uppercase tracking-[0.3em] text-accent font-semibold">About Me</div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  PASSIONATE<br />
                  <span className="text-accent">INNOVATOR</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
                <p>I'm a passionate B.Tech Computer Science student at B P Poddar Institute of Management and Technology. My journey in technology is driven by curiosity and a desire to solve real-world problems through innovative solutions.</p>
                
                <p>My work focuses on building scalable systems and interactive applications, with a special interest in Artificial Intelligence, web3, and SaaS. I believe in the philosophy of Propose → Evaluate → Innovate.</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <Card className="bg-card border-border shadow-soft hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Education</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-accent text-lg mb-2">
                        B.Tech in Computer Science and Engineering
                      </h4>
                      <p className="text-muted-foreground text-sm">BP Poddar Institute of Management and Technology</p>
                      <p className="text-muted-foreground text-sm">2023–2027 | Current GPA: 8.8</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Badge className="bg-accent/10 text-accent border-accent/20 px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors">Curious</Badge>
                <Badge className="bg-accent/10 text-accent border-accent/20 px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors">Flexible</Badge>
                <Badge className="bg-accent/10 text-accent border-accent/20 px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors">Innovation-Driven</Badge>
                <Badge className="bg-accent/10 text-accent border-accent/20 px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors">Fast Learner</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Skills Section */}
      <section id="skills" className="py-16 md:py-24 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-sm uppercase tracking-[0.3em] text-accent font-semibold mb-4">Expertise</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              SKILLS &<br />
              <span className="text-accent">TECHNOLOGIES</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <div key={skill.name} className="space-y-3 p-4 md:p-6 rounded-xl bg-card border border-border shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="flex justify-between items-center">
                  <span className="text-foreground font-semibold text-base md:text-lg">{skill.name}</span>
                  <span className="text-accent font-bold text-sm md:text-base">{skill.level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-secondary rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Projects Section */}
      <section id="projects" className="py-16 md:py-24 px-4 md:px-6 bg-muted">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-sm uppercase tracking-[0.3em] text-accent font-semibold mb-4">Portfolio</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              FEATURED<br />
              <span className="text-accent">PROJECTS</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <Card key={project.title} className="bg-card border-border shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6 md:p-8">
                  <div className={`w-full h-32 rounded-xl bg-gradient-to-r ${project.color} mb-6 flex items-center justify-center shadow-soft`}>
                    {project.title === 'BHAV – Bengali AI Chatbot' ? (
                      <span className="text-white text-xl md:text-2xl font-bold">BHAV</span>
                    ) : (
                      <span className="text-white text-xl md:text-2xl font-bold">{project.title.split(' ')[0]}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                    {project.title}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="ml-2 inline-block align-middle text-accent hover:text-secondary transition-colors" title="Visit BHAV Website">
                        <ExternalLink className="inline w-5 h-5 mb-1" />
                      </a>
                    )}
                  </h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(tech => (
                      <Badge key={tech} variant="outline" className="border-accent/30 text-accent text-xs hover:bg-accent hover:text-accent-foreground transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Services Section */}
      <section id="services" className="py-16 md:py-24 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-sm uppercase tracking-[0.3em] text-accent font-semibold mb-4">Services</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              WHAT I CAN<br />
              <span className="text-accent">HELP YOU WITH</span>
            </h2>
            <p className="text-muted-foreground tracking-wide">Always eager to explore new tools and technologies</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => (
              <Card key={service.title} className="bg-card border-border shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-4 group-hover:text-accent transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Contact Section - Standardized & Enhanced */}
      <section id="contact" className="py-16 md:py-28 px-2 sm:px-4 md:px-6 bg-muted/80 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10 md:mb-20">
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-accent to-secondary text-white font-bold tracking-widest text-xs uppercase mb-4 shadow-lg border border-accent/40">Contact</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-xl" style={{textShadow: '0 2px 16px #000, 0 1px 0 #fff8'}}>
              Let's <span className="text-accent drop-shadow-xl" style={{textShadow: '0 2px 16px #000, 0 1px 0 #fff8'}}>Connect</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto font-bold text-white drop-shadow-xl" style={{textShadow: '0 2px 16px #000, 0 1px 0 #fff8'}}>
              Whether you have a question, want to collaborate, or just want to say hi, my inbox is always open.<br className="hidden sm:block" /> I'll try my best to get back to you!
            </p>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Contact Info Card */}
            <div className="bg-card rounded-2xl shadow-elegant border border-border p-5 sm:p-8 flex flex-col gap-6 sm:gap-8 justify-center animate-fadeInLeft w-full">
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground font-medium">Email</span>
                    <a href="mailto:priyunshu.cse123096@bppimt.ac.in" className="text-foreground font-semibold hover:text-accent transition-colors text-sm sm:text-base md:text-lg break-all">priyunshu.cse123096@bppimt.ac.in</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20">
                    <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground font-medium">LinkedIn</span>
                    <a href="https://www.linkedin.com/in/priyunshu-saha/" target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-accent transition-colors text-sm sm:text-base md:text-lg break-all">linkedin.com/in/priyunshu-saha</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20">
                    <Github className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground font-medium">GitHub</span>
                    <a href="https://github.com/PRIYUNSHU21" target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-accent transition-colors text-sm sm:text-base md:text-lg break-all">github.com/PRIYUNSHU21</a>
                  </div>
                </div>
              </div>
              <div className="mt-6 sm:mt-8 flex flex-col gap-1 sm:gap-2">
                <span className="text-xs text-muted-foreground font-medium">Location</span>
                <span className="text-sm sm:text-base text-foreground font-semibold">Kolkata, India</span>
              </div>
            </div>

            {/* Contact Form Card */}
            <Card className="bg-card border-border shadow-elegant rounded-2xl animate-fadeInRight w-full mt-8 md:mt-0">
              <CardContent className="p-5 sm:p-8 md:p-10">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Name</label>
                    <Input 
                      id="name"
                      name="name"
                      placeholder="Your Name" 
                      className="bg-input border-border text-foreground placeholder-muted-foreground h-11 sm:h-12 rounded-xl text-sm sm:text-base" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email</label>
                    <Input 
                      id="email"
                      name="email"
                      type="email" 
                      placeholder="your.email@example.com" 
                      className="bg-input border-border text-foreground placeholder-muted-foreground h-11 sm:h-12 rounded-xl text-sm sm:text-base" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <label htmlFor="message" className="text-sm font-medium text-muted-foreground">Message</label>
                    <Textarea 
                      id="message"
                      name="message"
                      placeholder="Tell me about your project or idea..." 
                      rows={4} 
                      className="bg-input border-border text-foreground placeholder-muted-foreground resize-none rounded-xl text-sm sm:text-base" 
                      required 
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-accent to-secondary hover:shadow-lg shadow-accent/25 text-accent-foreground font-semibold h-11 sm:h-12 rounded-xl tracking-wide disabled:opacity-50 transition-all duration-300 mt-1 sm:mt-2 text-sm sm:text-base"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Modern Footer with Bhagavad Gita Shloka */}
      <footer className="py-12 px-4 md:px-6 border-t border-border bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="text-foreground font-bold tracking-wider text-lg">
              PRIYUNSHU SAHA
            </div>
            <div className="bg-gradient-to-r from-accent/20 to-secondary/20 rounded-xl px-6 py-4 shadow-soft border border-accent/30 max-w-2xl">
              <div className="text-base md:text-lg font-semibold text-primary mb-2">भगवद्गीता २.४७</div>
              <div className="text-md md:text-lg font-bold text-accent mb-2">कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।<br/>मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥</div>
              <div className="text-sm md:text-base text-muted-foreground italic mb-1">karmaṇy-evādhikāras te mā phaleṣhu kadāchana<br/>mā karma-phala-hetur bhūr mā te saṅgo 'stvakarmaṇi</div>
              <div className="text-sm md:text-base text-foreground mt-2">You have the right to perform your actions, but not to the fruits thereof. Let not the results of action be your motive, nor let your attachment be to inaction.</div>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground tracking-wider mt-2">
              <span>Visit again</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modern Skills Ticker */}
      <div className="fixed bottom-0 left-0 w-full py-3 overflow-hidden z-40 bg-accent/90 backdrop-blur-sm">
        <div className="flex space-x-8 animate-scroll whitespace-nowrap">
          <span className="text-sm font-semibold text-accent-foreground">Mobile Development ✦</span>
          <span className="text-sm font-semibold text-accent-foreground">AI Integration ✦</span>
          <span className="text-sm font-semibold text-accent-foreground">Backend APIs ✦</span>
          <span className="text-sm font-semibold text-accent-foreground">Bengali Tech ✦</span>
          <span className="text-sm font-semibold text-accent-foreground">UI/UX Design ✦</span>
          <span className="text-sm font-semibold text-accent-foreground">Flutter Apps ✦</span>
          <span className="text-sm font-semibold text-accent-foreground">Mobile Development ✦</span>
          <span className="text-sm font-semibold text-accent-foreground">AI Integration ✦</span>
          <span className="text-sm font-semibold text-accent-foreground">Backend APIs ✦</span>
          <span className="text-sm font-semibold text-accent-foreground">Bengali Tech ✦</span>
        </div>
      </div>
    </div>
  );
}

export default Index;


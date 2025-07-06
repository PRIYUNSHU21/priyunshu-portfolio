
import { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Mail, ExternalLink, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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

  const skills = [
    { name: 'Python', level: 90 },
    { name: 'C++', level: 85 },
    { name: 'C', level: 80 },
    { name: 'Flutter/Dart', level: 85 },
    { name: 'Flask', level: 80 },
    { name: 'Firebase', level: 85 },
    { name: 'AI/ML & NLP', level: 75 },
    { name: 'Git/GitHub', level: 90 }
  ];

  const projects = [
    {
      title: 'BHAV – Bengali AI Chatbot',
      description: 'AI-powered chatbot for Bengali interaction with complete website & mobile app integration.',
      tech: ['NLP', 'LLM', 'Flutter', 'Flask'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Smart Attendance System',
      description: 'Geofencing-based attendance tracker with real-time Firebase sync and location verification.',
      tech: ['Flutter', 'Firebase', 'Geolocation'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Automint',
      description: 'Decentralized smart invoice platform for B2B transactions with complete design-to-deployment pipeline.',
      tech: ['Backend', 'API', 'UI/UX', 'Database'],
      color: 'from-green-500 to-teal-500'
    }
  ];

  const services = [
    {
      title: 'Mobile App Development',
      description: 'Cross-platform apps with Flutter focusing on performance and user experience',
      icon: '📱'
    },
    {
      title: 'AI Integration & Automation',
      description: 'Custom AI solutions, chatbots, and intelligent automation systems',
      icon: '🤖'
    },
    {
      title: 'Backend API Development',
      description: 'Scalable REST APIs and database architecture with Flask and Firebase',
      icon: '⚡'
    },
    {
      title: 'UI/UX Ideation',
      description: 'User-centered design concepts and interactive prototypes (continuous learning)',
      icon: '🎨'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-light tracking-wider text-white">
              PRIYUNSHU SAHA
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'services', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors font-light tracking-wide ${
                    activeSection === item 
                      ? 'text-amber-400' 
                      : 'text-white hover:text-amber-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-4 bg-black/40 rounded-lg p-4">
              {['home', 'about', 'skills', 'projects', 'services', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left capitalize text-white hover:text-amber-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
        {/* Background geometric elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-amber-400/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-500/10 rounded-full blur-lg"></div>
        
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="text-sm uppercase tracking-[0.3em] text-amber-400 font-light">
                B.Tech CSE Student
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold leading-none">
                <span className="text-white">PRIYUNSHU</span>
                <br />
                <span className="text-amber-400">SAHA</span>
              </h1>
              
              <div className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
                SOFTWARE DEVELOPER
              </div>
            </div>
            
            <div className="space-y-4 max-w-lg">
              <p className="text-gray-400 text-lg leading-relaxed">
                AS A SOFTWARE DEVELOPER, I FOCUS ON PRODUCING TOP-NOTCH AND IMPACTFUL 
                DIGITAL EXPERIENCES.
              </p>
              
              <p className="text-sm uppercase tracking-wider text-gray-500">
                PRIYUNSHU'S AI & BENGALI TECH EXPERTISE DELIVERED.
              </p>
            </div>
            
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-light tracking-wider transition-all duration-300"
            >
              Let's talk <ArrowRight className="ml-2" />
            </Button>
          </div>
          
          {/* Right Content - Profile Image */}
          <div className="flex justify-center relative">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-amber-400/30">
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-8xl">
                  👨‍💻
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-amber-400 text-black rounded-full w-20 h-20 flex items-center justify-center font-bold text-2xl">
                8.8
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom tagline */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <p className="text-center text-gray-400 text-sm tracking-wider">
            INNOVATING BEYOND CODE | AI, APPS & BENGALI INTELLIGENCE
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-black/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="text-sm uppercase tracking-[0.3em] text-amber-400 mb-4">About Me</div>
                <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                  PASSIONATE<br />
                  <span className="text-amber-400">INNOVATOR</span>
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I'm a passionate B.Tech Computer Science student at BP Poddar Institute of Management and Technology, 
                  currently maintaining a strong GPA of 8.8. My journey in technology is driven by curiosity and a 
                  desire to solve real-world problems through innovative solutions.
                </p>
                
                <p>
                  My work focuses on building scalable systems and interactive applications, with a special interest 
                  in serving the Bengali-speaking community through AI-powered solutions. I believe in the philosophy 
                  of Propose → Evaluate → Innovate.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Education</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-amber-400">
                        B.Tech in Computer Science and Engineering
                      </h4>
                      <p className="text-gray-300">BP Poddar Institute of Management and Technology</p>
                      <p className="text-gray-400">2023–2027 | Current GPA: 8.8</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-amber-400/20 text-amber-300 px-4 py-2">Curious</Badge>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 px-4 py-2">Flexible</Badge>
                <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 px-4 py-2">Innovation-Driven</Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 px-4 py-2">Fast Learner</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm uppercase tracking-[0.3em] text-amber-400 mb-4">Expertise</div>
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              SKILLS &<br />
              <span className="text-amber-400">TECHNOLOGIES</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <div key={skill.name} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium text-lg">{skill.name}</span>
                  <span className="text-amber-400 font-light">{skill.level}%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-black/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm uppercase tracking-[0.3em] text-amber-400 mb-4">Portfolio</div>
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              FEATURED<br />
              <span className="text-amber-400">PROJECTS</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={project.title} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-8">
                  <div className={`w-full h-32 rounded-lg bg-gradient-to-r ${project.color} mb-6 flex items-center justify-center text-white text-2xl font-bold`}>
                    {project.title.split(' ')[0]}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-300 mb-6 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-amber-400/30 text-amber-300 text-xs">
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

      {/* Services Section */}
      <section id="services" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm uppercase tracking-[0.3em] text-amber-400 mb-4">Services</div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              WHAT I CAN<br />
              <span className="text-amber-400">HELP YOU WITH</span>
            </h2>
            <p className="text-gray-400 tracking-wider">ALWAYS EAGER TO EXPLORE NEW TOOLS AND TECHNOLOGIES</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={service.title} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-6">{service.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">{service.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-black/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="text-sm uppercase tracking-[0.3em] text-amber-400 mb-4">Contact</div>
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              LET'S<br />
              <span className="text-amber-400">CONNECT</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Get In Touch</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  I'm always excited to discuss new projects, innovative ideas, or opportunities to bring 
                  your vision to life. Let's create something amazing together!
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-400/20 rounded-full flex items-center justify-center">
                    <Mail className="text-amber-400 w-5 h-5" />
                  </div>
                  <span className="text-gray-300">priyunshu.dev@example.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-400/20 rounded-full flex items-center justify-center">
                    <Linkedin className="text-amber-400 w-5 h-5" />
                  </div>
                  <a href="https://www.linkedin.com/in/priyunshu-saha" className="text-gray-300 hover:text-amber-400 transition-colors">
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-400/20 rounded-full flex items-center justify-center">
                    <Github className="text-amber-400 w-5 h-5" />
                  </div>
                  <span className="text-gray-300">GitHub (Available on request)</span>
                </div>
              </div>
            </div>
            
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input 
                      placeholder="Your Name" 
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 h-12"
                      required
                    />
                  </div>
                  <div>
                    <Input 
                      type="email" 
                      placeholder="your.email@example.com" 
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 h-12"
                      required
                    />
                  </div>
                  <div>
                    <Textarea 
                      placeholder="Tell me about your project or idea..." 
                      rows={5}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 resize-none"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-amber-400 hover:bg-amber-500 text-black font-semibold h-12 tracking-wider"
                  >
                    Send Message <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white font-light tracking-wider">
              PRIYUNSHU SAHA
            </div>
            <div className="text-gray-400 text-sm tracking-wider">
              © 2024 BUILT WITH PASSION AND INNOVATION
            </div>
            <div className="flex space-x-6 text-sm text-gray-400 tracking-wider">
              <span>DIGITAL DESIGN</span>
              <span>2024</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Scrolling skills ticker */}
      <div className="fixed bottom-0 left-0 w-full bg-amber-400 text-black py-2 overflow-hidden z-40">
        <div className="flex space-x-8 animate-scroll whitespace-nowrap">
          <span className="text-sm font-semibold">Mobile Development ✦</span>
          <span className="text-sm font-semibold">AI Integration ✦</span>
          <span className="text-sm font-semibold">Backend APIs ✦</span>
          <span className="text-sm font-semibold">Bengali Tech ✦</span>
          <span className="text-sm font-semibold">UI/UX Design ✦</span>
          <span className="text-sm font-semibold">Flutter Apps ✦</span>
          <span className="text-sm font-semibold">Mobile Development ✦</span>
          <span className="text-sm font-semibold">AI Integration ✦</span>
          <span className="text-sm font-semibold">Backend APIs ✦</span>
          <span className="text-sm font-semibold">Bengali Tech ✦</span>
        </div>
      </div>
    </div>
  );
};

export default Index;

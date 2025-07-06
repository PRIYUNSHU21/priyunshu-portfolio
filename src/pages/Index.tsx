
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
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Priyunshu Saha
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'services', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors ${
                    activeSection === item 
                      ? 'text-purple-400' 
                      : 'text-white hover:text-purple-400'
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
                  className="block w-full text-left capitalize text-white hover:text-purple-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="container mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-4xl">
                👨‍💻
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-fade-in">
            PRIYUNSHU SAHA
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-300 mb-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Innovating Beyond Code | AI, Apps & Bengali Intelligence
          </p>
          
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.4s'}}>
            B.Tech CSE Student passionate about building scalable systems and interactive applications, 
            particularly for the Bengali-speaking community.
          </p>
          
          <Button 
            onClick={() => scrollToSection('projects')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg animate-fade-in"
            style={{animationDelay: '0.6s'}}
          >
            Explore My Work <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate B.Tech Computer Science student at BP Poddar Institute of Management and Technology, 
                currently maintaining a strong GPA of 8.8. My journey in technology is driven by curiosity and a 
                desire to solve real-world problems through innovative solutions.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                My work focuses on building scalable systems and interactive applications, with a special interest 
                in serving the Bengali-speaking community through AI-powered solutions. I believe in the philosophy 
                of Propose → Evaluate → Innovate.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">Curious</Badge>
                <Badge variant="secondary" className="bg-pink-500/20 text-pink-300">Flexible</Badge>
                <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300">Innovation-Driven</Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300">Fast Learner</Badge>
              </div>
            </div>
            
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Education</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-lg font-semibold text-purple-300">
                      B.Tech in Computer Science and Engineering
                    </h4>
                    <p className="text-gray-300">BP Poddar Institute of Management and Technology</p>
                    <p className="text-gray-400">2023–2027 | Current GPA: 8.8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-black/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-purple-400">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={project.title} className="bg-gradient-to-br from-gray-900/80 to-black/80 border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className={`w-full h-32 rounded-lg bg-gradient-to-r ${project.color} mb-4 flex items-center justify-center text-white text-2xl font-bold`}>
                    {project.title.split(' ')[0]}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-purple-500/30 text-purple-300">
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
      <section id="services" className="py-20 px-6 bg-black/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            What I Can Help You With
          </h2>
          <p className="text-center text-gray-400 mb-12">Always eager to explore new tools and technologies</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={service.title} className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
              <p className="text-gray-300 leading-relaxed">
                I'm always excited to discuss new projects, innovative ideas, or opportunities to bring 
                your vision to life. Let's create something amazing together!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-purple-400" />
                  <span className="text-gray-300">priyunshu.dev@example.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Linkedin className="text-purple-400" />
                  <a href="https://www.linkedin.com/in/priyunshu-saha" className="text-gray-300 hover:text-purple-400 transition-colors">
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Github className="text-purple-400" />
                  <span className="text-gray-300">GitHub (Available on request)</span>
                </div>
              </div>
            </div>
            
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input 
                      placeholder="Your Name" 
                      className="bg-black/20 border-gray-600 text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <Input 
                      type="email" 
                      placeholder="your.email@example.com" 
                      className="bg-black/20 border-gray-600 text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <Textarea 
                      placeholder="Tell me about your project or idea..." 
                      rows={4}
                      className="bg-black/20 border-gray-600 text-white placeholder-gray-400 resize-none"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Priyunshu Saha. Built with passion and innovation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

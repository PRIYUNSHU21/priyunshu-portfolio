import { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Mail, ExternalLink, Github, Linkedin, Sparkles, Code2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const Index = () => {
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
    color: 'from-purple-500 to-pink-500'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-indigo-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-violet-500/20">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-lg md:text-xl font-semibold tracking-wider text-white">
              PRIYUNSHU SAHA
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'services', 'contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 font-medium tracking-wide text-sm ${
                    activeSection === item
                      ? 'text-orange-400 scale-105'
                      : 'text-gray-300 hover:text-orange-400 hover:scale-105'
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
            <div className="md:hidden mt-4 space-y-4 bg-slate-900/80 backdrop-blur-lg rounded-xl p-6">
              {['home', 'about', 'skills', 'projects', 'services', 'contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left capitalize text-gray-300 hover:text-orange-400 transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* World-Class Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Sophisticated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-violet-950/50 to-slate-950">
          {/* Dynamic gradient meshes */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/8 to-teal-500/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"></div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center space-y-12 max-w-5xl mx-auto">
            
            {/* Refined Badge */}
            <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 border border-white/10">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-300 tracking-wide">
                Software Developer & AI Enthusiast
              </span>
            </div>

            {/* Powerful Typography */}
            <div className="space-y-8">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight">
                <span className="block text-white drop-shadow-2xl">PRIYUNSHU</span>
                <span className="block bg-gradient-to-r from-orange-400 via-pink-500 to-violet-500 bg-clip-text text-transparent">
                  SAHA
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
                Building the future with <span className="text-orange-400 font-semibold">intelligent code</span> and 
                <span className="text-violet-400 font-semibold"> innovative solutions</span>
              </p>
            </div>

            {/* Streamlined CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                onClick={() => scrollToSection('projects')}
                className="group bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 px-8 py-4 text-lg font-semibold tracking-wide transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30 rounded-full"
              >
                View My Work 
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={() => scrollToSection('contact')}
                variant="ghost"
                className="text-gray-300 hover:text-white px-8 py-4 text-lg font-semibold tracking-wide transition-all duration-300 hover:scale-105 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 backdrop-blur-sm"
              >
                Let's Connect
              </Button>
            </div>

            {/* Profile Integration */}
            <div className="relative pt-16">
              <div className="relative inline-block">
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-pink-500/20 to-violet-500/20 rounded-full blur-2xl scale-110 animate-pulse"></div>
                
                {/* Profile image */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
                  <img 
                    src="https://i.postimg.cc/qvgLpnkv/PSX-20240716-171349.jpg" 
                    alt="Priyunshu Saha"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                </div>
                
                {/* Achievement badge */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full w-12 h-12 md:w-14 md:h-14 flex flex-col items-center justify-center text-xs md:text-sm font-bold shadow-xl">
                  <span className="text-sm md:text-base">8.8</span>
                  <span className="text-[10px]">GPA</span>
                </div>
              </div>
            </div>

            {/* Status indicator */}
            <div className="flex items-center justify-center space-x-3 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Available for exciting projects</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-950 rounded-none">
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
                <p>I'm a passionate B.Tech Computer Science student at B P Poddar Institute of Management and Technology. My journey in technology is driven by curiosity and a desire to solve real-world problems through innovative solutions.</p>
                
                <p>My work focuses on building scalable systems and interactive applications, with a special interest in Artificial Intelligence, web3, Saas . I believe in the philosophy of Propose → Evaluate → Innovate.</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Education</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-amber-400 text-lg">
                        B.Tech in Computer Science and Engineering
                      </h4>
                      <p className="text-gray-300 text-sm">BP Poddar Institute of Management and Technology</p>
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
      <section id="projects" className="py-20 px-6 bg-[#101010]/[0.86]">
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
                    {project.tech.map(tech => (
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
      <section id="services" className="py-20 px-6 bg-[#03000a]">
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

      {/* Contact Section with EmailJS Integration */}
      <section id="contact" className="py-20 px-6 rounded-lg bg-slate-800">
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
                  <span className="text-gray-300">priyunshu.cse123096@bppimt.ac.in</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-400/20 rounded-full flex items-center justify-center">
                    <Linkedin className="text-amber-400 w-5 h-5" />
                  </div>
                  <a href="https://www.linkedin.com/in/priyunshu-saha/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400 transition-colors">
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-400/20 rounded-full flex items-center justify-center">
                    <Github className="text-amber-400 w-5 h-5" />
                  </div>
                  <a href="https://github.com/PRIYUNSHU21" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400 transition-colors">
                    GitHub Profile
                  </a>
                </div>
              </div>
            </div>
            
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input 
                      name="name"
                      placeholder="Your Name" 
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 h-12" 
                      required 
                    />
                  </div>
                  <div>
                    <Input 
                      name="email"
                      type="email" 
                      placeholder="your.email@example.com" 
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 h-12" 
                      required 
                    />
                  </div>
                  <div>
                    <Textarea 
                      name="message"
                      placeholder="Tell me about your project or idea..." 
                      rows={5} 
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 resize-none" 
                      required 
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-amber-400 hover:bg-amber-500 text-black font-semibold h-12 tracking-wider disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 bg-[#14011e]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white font-light tracking-wider">
              PRIYUNSHU SAHA
            </div>
            <div className="text-gray-400 text-sm tracking-wider">BYE ! HOPE TO SEE YOU AGAIN</div>
            <div className="flex space-x-6 text-sm text-gray-400 tracking-wider">
              <span>COOOL !</span>
              <span>2024</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Scrolling skills ticker */}
      <div className="fixed bottom-0 left-0 w-full text-black py-2 overflow-hidden z-40 bg-[#c1c2dd] rounded-none">
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

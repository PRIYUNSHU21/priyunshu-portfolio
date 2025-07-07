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

      {/* Modern Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 md:pt-20">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[85vh]">
              
              {/* Left Content */}
              <div className="order-2 lg:order-1 space-y-6 md:space-y-8 text-center lg:text-left">
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
                    Hi! I Am
                  </h2>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-accent leading-tight bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                    PRIYUNSHU<br />SAHA.
                  </h1>
                </div>
                
                <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  I build beautifully functional apps, and I love what I do.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                  <Button
                    onClick={() => scrollToSection('projects')}
                    className="bg-gradient-to-r from-accent to-secondary hover:shadow-lg shadow-accent/25 text-accent-foreground px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105"
                  >
                    View Projects
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <Button
                    onClick={() => scrollToSection('contact')}
                    variant="outline"
                    className="border-2 border-border hover:border-accent text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105"
                  >
                    Let's Connect
                  </Button>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4 pt-6 justify-center lg:justify-start">
                  <a href="https://github.com/PRIYUNSHU21" target="_blank" rel="noopener noreferrer" 
                     className="w-12 h-12 bg-accent/10 hover:bg-accent hover:text-accent-foreground rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-soft">
                    <Github className="w-5 h-5 text-accent hover:text-accent-foreground" />
                  </a>
                  <a href="https://www.linkedin.com/in/priyunshu-saha/" target="_blank" rel="noopener noreferrer"
                     className="w-12 h-12 bg-accent/10 hover:bg-accent hover:text-accent-foreground rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-soft">
                    <Linkedin className="w-5 h-5 text-accent hover:text-accent-foreground" />
                  </a>
                  <a href="mailto:priyunshu.cse123096@bppimt.ac.in"
                     className="w-12 h-12 bg-accent/10 hover:bg-accent hover:text-accent-foreground rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-soft">
                    <Mail className="w-5 h-5 text-accent hover:text-accent-foreground" />
                  </a>
                </div>
              </div>

              {/* Right Content - Profile & Stats */}
              <div className="order-1 lg:order-2 relative flex flex-col items-center space-y-6 md:space-y-8">
                
                {/* Experience Badge */}
                <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 text-center z-10">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">02</div>
                  <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide font-medium">
                    Years<br />Experience
                  </div>
                </div>

                {/* Profile Image */}
                <div className="relative">
                  <div className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-card shadow-elegant bg-card">
                    <img 
                      src="https://i.postimg.cc/qvgLpnkv/PSX-20240716-171349.jpg" 
                      alt="Priyunshu Saha"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-accent to-secondary rounded-full shadow-soft"></div>
                  <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-8 h-8 md:w-12 md:h-12 border-2 border-primary rounded-full bg-background shadow-soft"></div>
                  
                  {/* GPA Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-accent to-secondary text-accent-foreground rounded-full w-14 h-14 md:w-16 md:h-16 flex flex-col items-center justify-center text-sm font-bold shadow-elegant">
                    <span className="text-base md:text-lg">8.8</span>
                    <span className="text-xs">GPA</span>
                  </div>
                </div>

                {/* Professional Title */}
                <div className="text-center lg:text-right">
                  <div className="text-xl md:text-2xl lg:text-3xl font-light text-muted-foreground italic">Creative</div>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">Developer.</div>
                </div>

                {/* Status Card */}
                <div className="bg-card rounded-2xl p-4 md:p-6 shadow-soft border border-border backdrop-blur-sm">
                  <div className="flex items-center space-x-3 text-sm md:text-base text-muted-foreground">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
                    <span className="font-medium">Available for projects</span>
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
                  <div className={`w-full h-32 rounded-xl bg-gradient-to-r ${project.color} mb-6 flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-soft`}>
                    {project.title.split(' ')[0]}
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">{project.title}</h3>
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

      {/* Modern Contact Section */}
      <section id="contact" className="py-16 md:py-24 px-4 md:px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-sm uppercase tracking-[0.3em] text-accent font-semibold mb-4">Contact</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              LET'S<br />
              <span className="text-accent">CONNECT</span>
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-8">
              <div className="space-y-6 text-center lg:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">Get In Touch</h3>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                  I'm always excited to discuss new projects, innovative ideas, or opportunities to bring 
                  your vision to life. Let's create something amazing together!
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 justify-center lg:justify-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Mail className="text-accent w-5 h-5" />
                  </div>
                  <span className="text-muted-foreground text-sm md:text-base">priyunshu.cse123096@bppimt.ac.in</span>
                </div>
                <div className="flex items-center space-x-4 justify-center lg:justify-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Linkedin className="text-accent w-5 h-5" />
                  </div>
                  <a href="https://www.linkedin.com/in/priyunshu-saha/" target="_blank" rel="noopener noreferrer" 
                     className="text-muted-foreground hover:text-accent transition-colors text-sm md:text-base">
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center space-x-4 justify-center lg:justify-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Github className="text-accent w-5 h-5" />
                  </div>
                  <a href="https://github.com/PRIYUNSHU21" target="_blank" rel="noopener noreferrer" 
                     className="text-muted-foreground hover:text-accent transition-colors text-sm md:text-base">
                    GitHub Profile
                  </a>
                </div>
              </div>
            </div>
            
            <Card className="bg-card border-border shadow-soft">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input 
                      name="name"
                      placeholder="Your Name" 
                      className="bg-input border-border text-foreground placeholder-muted-foreground h-12 rounded-xl" 
                      required 
                    />
                  </div>
                  <div>
                    <Input 
                      name="email"
                      type="email" 
                      placeholder="your.email@example.com" 
                      className="bg-input border-border text-foreground placeholder-muted-foreground h-12 rounded-xl" 
                      required 
                    />
                  </div>
                  <div>
                    <Textarea 
                      name="message"
                      placeholder="Tell me about your project or idea..." 
                      rows={5} 
                      className="bg-input border-border text-foreground placeholder-muted-foreground resize-none rounded-xl" 
                      required 
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-accent to-secondary hover:shadow-lg shadow-accent/25 text-accent-foreground font-semibold h-12 rounded-xl tracking-wide disabled:opacity-50 transition-all duration-300"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="py-12 px-4 md:px-6 border-t border-border bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-foreground font-bold tracking-wider text-lg">
              PRIYUNSHU SAHA
            </div>
            <div className="text-muted-foreground text-sm tracking-wider">Thanks for visiting! Hope to see you again</div>
            <div className="flex space-x-6 text-sm text-muted-foreground tracking-wider">
              <span>Made with ❤️</span>
              <span>2024</span>
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
};

export default Index;

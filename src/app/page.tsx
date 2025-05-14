"use client";

import Link from "next/link";
import { ArrowRight, Linkedin, Twitter, Mail, Download, Github } from "lucide-react";
import { ProjectCarousel } from "@/components/project-carousel";
import { projects } from "@/lib/projects";
import { useState, useEffect } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["about", "skills", "projects", "contact"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  interface NavLinkProps {
    href: string;
    title: string;
  }

  const NavLink = ({ href, title }: NavLinkProps) => (
    <a 
      href={href} 
      className={`text-sm font-medium transition-colors ${
        activeSection === href.replace("#", "") 
          ? "text-blue-500" 
          : "text-gray-300 hover:text-blue-500"
      }`}
    >
      {title}
    </a>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header 
        className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
          isScrolled 
            ? "border-white/10 bg-black/80 backdrop-blur-s" 
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-blue-500">Mikhail</span>JBS
          </Link>
          
          {/* Desktop Navigation */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6">
              <NavLink href="#about" title="About" />
              <NavLink href="#skills" title="Skills" />
              <NavLink href="#projects" title="Projects" />
              <NavLink href="#contact" title="Contact" />
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Menu</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="8" x2="20" y2="8" />
                    <line x1="4" y1="16" x2="20" y2="16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-b border-white/10">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a 
                href="#about" 
                className="text-sm font-medium py-2 hover:text-blue-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#skills" 
                className="text-sm font-medium py-2 hover:text-blue-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Skills
              </a>
              <a 
                href="#projects" 
                className="text-sm font-medium py-2 hover:text-blue-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </a>
              <a 
                href="#contact" 
                className="text-sm font-medium py-2 hover:text-blue-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent opacity-40 pointer-events-none"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Hi, I&rsquo;m <span className="text-blue-500">Mikhail</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              A passionate web developer building modern, secure, and user-friendly applications
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-md bg-blue-500 px-6 py-3 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
              >
                View My Work
              </a>
              <a
                href="https://drive.google.com/file/d/1pISl6NVG0hZe0xVmee6-dYzRP2Sw6Lqo/view?usp=sharing"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-transparent px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </div>
          </div>
        </div>
        
        {/* Animated shape */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-white/5 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-bold mb-2">About Me</h2>
              <div className="h-1 w-12 bg-blue-500 mb-6"></div>
            </div>
            
            <div className="md:w-2/3 space-y-6">
              <p className="text-lg text-gray-300">
                I&rsquo;m a web developer with a passion for creating functional, user-friendly, and secure websites. I
                specialize in modern frontend and backend frameworks, mainly working with Javascript and Typescript.
              </p>
              <p className="text-lg text-gray-300">
                I&rsquo;ve worked on a variety of projects ranging from personal fun projects, complex multiservices, to enterprise level projects
                with some renowned clients.
              </p>
              
              <div className="pt-4 grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Education</h3>
                  <p className="text-gray-400">Bachelor in Information Systems</p>
                  <p className="text-gray-400">University Indonesia, 2022-2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 md:py-32">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">My Skills</h2>
            <div className="h-1 w-12 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-gray-300">
              I&rsquo;ve worked with various technologies across the full stack development spectrum. 
              Here are my areas of expertise:
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-blue-500/50 transition-colors">
              <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-3">Frontend</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  React / Next.js / Vue.js
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  JavaScript
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  Tailwind CSS
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  HTML / CSS
                </li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-blue-500/50 transition-colors">
              <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-3">Backend</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  Node.js
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  Express
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  Spring Boot
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  Django
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  REST APIs
                </li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-blue-500/50 transition-colors">
              <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-8m3 8v-6m3 6v-4" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-3">Database</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  MongoDB
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  PostgreSQL
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  NeonDB
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  Supabase
                </li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-blue-500/50 transition-colors">
              <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-3">Tools</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  Git / GitHub
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  VS Code
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  Figma
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  Docker
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  Vercel / Netlify
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 md:py-32 bg-white/5 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 space-y-10 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
              <div className="h-1 w-12 bg-blue-500 mb-2"></div>
              <p className="text-gray-400 max-w-xl">
                Here are some of my recent projects.
              </p>
            </div>
            <Link
              href="/projects"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/10 bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              View All Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <ProjectCarousel projects={projects} />
          
          <div className="md:hidden pt-6 flex justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/10 bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              View All Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
              <div className="h-1 w-12 bg-blue-500 mx-auto mb-6"></div>
              <p className="text-gray-300 max-w-lg mx-auto">
                Have a project in mind or want to chat? Feel free to reach out! I&rsquo;m always open to discussing new projects, creative ideas or opportunities to be part of your vision.
              </p>
            </div>
            
            <div className="grid md:grid-cols-5 gap-8">
              {/* Contact Info */}
              <div className="md:col-span-2 space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-500/20 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-gray-400">mikhailharitz@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-500/20 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-gray-400">+6281222439087</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-500/20 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Location</h3>
                    <p className="text-gray-400">Depok, Jawa Barat</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-4">Connect with me</h3>
                  <div className="flex gap-4">
                    <a 
                      href="https://github.com/MikhailJBS" 
                      className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/mikhailharitz77/" 
                      className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://twitter.com" 
                      className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="md:col-span-3">
                <form className="bg-white/5 rounded-lg border border-white/10 p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium block">
                        Name
                      </label>
                      <input
                        id="name"
                        className="w-full p-3 rounded-md border border-white/10 bg-white/5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium block">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full p-3 rounded-md border border-white/10 bg-white/5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium block">
                      Subject
                    </label>
                    <input
                      id="subject"
                      className="w-full p-3 rounded-md border border-white/10 bg-white/5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="Subject"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium block">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="w-full p-3 rounded-md border border-white/10 bg-white/5 text-white min-h-32 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="Your message"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-md bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to top button */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg z-50 hover:bg-blue-600 transition-colors"
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </Link>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <Link href="/" className="text-xl font-bold">
                <span className="text-blue-500">Mikhail</span>JBS
              </Link>
              <p className="mt-4 text-gray-400 max-w-xs">
                A passionate web developer focused on creating functional and secure websites and applications.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <nav className="flex flex-col space-y-2.5">
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#skills" className="text-gray-400 hover:text-white transition-colors">Skills</a>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </nav>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2.5 text-gray-400">
                <p>mikhailharitz@gmail.com</p>
                <p>+6281222439087</p>
                <p>Depok, Jawa Barat</p>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 w-full justify-center">
              <p className="text-sm text-gray-400 text-center w-full">© {new Date().getFullYear()} Mikhail Haritz. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
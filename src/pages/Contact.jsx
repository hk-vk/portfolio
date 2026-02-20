import React, { useState } from 'react';
import { motion } from '../lib/motion';
import SEOHead from '../components/SEOHead';
import { duration } from '../utils/motionSettings';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: '📧',
      value: 'vkharikrishnan45@gmail.com',
      href: 'mailto:vkharikrishnan45@gmail.com'
    },
    {
      name: 'GitHub',
      icon: '🐱',
      value: 'github.com/harikrishnan',
      href: 'https://github.com/harikrishnan'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      value: 'linkedin.com/in/harikrishnan',
      href: 'https://linkedin.com/in/harikrishnan'
    }
  ];

  return (
    <>
      <SEOHead 
        title="Contact | Harikrishnan V K"
        description="Get in touch with Harikrishnan V K. Let's discuss your next project, collaborate on exciting opportunities, or just have a chat about web development."
        url="/contact"
      />
      <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.moderate / 1000, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Work Together
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. 
            Drop me a message and let's create something amazing!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: duration.moderate / 1000, delay: 0.04, ease: 'easeOut' }}
          >
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
            
            {isSubmitted ? (
              <motion.div
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">
                  Message Sent!
                </h3>
                <p className="text-green-600 dark:text-green-300">
                  Thanks for reaching out. I'll get back to you soon!
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-sm text-green-600 dark:text-green-400 hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-[border-color,box-shadow] duration-150"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-[border-color,box-shadow] duration-150"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-[border-color,box-shadow] duration-150 resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-[background-color,transform,opacity] duration-150 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span>📤</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08, duration: duration.moderate / 1000, ease: 'easeOut' }}
          >
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            
            <div className="space-y-4 mb-8">
              <p className="text-muted-foreground">
                I'm currently available for freelance work and open to discussing 
                new opportunities. Whether you have a project in mind or just want 
                to connect, I'd love to hear from you.
              </p>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>📍</span>
                <span>Based in India</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>⏰</span>
                <span>Usually responds within 24 hours</span>
              </div>
            </div>

            <h3 className="text-lg font-medium mb-4">Connect with me</h3>
            <div className="space-y-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.04, duration: duration.standard / 1000, ease: 'easeOut' }}
                  whileHover={{ x: 3 }}
                >
                  <span className="text-xl">{link.icon}</span>
                  <div>
                    <div className="font-medium">{link.name}</div>
                    <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      {link.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: duration.moderate / 1000, ease: 'easeOut' }}
        >
          <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:vkharikrishnan45@gmail.com?subject=Project Inquiry"
              className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              📧 Quick Email
            </a>
            <a
              href="/projects"
              className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              🔍 View My Work
            </a>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default Contact;

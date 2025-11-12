"use client";


import React, { useLayoutEffect, useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, MessageCircle, ArrowRight, ShoppingCart, Facebook, Instagram, Twitter } from 'lucide-react';
import { brandInfo } from '@/utils/brandInfo';
import { products } from '@/utils/productsData';


export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scroll to section by ID
  const scroll2El = (elID: string) => {
    const element = document.getElementById(elID);
    if (element) {
      const yOffset = -80; // Account for sticky navbar
      const y = element.offsetTop + yOffset;
      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    }
  };

  // Button click handler for navigation
  const onBtnClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault(); // Prevent default link behavior
    scroll2El(id);
    setIsMenuOpen(false); // Close mobile menu
  };

  // Scroll detection for active section and navbar styling
  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section
      const sections = ['home', 'products', 'contact'];
      const scrollPosition = window.scrollY + 150; // Offset for better detection

      // Check sections in reverse order to get the last one in view
      let currentSection = 'home';
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    // Initial call
    handleScroll();

    // Add scroll listener with throttling
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);





  // Function to send product info via WhatsApp
  const sendToWhatsApp = (product: { name: string; price: number; description: string }) => {
    const message = `Hi! I'm interested in:\n\nProduct: ${product.name}\nPrice: ${product.price}\nDescription: ${product.description}\n\nPlease provide more details.`;
    const whatsappUrl = `https://wa.me/${brandInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Quick WhatsApp contact
  const quickWhatsAppContact = () => {
    const message = `Hi ${brandInfo.name}! I'd like to know more about your organic products.`;
    const whatsappUrl = `https://wa.me/${brandInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className={`bg-white sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled ? 'shadow-lg border-gray-200' : 'shadow-sm border-gray-100'
      } ${isMenuOpen ? 'hidden md:block' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="/london beauty logo.png" 
                alt={brandInfo.name}
                className="h-16 w-auto object-contain"
              />
              <span className="text-2xl font-semibold text-green-800 tracking-tight">{brandInfo.name}</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              <button 
                onClick={(e) => onBtnClick(e, 'home')} 
                className={`transition font-medium ${
                  activeSection === 'home' 
                    ? 'text-green-700 font-semibold' 
                    : 'text-gray-700 hover:text-green-700'
                }`}
              >
                Home
              </button>
              <button 
                onClick={(e) => onBtnClick(e, 'products')} 
                className={`transition font-medium ${
                  activeSection === 'products' 
                    ? 'text-green-700 font-semibold' 
                    : 'text-gray-700 hover:text-green-700'
                }`}
              >
                Products
              </button>
              <button 
                onClick={(e) => onBtnClick(e, 'contact')} 
                className={`transition font-medium ${
                  activeSection === 'contact' 
                    ? 'text-green-700 font-semibold' 
                    : 'text-gray-700 hover:text-green-700'
                }`}
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-green-700"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`fixed left-0 top-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <img 
                  src="/london beauty logo.png" 
                  alt={brandInfo.name}
                  className="h-20 w-auto object-contain"
                />
                <span className="text-2xl font-semibold text-green-800">{brandInfo.name}</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-700">
                <X size={28} />
              </button>
            </div>
            <nav className="flex flex-col space-y-6">
              <button
                onClick={(e) => onBtnClick(e, 'home')}
                className={`text-lg transition font-medium text-left ${
                  activeSection === 'home' 
                    ? 'text-green-700 font-semibold' 
                    : 'text-gray-700 hover:text-green-700'
                }`}
              >
                Home
              </button>
              <button
                onClick={(e) => onBtnClick(e, 'products')}
                className={`text-lg transition font-medium text-left ${
                  activeSection === 'products' 
                    ? 'text-green-700 font-semibold' 
                    : 'text-gray-700 hover:text-green-700'
                }`}
              >
                Products
              </button>
              <button
                onClick={(e) => onBtnClick(e, 'contact')}
                className={`text-lg transition font-medium text-left ${
                  activeSection === 'contact' 
                    ? 'text-green-700 font-semibold' 
                    : 'text-gray-700 hover:text-green-700'
                }`}
              >
                Contact
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-green-50 via-white to-green-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {brandInfo.tagline.split('&')[0]} & <span className="text-green-700">{brandInfo.tagline.split('&')[1]}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Discover our carefully curated collection of organic, eco-friendly products designed for a healthier, more sustainable lifestyle
            </p>
            <button
              onClick={(e) => onBtnClick(e, 'products')}
              className="inline-flex items-center gap-2 bg-green-700 text-white px-10 py-4 rounded-lg hover:bg-green-800 transition shadow-lg hover:shadow-xl font-medium"
            >
              Explore Products
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {brandInfo.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => sendToWhatsApp(product)}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-100 flex flex-col"
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Product Info */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                    <span className="text-2xl font-bold text-green-700">Rs.{product.price}</span>
                    <button className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition text-sm font-medium">
                      <ShoppingCart size={18} />
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600">
              {brandInfo.tagline}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <Phone className="text-green-700" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Phone</h3>
              <p className="text-gray-600">{brandInfo.phone}</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <Mail className="text-green-700" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Email</h3>
              <p className="text-gray-600">{brandInfo.email}</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <MapPin className="text-green-700" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Location</h3>
              <p className="text-gray-600">{brandInfo.address}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-green-400">{brandInfo.name}</h3>
              <p className="text-gray-400 leading-relaxed">
                {brandInfo.description}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <button onClick={(e) => onBtnClick(e, 'home')} className="text-gray-400 hover:text-green-400 transition">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={(e) => onBtnClick(e, 'products')} className="text-gray-400 hover:text-green-400 transition">
                    Products
                  </button>
                </li>
                <li>
                  <button onClick={(e) => onBtnClick(e, 'contact')} className="text-gray-400 hover:text-green-400 transition">
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <p className="text-gray-400 mb-4">Follow us on social media</p>
              <div className="flex space-x-4">
                <a href={brandInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-gray-400 hover:text-green-400 transition">
                  <Facebook size={24} />
                </a>
                <a href={brandInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-gray-400 hover:text-green-400 transition">
                  <Instagram size={24} />
                </a>
                <a href={brandInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-gray-400 hover:text-green-400 transition">
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 {brandInfo.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Fixed WhatsApp Button */}
      <button
        onClick={quickWhatsAppContact}
        className="fixed bottom-8 right-8 bg-green-600 text-white p-5 rounded-full shadow-2xl hover:bg-green-700 transition transform hover:scale-110 z-50"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
};



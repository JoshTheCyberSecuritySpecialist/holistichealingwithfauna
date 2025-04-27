import React from 'react';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-sage-400" />
              <span className="ml-2 text-2xl font-serif">Fauna Healing</span>
            </div>
            <p className="text-stone-400">
              Nature-based skincare and massage therapy for mind, body, and soul healing.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-serif mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-stone-400 hover:text-white transition-colors">Services</a></li>
              <li><a href="#about" className="text-stone-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="text-stone-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif mb-4">Hours</h4>
            <ul className="space-y-2 text-stone-400">
              <li>Tuesday - Saturday</li>
              <li>9:00 AM - 6:00 PM</li>
              <li>Sunday - Monday</li>
              <li>Closed</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif mb-4">Contact</h4>
            <ul className="space-y-2 text-stone-400">
              <li>123 Forest Way</li>
              <li>Titusville, FL</li>
              <li>(555) 123-4567</li>
              <li>hello@faunahealing.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 text-center text-stone-400">
          <p>&copy; {new Date().getFullYear()} Fauna Healing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
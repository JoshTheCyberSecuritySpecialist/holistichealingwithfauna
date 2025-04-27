import React, { useState } from 'react';
import { Leaf, Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface NavigationProps {
  onAdminAccess: () => void;
}

const Navigation = ({ onAdminAccess }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Logged out successfully');
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Leaf className="h-8 w-8 text-sage-600" />
            <span className="ml-2 text-2xl font-serif text-stone-800">Fauna Healing</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <button 
              onClick={scrollToBooking}
              className="bg-sage-600 text-white px-6 py-2 rounded-full hover:bg-sage-700 transition-colors"
            >
              Book Now
            </button>
            <button
              onClick={onAdminAccess}
              className="text-stone-600 hover:text-stone-900 transition-colors text-sm"
            >
              Admin Access
            </button>
            <button
              onClick={handleLogout}
              className="text-stone-600 hover:text-stone-900 transition-colors text-sm"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-800"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="#services">Services</MobileNavLink>
            <MobileNavLink href="#about">About</MobileNavLink>
            <MobileNavLink href="#contact">Contact</MobileNavLink>
            <button 
              onClick={() => {
                scrollToBooking();
                setIsOpen(false);
              }}
              className="w-full text-center bg-sage-600 text-white px-6 py-2 rounded-full hover:bg-sage-700 transition-colors"
            >
              Book Now
            </button>
            <button
              onClick={() => {
                onAdminAccess();
                setIsOpen(false);
              }}
              className="w-full text-left px-2 py-2 text-stone-600 hover:text-stone-900 transition-colors"
            >
              Admin Access
            </button>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full text-left px-2 py-2 text-stone-600 hover:text-stone-900 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-stone-600 hover:text-stone-900 transition-colors"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="block text-stone-600 hover:text-stone-900 transition-colors py-2"
  >
    {children}
  </a>
);

export default Navigation;
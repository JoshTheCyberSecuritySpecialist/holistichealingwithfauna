import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Skincare from './components/Skincare';
import Massage from './components/Massage';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingSection from './components/BookingSection';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { supabase } from './lib/supabase';

function App() {
  const [session, setSession] = useState(null);
  const [view, setView] = useState('main');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) setView('admin-dashboard');
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) setView('admin-dashboard');
      else setView('main');
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAdminAccess = () => {
    setView('admin-login');
  };

  if (view === 'admin-login') {
    return <AdminLogin />;
  }

  if (view === 'admin-dashboard') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation onAdminAccess={handleAdminAccess} />
      <main>
        <Hero />
        <Services />
        <Skincare />
        <Massage />
        <About />
        <BookingSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
import React from 'react';

const Hero = () => {
  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="max-w-3xl px-4">
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-6">
            Nature-Based Skin & Body Rituals
          </h1>
          <p className="text-xl text-white/90 mb-8">
            At Fauna Healing, we use plant-based skincare, energy healing, and intentional touch 
            to bring your body, mind, and skin back into harmony.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToBooking}
              className="bg-sage-600 text-white px-8 py-3 rounded-full hover:bg-sage-700 transition-colors"
            >
              Book a Session
            </button>
            <a 
              href="#services"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-full hover:bg-white/20 transition-colors"
            >
              Explore Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
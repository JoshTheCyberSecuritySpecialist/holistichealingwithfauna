import React from 'react';
import { Leaf, Sparkles } from 'lucide-react';

const Skincare = () => {
  return (
    <section id="skincare" className="py-20 px-4 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-sage-600" />
              <h2 className="text-4xl font-serif text-stone-800">Fauna Botanica</h2>
            </div>
            <div className="space-y-4 text-stone-600">
              <p className="text-lg">
                Fauna Botanica is a clean, science-backed skincare line blending the wisdom of nature 
                with results-driven ingredients. Each formula is infused with potent fruit enzymes, 
                peptides, and antioxidant-rich botanicals to nourish, protect, and rejuvenate the skin.
              </p>
              <p className="text-lg">
                Whether you're targeting signs of aging, breakouts, dryness, or dullness, our products 
                are thoughtfully crafted to restore balance and reveal your natural glow. Holistic, 
                effective, and rooted in intention—skincare that supports every stage of your skin's journey.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="bg-sage-600 text-white px-6 py-3 rounded-full hover:bg-sage-700 transition-colors flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Shop Products
              </button>
            </div>
          </div>
          <div className="relative">
            <div 
              className="rounded-lg shadow-xl w-full h-[600px] bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skincare;
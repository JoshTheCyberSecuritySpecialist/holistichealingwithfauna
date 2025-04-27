import React from 'react';
import { Heart } from 'lucide-react';

const Massage = () => {
  return (
    <section id="massage" className="py-20 px-4 bg-gradient-to-b from-white to-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div 
            className="rounded-lg shadow-xl w-full h-[600px] bg-cover bg-center order-2 md:order-1"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
            }}
          />
          <div className="space-y-6 order-1 md:order-2">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-sage-600" />
              <h2 className="text-4xl font-serif text-stone-800">Therapeutic Massage</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-serif text-stone-800">60 Minutes</span>
                  <span className="text-xl font-serif text-sage-600">$80</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-serif text-stone-800">90 Minutes</span>
                  <span className="text-xl font-serif text-sage-600">$100</span>
                </div>
              </div>
              
              <p className="text-lg text-stone-600">
                This deeply restorative massage is designed to address chronic tension, muscle 
                tightness, and pain. Medium to deep pressure is combined with hot stones and 
                herbal-infused steamed towels to melt through layers of stress and support 
                the body's natural healing.
              </p>
              
              <p className="text-lg text-stone-600">
                Cupping and gua sha are used as needed to enhance circulation, release stagnation, 
                and encourage greater mobility. Ideal for those seeking targeted relief and deep 
                muscular renewal.
              </p>
            </div>

            <button 
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-sage-600 text-white px-8 py-3 rounded-full hover:bg-sage-700 transition-colors"
            >
              Book Your Session
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Massage;
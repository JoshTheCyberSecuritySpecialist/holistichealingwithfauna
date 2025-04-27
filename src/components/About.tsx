import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="relative">
            <div 
              className="rounded-lg shadow-xl w-full h-[600px] bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
          </div>
          
          <div className="space-y-6">
            <blockquote className="text-2xl font-serif text-sage-700 italic">
              "Welcome to Holistic Healing with Fauna—where touch becomes medicine, and presence is the path to peace."
            </blockquote>

            <div className="space-y-4 text-lg text-stone-600">
              <p>
                This space was created to support healing on every level—body, mind, and spirit. 
                As a licensed Holistic Massage Therapist, Esthetician, and Reiki Practitioner, 
                I combine therapeutic bodywork, skincare, and energy healing to ease pain, 
                reduce stress, and help you return to a state of balance.
              </p>

              <p>
                My approach is intuitive and restorative, blending Swedish massage, deep tissue, 
                trigger point therapy, myofascial release, breathwork, and gentle stretching. 
                Each session is personalized and guided by deep listening—to your body and its 
                natural rhythm.
              </p>

              <p className="text-xl font-serif text-sage-700">
                All beings and all bodies are welcomed and honored here.
              </p>

              <p className="text-base italic">
                When I'm not holding space for others, I enjoy practicing yoga and meditation, 
                exploring nature, receiving bodywork, and spending time with my three incredible 
                sons, my sweet fur babies, and a community that fills my heart.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-serif text-stone-800">Certifications & Training</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-sage-600 rounded-full mr-3" />
                  <span className="text-stone-700">Licensed Massage Therapist</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-sage-600 rounded-full mr-3" />
                  <span className="text-stone-700">Licensed Esthetician</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-sage-600 rounded-full mr-3" />
                  <span className="text-stone-700">Certified Reiki Practitioner</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-sage-600 rounded-full mr-3" />
                  <span className="text-stone-700">Gua Sha Specialist</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href="#services"
                className="bg-sage-600 text-white px-6 py-3 rounded-full hover:bg-sage-700 transition-colors"
              >
                See All Services
              </a>
              <button
                onClick={() => window.location.href = '#booking'}
                className="border-2 border-sage-600 text-sage-600 px-6 py-3 rounded-full hover:bg-sage-50 transition-colors"
              >
                Book a Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
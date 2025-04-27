import React from 'react';
import { MapPin, Phone, Clock, Facebook } from 'lucide-react';

const ContactInfo = ({ icon: Icon, text, subtext }: { 
  icon: React.ElementType; 
  text: string;
  subtext?: string;
}) => (
  <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md">
    <Icon className="h-6 w-6 text-sage-600 flex-shrink-0 mt-1" />
    <div>
      <div className="text-stone-800 font-medium">{text}</div>
      {subtext && <div className="text-stone-600 mt-1">{subtext}</div>}
    </div>
  </div>
);

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-stone-800 mb-4">Contact & Location</h2>
          <p className="text-lg text-stone-600">
            Visit us for a peaceful escape and transformative healing experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <ContactInfo 
              icon={MapPin} 
              text="55 McLead St, Merritt Island, FL 32953"
            />
            <ContactInfo 
              icon={Phone} 
              text="321-794-198"
            />
            <ContactInfo 
              icon={Clock} 
              text="Business Hours"
              subtext="8AM – 5PM, Monday through Saturday (Appointments only)"
            />
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
              <Facebook className="h-6 w-6 text-sage-600" />
              <a 
                href="https://facebook.com/faunahealing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-stone-800 hover:text-sage-600 transition-colors"
              >
                Follow us on Facebook
              </a>
            </div>
          </div>
          
          <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3513.0!2d-80.7!3d28.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDE4JzAwLjAiTiA4MMKwNDInMDAuMCJX!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
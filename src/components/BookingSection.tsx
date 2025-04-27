import React, { useState } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import BookingModal from './BookingModal';

const BookingSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="booking" className="py-20 px-4 bg-gradient-to-b from-stone-50 to-sage-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-stone-800 mb-4">Book Your Session</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Begin your journey to wellness. Choose your preferred service and time,
            and let us guide you towards balance and rejuvenation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <Calendar className="h-12 w-12 text-sage-600 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-stone-800 mb-2">Choose Your Date</h3>
            <p className="text-stone-600">
              Select a day that works best for your schedule
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <Clock className="h-12 w-12 text-sage-600 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-stone-800 mb-2">Pick Your Time</h3>
            <p className="text-stone-600">
              View real-time availability and choose your preferred time slot
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <Sparkles className="h-12 w-12 text-sage-600 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-stone-800 mb-2">Select Services</h3>
            <p className="text-stone-600">
              Customize your session with our range of healing treatments
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-sage-600 text-white px-8 py-4 rounded-full hover:bg-sage-700 transition-colors text-lg shadow-md hover:shadow-lg"
          >
            Schedule Your Visit
          </button>
          <p className="mt-4 text-stone-500 text-sm">
            Easy online booking
          </p>
        </div>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default BookingSection;
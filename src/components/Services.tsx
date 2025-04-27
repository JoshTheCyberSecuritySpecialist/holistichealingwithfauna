import React, { useState } from 'react';
import { Leaf } from 'lucide-react';

const ServiceCard = ({ title, duration, price, description }: {
  title: string;
  duration: string;
  price: number;
  description: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <Leaf className="h-8 w-8 text-sage-600 mb-4" />
    <h3 className="text-xl font-serif text-stone-800 mb-2">{title}</h3>
    <p className="text-stone-600 mb-4">{description}</p>
    <div className="flex justify-between items-center text-sm">
      <span className="text-stone-500">{duration}</span>
      <span className="font-semibold text-sage-600">${price}</span>
    </div>
  </div>
);

const Services = () => {
  const [showAll, setShowAll] = useState(false);

  const allServices = [
    {
      title: "Forest Bloom Facial",
      duration: "60 Minutes",
      price: 80,
      description: "Balances skin with steamed towels, high-frequency therapy, and forest botanicals."
    },
    {
      title: "Quartz Glow Facial",
      duration: "60 Minutes",
      price: 85,
      description: "Resurfaces and hydrates using rose quartz, microdermabrasion, and aromatherapy."
    },
    {
      title: "Therapeutic Massage",
      duration: "60/90 Minutes",
      price: 80,
      description: "Deep restorative massage with hot stones and herbal-infused towels. Addresses tension and pain with medium to deep pressure."
    },
    {
      title: "Ground & Glow",
      duration: "90 Minutes",
      price: 140,
      description: "Massage and facial combo with reiki-infused touch, warm herbal towels, and sound therapy."
    },
    {
      title: "Back Facial",
      duration: "30 Minutes",
      price: 50,
      description: "Deep cleansing treatment for the back with exfoliation, extractions, and custom mask."
    }
  ];

  const displayedServices = showAll ? allServices : allServices.slice(0, 3);

  return (
    <section id="services" className="py-20 px-4 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-stone-800 mb-4">Our Services</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Experience the healing power of nature with our carefully curated treatments
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              duration={service.duration}
              price={service.price}
              description={service.description}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="bg-sage-600 text-white px-8 py-3 rounded-full hover:bg-sage-700 transition-colors"
          >
            {showAll ? 'Show Less' : 'View All Services'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
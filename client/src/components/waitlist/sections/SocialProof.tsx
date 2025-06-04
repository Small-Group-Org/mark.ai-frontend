
import React from 'react';

const SocialProof = () => {
  const testimonials = [
    {
      quote: "This feels like hiring a real person, not just using another AI tool.",
      author: "Sarah L., Early Tester"
    },
    {
      quote: "I've saved at least 2 hours a day since adding Mark.AI to my workflow.",
      author: "Michael K., Agency Owner"
    },
    {
      quote: "The ability to schedule content in natural language is a game-changer.",
      author: "Alex T., Solo Founder"
    }
  ];

  return (
    <section className="py-20 bg-gradient-dark relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Whispers of Hype</h2>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl glass border border-white/10 backdrop-blur-xl"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4 text-purple-500">
                <path d="M9.33333 18.6667C9.33333 16.4667 11.1333 14.6667 13.3333 14.6667V10.6667C8.93333 10.6667 5.33333 14.2667 5.33333 18.6667V26.6667H13.3333V18.6667H9.33333ZM22.6667 14.6667V10.6667C18.2667 10.6667 14.6667 14.2667 14.6667 18.6667V26.6667H22.6667V18.6667H18.6667C18.6667 16.4667 20.4667 14.6667 22.6667 14.6667Z" fill="currentColor"/>
              </svg>
              <p className="italic text-gray-300 mb-4">{testimonial.quote}</p>
              <p className="text-sm text-gray-400">{testimonial.author}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-8">Coming soon to</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['TechCrunch', 'Product Hunt', 'HackerNews', 'Forbes'].map((logo, index) => (
              <div key={index} className="text-xl font-bold text-gray-500 opacity-70">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
